import { NextResponse, type NextRequest } from "next/server";
import { processAndStoreChunks } from "@/lib/chunking";
import { z } from "zod";
import {
  DOCUMENTS_BUCKET,
  MAX_DOCUMENT_UPLOAD_BYTES,
} from "@/lib/supabase/document-constants";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  DocumentExtractionError,
  extractDocumentText,
} from "@/lib/document-extraction";

export const runtime = "nodejs";
export const maxDuration = 60;

const documentIdSchema = z.string().uuid();
const metadataSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  file_path: z.string().min(1),
  file_type: z.string(),
  file_size_bytes: z.number().int().nonnegative(),
});
const extractionSchema = z.object({
  document_id: z.string().uuid(),
  user_id: z.string().uuid(),
  status: z.enum(["processing", "extracted", "failed"]),
  updated_at: z.string(),
});

const safeErrors: Record<DocumentExtractionError["code"], string> = {
  unsupported_file: "Only PDF and DOCX documents can be processed.",
  empty_file: "The stored document is empty.",
  invalid_file:
    "The file could not be read. Check that it is a valid, unprotected PDF or DOCX.",
  corrupted_pdf: "The PDF file is corrupted and cannot be parsed.",
  password_protected: "The PDF is password-protected and cannot be processed.",
  ocr_required:
    "No readable text was found. This document appears to be a scanned PDF and requires OCR.",
  no_text:
    "No readable text was found. Scanned PDFs are not supported because OCR is not available.",
  too_large: "This document exceeds the safe processing limits.",
  file_too_large: "The document exceeds the 25 MB processing limit.",
  engine_error: "PDF processing engine is temporarily unavailable.",
};

type StorageErrorCode =
  | "storage_object_not_found"
  | "storage_permission_denied"
  | "storage_bucket_misconfigured"
  | "storage_network_error"
  | "storage_service_error";

interface MappedStorageError {
  code: StorageErrorCode;
  message: string;
  status: number;
}

function mapStorageError(error: unknown): MappedStorageError {
  const err = error as {
    name?: string;
    message?: string;
    status?: number | string;
    statusCode?: number | string;
    cause?: unknown;
  } | null;

  const rawStatus = err?.status ?? err?.statusCode;
  const statusNum =
    typeof rawStatus === "number"
      ? rawStatus
      : typeof rawStatus === "string"
        ? parseInt(rawStatus, 10)
        : undefined;

  const message = (err?.message || "").toLowerCase();
  const name = (err?.name || "").toLowerCase();

  // 1. Permission Denied (403 / 401 / permission denied / unauthorized)
  if (
    statusNum === 403 ||
    statusNum === 401 ||
    message.includes("permission denied") ||
    message.includes("unauthorized") ||
    message.includes("not allowed") ||
    message.includes("access denied") ||
    message.includes("row-level security") ||
    message.includes("jwt")
  ) {
    return {
      code: "storage_permission_denied",
      message: "Access to document in storage is denied.",
      status: 403,
    };
  }

  // 2. Bucket Misconfigured (Bucket not found / invalid bucket name)
  if (
    message.includes("bucket not found") ||
    message.includes("bucket_not_found") ||
    message.includes("invalid bucket")
  ) {
    return {
      code: "storage_bucket_misconfigured",
      message: "The document storage bucket is misconfigured or does not exist.",
      status: 500,
    };
  }

  // 3. Object Not Found (404 / object not found)
  if (
    statusNum === 404 ||
    message.includes("object not found") ||
    message.includes("not found")
  ) {
    return {
      code: "storage_object_not_found",
      message: "The document file was not found in storage.",
      status: 404,
    };
  }

  // 4. Network Error (fetch failed / network / connection refused/timeout)
  if (
    message.includes("fetch failed") ||
    message.includes("network") ||
    message.includes("econnrefused") ||
    message.includes("etimedout") ||
    name.includes("network")
  ) {
    return {
      code: "storage_network_error",
      message: "Network error occurred while connecting to storage service.",
      status: 502,
    };
  }

  // 5. Service Error (500 / 502 / 503 / 504 or other storage failures)
  return {
    code: "storage_service_error",
    message: "Storage service encountered an error retrieving the document.",
    status: 502,
  };
}

function jsonError(code: string, message: string, status: number) {
  return NextResponse.json({ error: { code, message } }, { status });
}

function isOwnedUserFilePath(filePath: string, userId: string): boolean {
  if (
    filePath.includes("\\") ||
    filePath.startsWith("/") ||
    filePath.includes("%") ||
    filePath.includes("\0")
  ) {
    return false;
  }

  const segments = filePath.split("/");
  return (
    segments.length === 2 &&
    segments[0] === userId &&
    segments[1] !== "" &&
    segments[1] !== "." &&
    segments[1] !== ".."
  );
}

type ServerSupabaseClient = Awaited<
  ReturnType<typeof createServerSupabaseClient>
>;

async function updateExtraction(
  supabase: ServerSupabaseClient,
  documentId: string,
  userId: string,
  status: "processing" | "extracted" | "failed",
  values: {
    extracted_text?: string | null;
    page_text?: Array<{ page: number; text: string }> | null;
    error_message?: string | null;
  } = {},
): Promise<boolean> {
  const { data, error } = await supabase
    .from("document_extractions")
    .update({
      status,
      extracted_text: values.extracted_text ?? null,
      page_text: values.page_text ?? null,
      error_message: values.error_message ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("document_id", documentId)
    .eq("user_id", userId)
    .select("document_id")
    .maybeSingle();

  return !error && Boolean(data);
}

async function claimExtraction(
  supabase: ServerSupabaseClient,
  documentId: string,
  userId: string,
): Promise<"claimed" | "in_progress" | "failed"> {
  const { data, error } = await supabase
    .from("document_extractions")
    .select("document_id,user_id,status,updated_at")
    .eq("document_id", documentId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return "failed";
  }

  if (!data) {
    const { error: insertError } = await supabase
      .from("document_extractions")
      .insert({
        document_id: documentId,
        user_id: userId,
        status: "processing",
        extracted_text: null,
        page_text: null,
        error_message: null,
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error("[Extraction] Claim insert error:", {
        documentId,
        errorCode: insertError.code,
      });
    }

    if (!insertError) {
      return "claimed";
    }
    // Concurrent insert on unique(document_id).
    if (insertError.code === "23505") {
      return "in_progress";
    }
    return "failed";
  }

  const parsed = extractionSchema.safeParse(data);
  if (!parsed.success || parsed.data.user_id !== userId) {
    return "failed";
  }

  // Allow re-running extraction when already extracted/failed so chunk
  // persistence stays idempotent under unique(document_id, chunk_index).
  const isStale =
    parsed.data.status === "processing" &&
    Date.now() - Date.parse(parsed.data.updated_at) >= 15 * 60 * 1000;
  if (parsed.data.status === "processing" && !isStale) {
    return "in_progress";
  }

  let claimQuery = supabase
    .from("document_extractions")
    .update({
      status: "processing",
      extracted_text: null,
      page_text: null,
      error_message: null,
      updated_at: new Date().toISOString(),
    })
    .eq("document_id", documentId)
    .eq("user_id", userId)
    .eq("status", parsed.data.status);

  if (isStale) {
    claimQuery = claimQuery.eq("updated_at", parsed.data.updated_at);
  }

  const { data: claimData, error: claimError } = await claimQuery
    .select("document_id")
    .maybeSingle();
  if (claimError) {
    console.error("[Extraction] Claim update error:", {
      documentId,
      errorCode: claimError.code,
    });
    return "failed";
  }
  return claimData ? "claimed" : "in_progress";
}

async function setFailedState(
  supabase: ServerSupabaseClient,
  documentId: string,
  userId: string,
  safeMessage: string,
): Promise<boolean> {
  // document_extractions has no error_code column. Persist status=failed
  // with an allowlisted message (never mark extracted on failure).
  return updateExtraction(supabase, documentId, userId, "failed", {
    extracted_text: null,
    page_text: null,
    error_message: safeMessage,
  });
}

export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ documentId: string }> },
) {
  try {
    const { documentId } = await context.params;
    if (!documentIdSchema.safeParse(documentId).success) {
      return jsonError("invalid_document_id", "A valid document ID is required.", 400);
    }

    let supabase: ServerSupabaseClient;
    try {
      supabase = await createServerSupabaseClient();
    } catch {
      return jsonError(
        "service_unavailable",
        "Document processing is temporarily unavailable.",
        503,
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return jsonError(
        "unauthorized",
        "Please sign in to process this document.",
        401,
      );
    }

    const { data: documentData, error: documentError } = await supabase
      .from("documents")
      .select("id,user_id,file_path,file_type,file_size_bytes")
      .eq("id", documentId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (documentError) {
      return jsonError(
        "database_error",
        "The document could not be loaded. Please try again.",
        500,
      );
    }
    if (!documentData) {
      return jsonError(
        "document_not_found",
        "Document not found in your library.",
        404,
      );
    }

    const parsedDocument = metadataSchema.safeParse(documentData);
    if (!parsedDocument.success || parsedDocument.data.user_id !== user.id) {
      return jsonError(
        "invalid_metadata",
        "The document metadata could not be verified.",
        400,
      );
    }
    const document = parsedDocument.data;

    if (!isOwnedUserFilePath(document.file_path, user.id)) {
      return jsonError(
        "invalid_location",
        "The stored document location could not be verified.",
        400,
      );
    }

    const claim = await claimExtraction(supabase, document.id, user.id);
    if (claim === "in_progress") {
      return jsonError(
        "extraction_in_progress",
        "This document is already being processed.",
        409,
      );
    }
    if (claim === "failed") {
      return jsonError(
        "claim_failed",
        "The processing state could not be saved.",
        500,
      );
    }

    if (document.file_type !== "pdf" && document.file_type !== "docx") {
      const failureSaved = await setFailedState(
        supabase,
        document.id,
        user.id,
        safeErrors.unsupported_file,
      );
      return jsonError(
        "unsupported_file",
        failureSaved
          ? safeErrors.unsupported_file
          : "The processing state could not be saved. Please try again.",
        415,
      );
    }

    if (
      document.file_size_bytes <= 0 ||
      document.file_size_bytes > MAX_DOCUMENT_UPLOAD_BYTES
    ) {
      const isZero = document.file_size_bytes === 0;
      const code = isZero ? "empty_file" : "file_too_large";
      const message = isZero ? safeErrors.empty_file : safeErrors.file_too_large;
      await setFailedState(supabase, document.id, user.id, message);
      return jsonError(code, message, isZero ? 422 : 413);
    }

    const fileExtension = document.file_path.split("/").at(-1)?.split(".").pop();
    if (fileExtension?.toLowerCase() !== document.file_type) {
      const mismatchMsg = "The document format does not match its stored metadata.";
      await setFailedState(supabase, document.id, user.id, mismatchMsg);
      return jsonError("stored_format_mismatch", mismatchMsg, 400);
    }

    const { data: file, error: downloadError } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .download(document.file_path);

    if (downloadError || !file) {
      const mapped = mapStorageError(downloadError);
      console.error("[Extraction] Storage download failed:", {
        documentId: document.id,
        bucket: DOCUMENTS_BUCKET,
        errorName: (downloadError as { name?: string })?.name,
        errorMessage: (downloadError as { message?: string })?.message,
        errorStatus: (downloadError as { status?: number | string })?.status,
        mappedCode: mapped.code,
        mappedStatus: mapped.status,
      });

      await setFailedState(supabase, document.id, user.id, mapped.message);

      return jsonError(mapped.code, mapped.message, mapped.status);
    }

    if (file.size === 0) {
      await setFailedState(supabase, document.id, user.id, safeErrors.empty_file);
      return jsonError("empty_file", safeErrors.empty_file, 422);
    }

    if (file.size > MAX_DOCUMENT_UPLOAD_BYTES) {
      await setFailedState(
        supabase,
        document.id,
        user.id,
        safeErrors.file_too_large,
      );
      return jsonError("file_too_large", safeErrors.file_too_large, 413);
    }

    if (file.size !== document.file_size_bytes) {
      const sizeMismatchMsg = "The stored file size does not match its metadata.";
      await setFailedState(supabase, document.id, user.id, sizeMismatchMsg);
      return jsonError("storage_size_mismatch", sizeMismatchMsg, 400);
    }

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const extracted = await extractDocumentText(document.file_type, bytes);

      const { ok: chunksSaved, chunkCount } = await processAndStoreChunks(
        supabase,
        document.id,
        extracted.text,
        extracted.pageText,
      );
      if (!chunksSaved) {
        await setFailedState(
          supabase,
          document.id,
          user.id,
          "Chunk persistence failed.",
        );
        return jsonError(
          "chunk_persistence_failed",
          "Chunk persistence failed.",
          500,
        );
      }

      // Only mark extracted after real text + chunks are persisted.
      const stateSaved = await updateExtraction(
        supabase,
        document.id,
        user.id,
        "extracted",
        {
          extracted_text: extracted.text,
          page_text: extracted.pageText,
          error_message: null,
        },
      );

      if (!stateSaved) {
        await setFailedState(
          supabase,
          document.id,
          user.id,
          "Extracted text could not be saved. Please retry.",
        );
        return jsonError(
          "extraction_save_failed",
          "Extracted text could not be saved. Please retry.",
          500,
        );
      }

      if (extracted.pageCount != null) {
        await supabase
          .from("documents")
          .update({ page_count: extracted.pageCount })
          .eq("id", document.id)
          .eq("user_id", user.id);
      }

      return NextResponse.json({
        status: "extracted",
        characterCount: extracted.text.length,
        pageCount: extracted.pageCount,
        chunkCount,
        message: "Text extraction is complete. No AI analysis has been run.",
      });
    } catch (extractionErr) {
      console.error("[Extraction] Text extraction failed:", {
        documentId: document.id,
        bucket: DOCUMENTS_BUCKET,
        errorName: extractionErr instanceof Error ? extractionErr.name : "UnknownError",
        errorMessage: extractionErr instanceof Error ? extractionErr.message : "Extraction error",
      });

      let failureMessage = "Text extraction failed. Please retry the document.";
      let failureCode = "extraction_failed";
      let failureStatus = 422;

      if (extractionErr instanceof DocumentExtractionError) {
        failureCode = extractionErr.code;
        if (extractionErr.code === "invalid_file") {
          failureMessage = extractionErr.message;
        } else {
          failureMessage = safeErrors[extractionErr.code] ?? failureMessage;
        }
        failureStatus =
          extractionErr.code === "too_large" || extractionErr.code === "file_too_large"
            ? 413
            : extractionErr.code === "unsupported_file"
              ? 415
              : extractionErr.code === "engine_error"
                ? 500
                : 422;

        if (extractionErr.code === "ocr_required") {
          await setFailedState(supabase, document.id, user.id, failureMessage);
          return NextResponse.json(
            {
              status: "ocr_required",
              error: {
                code: "ocr_required",
                message: failureMessage,
              },
            },
            { status: 422 },
          );
        }
      }

      await setFailedState(supabase, document.id, user.id, failureMessage);
      return jsonError(failureCode, failureMessage, failureStatus);
    }
  } catch (fatalError) {
    console.error("[Extraction] Unhandled fatal error:", {
      errorName: fatalError instanceof Error ? fatalError.name : "UnknownError",
      errorMessage: fatalError instanceof Error ? fatalError.message : "Fatal error",
    });
    return jsonError(
      "internal_server_error",
      "An unexpected error occurred while processing the document.",
      500,
    );
  }
}

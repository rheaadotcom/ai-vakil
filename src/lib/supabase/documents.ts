import { z } from "zod";
import { getSupabaseClient } from "./client";
import {
  DOCUMENTS_BUCKET,
  DOCUMENT_STORAGE_BUCKET,
  MAX_DOCUMENT_UPLOAD_BYTES,
} from "./document-constants";
import type { LibraryDocument } from "@/types/document";

export {
  DOCUMENTS_BUCKET,
  DOCUMENT_STORAGE_BUCKET,
  MAX_DOCUMENT_UPLOAD_BYTES,
} from "./document-constants";
export const DOCUMENTS_CHANGED_EVENT = "ai-vakil:documents-changed";

const PDF_MIME_TYPE = "application/pdf";
const DOCX_MIME_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const documentRowSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string(),
  file_path: z.string(),
  file_type: z.enum(["pdf", "docx"]),
  file_size_bytes: z.number().int().positive(),
  status: z.string().min(1),
});
const extractionRowSchema = z.object({
  document_id: z.string().uuid(),
  user_id: z.string().uuid(),
  status: z.enum(["processing", "extracted", "failed"]),
  error_message: z.string().nullable(),
});
const SAFE_EXTRACTION_ERRORS = new Set([
  "Only PDF and DOCX documents can be processed.",
  "The stored document is empty.",
  "The file could not be read. Check that it is a valid, unprotected PDF or DOCX.",
  "The PDF file is corrupted and cannot be parsed.",
  "The PDF is password-protected and cannot be processed.",
  "No readable text was found. This document appears to be a scanned PDF and requires OCR.",
  "No readable text was found. Scanned PDFs are not supported because OCR is not available.",
  "This document exceeds the safe processing limits.",
  "The document exceeds the 25 MB processing limit.",
  "PDFs must contain between 1 and 500 pages.",
  "This document contains too much extractable text to process safely.",
  "This DOCX archive contains too many files to process safely.",
  "This DOCX contains too much document data to process safely.",
  "This DOCX archive expands beyond the safe processing limit.",
  "The DOCX file is missing its document content.",
  "The DOCX file is corrupted or invalid and could not be read.",
  "The stored file could not be opened. It may be missing or inaccessible.",
  "The stored file size does not match its metadata.",
  "The document format does not match its stored metadata.",
  "Text extraction failed. Please retry the document.",
  "Extracted text could not be saved. Please retry.",
  "Chunk persistence failed.",
  "PDF processing engine is temporarily unavailable.",
  "PDF engine failed to load.",
]);

function getFriendlyError(
  operation: "read" | "upload" | "save" | "cleanup",
): Error {
  const messages = {
    read: "Your documents could not be loaded. Check your connection and try again.",
    upload:
      "The file could not be uploaded. Check your connection and Storage permissions, then try again.",
    save: "The file was uploaded, but its document record could not be saved.",
    cleanup:
      "The document record could not be saved and the uploaded file could not be removed. Contact support to clean up the incomplete upload.",
  };

  return new Error(messages[operation]);
}

async function getAuthenticatedUserId(): Promise<string> {
  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch {
    throw new Error("Supabase is not configured for document storage.");
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      throw new Error("Your session could not be verified. Please sign in again.");
    }

    return user.id;
  } catch {
    throw new Error("Your session could not be verified. Please sign in again.");
  }
}

function getValidatedFileType(file: File): "pdf" | "docx" {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const validType =
    (extension === "pdf" && file.type === PDF_MIME_TYPE) ||
    (extension === "docx" && file.type === DOCX_MIME_TYPE);

  if (!validType) {
    throw new Error("Choose a PDF or DOCX file with a matching file type.");
  }

  if (file.size === 0) {
    throw new Error("The selected file is empty.");
  }

  if (file.size > MAX_DOCUMENT_UPLOAD_BYTES) {
    throw new Error("The selected file exceeds the 25 MB upload limit.");
  }

  return extension;
}

function mapDocumentRow(
  row: z.infer<typeof documentRowSchema>,
  extraction?: z.infer<typeof extractionRowSchema>,
): LibraryDocument {
  const extractionError =
    extraction?.status === "failed"
      ? extraction.error_message &&
        SAFE_EXTRACTION_ERRORS.has(extraction.error_message)
        ? extraction.error_message
        : "Text extraction failed. Please retry the document."
      : null;

  return {
    id: row.id,
    title: row.title,
    fileType: row.file_type === "pdf" ? "PDF" : "DOCX",
    fileSizeBytes: row.file_size_bytes,
    status: row.status,
    pageCount: null,
    extractionStatus: extraction?.status ?? null,
    extractionError,
  };
}

async function removeUploadedObject(filePath: string): Promise<boolean> {
  try {
    const { error } = await getSupabaseClient()
      .storage.from(DOCUMENTS_BUCKET)
      .remove([filePath]);
    return !error;
  } catch {
    return false;
  }
}

export async function listUserDocuments(): Promise<LibraryDocument[]> {
  try {
    const userId = await getAuthenticatedUserId();
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("documents")
      .select(
        "id,user_id,title,file_path,file_type,file_size_bytes,status",
      )
      .eq("user_id", userId);

    if (error || !data) {
      throw getFriendlyError("read");
    }

    const parsedRows = z.array(documentRowSchema).safeParse(data);
    if (!parsedRows.success) {
      throw new Error("The document list returned unexpected metadata.");
    }

    if (parsedRows.data.some((row) => row.user_id !== userId)) {
      throw new Error("The document list returned records outside your account.");
    }

    const documentIds = parsedRows.data.map((row) => row.id);
    if (documentIds.length === 0) {
      return [];
    }

    const { data: extractionData, error: extractionError } = await supabase
      .from("document_extractions")
      .select("document_id,user_id,status,error_message")
      .eq("user_id", userId)
      .in("document_id", documentIds);

    if (extractionError || !extractionData) {
      throw getFriendlyError("read");
    }

    const parsedExtractions = z
      .array(extractionRowSchema)
      .safeParse(extractionData);
    if (!parsedExtractions.success) {
      throw new Error("The extraction status returned unexpected metadata.");
    }

    if (parsedExtractions.data.some((row) => row.user_id !== userId)) {
      throw new Error("The extraction status returned records outside your account.");
    }

    const extractionsByDocumentId = new Map(
      parsedExtractions.data.map((row) => [row.document_id, row]),
    );

    return parsedRows.data.map((row) =>
      mapDocumentRow(row, extractionsByDocumentId.get(row.id)),
    );
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Supabase is not configured for document storage." ||
        error.message === "Your session could not be verified. Please sign in again." ||
        error.message === "The document list returned unexpected metadata." ||
        error.message === "The document list returned records outside your account." ||
        error.message === "The extraction status returned unexpected metadata." ||
        error.message === "The extraction status returned records outside your account.")
    ) {
      throw error;
    }
    throw getFriendlyError("read");
  }
}

export async function uploadUserDocument(file: File): Promise<string> {
  const fileType = getValidatedFileType(file);
  let uploadedPath: string | null = null;
  let uploaded = false;
  try {
    const userId = await getAuthenticatedUserId();
    const supabase = getSupabaseClient();
    const targetPath = `${userId}/${crypto.randomUUID()}.${fileType}`;

    const { data: uploadData, error: storageError } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .upload(targetPath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (storageError || !uploadData?.path) {
      throw getFriendlyError("upload");
    }
    uploadedPath = uploadData.path;
    uploaded = true;

    const { data: inserted, error: metadataError } = await supabase.from("documents")
      .insert({
        user_id: userId,
        title: file.name,
        file_path: uploadedPath,
        file_type: fileType,
        file_size_bytes: file.size,
        status: "uploaded",
      })
      .select("id")
      .single();

    if (metadataError || !inserted) {
      const cleanupSucceeded = await removeUploadedObject(uploadedPath);
      uploaded = false;
      if (!cleanupSucceeded) {
        throw getFriendlyError("cleanup");
      }
      throw getFriendlyError("save");
    }
    return inserted.id;
  } catch (error) {
    if (uploaded && uploadedPath) {
      const cleanupSucceeded = await removeUploadedObject(uploadedPath);
      uploaded = false;
      if (!cleanupSucceeded) {
        throw getFriendlyError("cleanup");
      }
    }
    if (
      error instanceof Error &&
      (error.message === "Supabase is not configured for document storage." ||
        error.message === "Your session could not be verified. Please sign in again." ||
        error.message === "The file could not be uploaded. Check your connection and Storage permissions, then try again." ||
        error.message === "The file was uploaded, but its document record could not be saved." ||
        error.message === "The document record could not be saved and the uploaded file could not be removed. Contact support to clean up the incomplete upload.")
    ) {
      throw error;
    }
    throw getFriendlyError("upload");
  }
}

function extractionErrorMessage(data: unknown, fallback: string): string {
  if (typeof data !== "object" || data === null) {
    return fallback;
  }
  const error = "error" in data ? data.error : undefined;
  if (typeof error === "string" && error.trim()) {
    return error;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.trim()
  ) {
    return error.message;
  }
  if (
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim()
  ) {
    return data.message;
  }
  return fallback;
}

/**
 * Read a JSON body only when Content-Type is application/json.
 * Never returns or surfaces raw HTML error pages.
 */
export async function readJsonResponse(
  response: Response,
  nonJsonMessage = "The server returned an unexpected response. Please try again.",
): Promise<unknown> {
  const getHeader = (name: string): string => {
    const headers = (response as { headers?: unknown }).headers;
    if (headers && typeof (headers as { get?: unknown }).get === "function") {
      return ((headers as { get: (n: string) => string | null }).get(name) ?? "");
    }
    if (headers && typeof headers === "object") {
      const record = headers as Record<string, unknown>;
      const value = record[name] ?? record[name.toLowerCase()];
      return typeof value === "string" ? value : "";
    }
    return "";
  };

  const contentType = getHeader("content-type");
  if (!contentType.includes("application/json")) {
    // Consume body so the connection can be reused; discard HTML/text.
    await (response as { text?: () => Promise<string> }).text?.().catch(() => undefined);
    throw new Error(nonJsonMessage);
  }
  try {
    return await response.json();
  } catch {
    throw new Error(nonJsonMessage);
  }
}

// Trigger document extraction after upload
export async function triggerDocumentExtraction(documentId: string): Promise<void> {
  const headers: Record<string, string> = {};
  try {
    const supabase = getSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }
  } catch {
    // If getting session fails, continue with cookie-based auth
  }

  const response = await fetch(`/api/documents/${documentId}/extract`, {
    method: "POST",
    headers,
    credentials: "include",
  });

  const data = await readJsonResponse(
    response,
    response.ok
      ? "The extraction service returned an unexpected response."
      : "Text extraction failed. Please try again.",
  );

  if (!response.ok) {
    throw new Error(
      extractionErrorMessage(data, "Text extraction failed. Please try again."),
    );
  }

  if (
    typeof data !== "object" ||
    data === null ||
    !("status" in data) ||
    data.status !== "extracted"
  ) {
    throw new Error(
      extractionErrorMessage(data, "Text extraction did not complete successfully."),
    );
  }
}


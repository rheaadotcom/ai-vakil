import "server-only";
import * as mammoth from "mammoth";
import {
  PDFParse,
  InvalidPDFException,
  PasswordException,
  FormatError,
} from "pdf-parse";
import * as yauzl from "yauzl";

export const MAX_EXTRACTED_TEXT_CHARACTERS = 5_000_000;
export const MAX_PDF_PAGES = 500;
const MAX_DOCX_ARCHIVE_ENTRIES = 5_000;
const MAX_DOCX_ARCHIVE_UNCOMPRESSED_BYTES = 100 * 1024 * 1024;
const MAX_DOCX_DOCUMENT_XML_BYTES = 20 * 1024 * 1024;

export class DocumentExtractionError extends Error {
  readonly code:
    | "unsupported_file"
    | "empty_file"
    | "invalid_file"
    | "corrupted_pdf"
    | "password_protected"
    | "ocr_required"
    | "no_text"
    | "too_large"
    | "file_too_large"
    | "engine_error";

  constructor(
    message: string,
    code:
      | "unsupported_file"
      | "empty_file"
      | "invalid_file"
      | "corrupted_pdf"
      | "password_protected"
      | "ocr_required"
      | "no_text"
      | "too_large"
      | "file_too_large"
      | "engine_error",
  ) {
    super(message);
    this.name = "DocumentExtractionError";
    this.code = code;
  }
}

export interface ExtractedDocumentText {
  text: string;
  pageText: Array<{ page: number; text: string }> | null;
  pageCount: number | null;
}

async function extractPdf(bytes: Uint8Array): Promise<ExtractedDocumentText> {
  // Basic PDF signature check
  if (
    bytes.byteLength < 5 ||
    !new TextDecoder()
      .decode(bytes.subarray(0, Math.min(bytes.byteLength, 1024)))
      .includes("%PDF-")
  ) {
    throw new DocumentExtractionError(
      "The file does not contain a valid PDF signature.",
      "corrupted_pdf",
    );
  }

  let parser: PDFParse;
  try {
    parser = new PDFParse({
      data: Buffer.from(bytes),
    });
  } catch (err) {
    if (
      err instanceof PasswordException ||
      (err as Error)?.name === "PasswordException" ||
      (err as Error)?.message?.toLowerCase().includes("password")
    ) {
      throw new DocumentExtractionError(
        "The PDF is password-protected and cannot be processed.",
        "password_protected",
      );
    }
    if (
      err instanceof InvalidPDFException ||
      err instanceof FormatError ||
      (err as Error)?.name === "InvalidPDFException" ||
      (err as Error)?.name === "FormatError" ||
      (err as Error)?.message?.toLowerCase().includes("invalid pdf") ||
      (err as Error)?.message?.toLowerCase().includes("corrupt")
    ) {
      throw new DocumentExtractionError(
        "The PDF file is corrupted and cannot be parsed.",
        "corrupted_pdf",
      );
    }
    throw new DocumentExtractionError(
      "PDF engine failed to initialize.",
      "engine_error",
    );
  }

  let textResult: Awaited<ReturnType<PDFParse["getText"]>>;
  try {
    textResult = await parser.getText();
  } catch (err) {
    if (
      err instanceof PasswordException ||
      (err as Error)?.name === "PasswordException" ||
      (err as Error)?.message?.toLowerCase().includes("password")
    ) {
      throw new DocumentExtractionError(
        "The PDF is password-protected and cannot be processed.",
        "password_protected",
      );
    }
    if (
      err instanceof InvalidPDFException ||
      err instanceof FormatError ||
      (err as Error)?.name === "InvalidPDFException" ||
      (err as Error)?.name === "FormatError" ||
      (err as Error)?.message?.toLowerCase().includes("corrupt") ||
      (err as Error)?.message?.toLowerCase().includes("invalid") ||
      (err as Error)?.message?.toLowerCase().includes("structure")
    ) {
      throw new DocumentExtractionError(
        "The PDF file is corrupted and cannot be parsed.",
        "corrupted_pdf",
      );
    }
    throw new DocumentExtractionError(
      `Failed to read PDF document: ${(err as Error)?.message ?? "Unknown error"}`,
      "engine_error",
    );
  } finally {
    try {
      await parser.destroy();
    } catch {
      // Ignore parser cleanup errors
    }
  }

  const pageCount =
    typeof textResult.total === "number"
      ? textResult.total
      : Array.isArray(textResult.pages)
        ? textResult.pages.length
        : null;

  if (pageCount !== null && (pageCount < 1 || pageCount > MAX_PDF_PAGES)) {
    throw new DocumentExtractionError(
      `PDFs must contain between 1 and ${MAX_PDF_PAGES} pages.`,
      "too_large",
    );
  }

  const pageTextList: Array<{ page: number; text: string }> = (
    textResult.pages || []
  ).map((p) => ({
    page: p.num,
    text: (p.text || "").trim(),
  }));

  const fullText = (textResult.text || "").trim();

  // Detect scanned PDFs: near-empty text per page
  const isNearEmpty =
    fullText.length === 0 ||
    (pageTextList.length > 0 && pageTextList.every((p) => p.text.length < 20)) ||
    (pageCount !== null && pageCount > 0 && fullText.length / pageCount < 20);

  if (isNearEmpty) {
    throw new DocumentExtractionError(
      "No readable text was found. This document appears to be a scanned PDF and requires OCR.",
      "ocr_required",
    );
  }

  if (fullText.length > MAX_EXTRACTED_TEXT_CHARACTERS) {
    throw new DocumentExtractionError(
      "This document contains too much extractable text to process safely.",
      "too_large",
    );
  }

  return {
    text: fullText,
    pageText: pageTextList.length > 0 ? pageTextList : null,
    pageCount,
  };
}

async function extractDocx(bytes: Uint8Array): Promise<ExtractedDocumentText> {
  if (
    bytes.byteLength < 4 ||
    bytes[0] !== 0x50 ||
    bytes[1] !== 0x4b ||
    ![0x03, 0x05, 0x07].includes(bytes[2]) ||
    ![0x04, 0x06, 0x08].includes(bytes[3])
  ) {
    throw new DocumentExtractionError(
      "The file does not contain a valid DOCX archive signature.",
      "invalid_file",
    );
  }

  await validateDocxArchive(bytes);

  const buffer = Buffer.from(bytes);
  let text = "";
  try {
    const result = await mammoth.extractRawText({ buffer });
    text = (result.value || "").trim();
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Invalid DOCX archive";
    throw new DocumentExtractionError(
      `The DOCX file is corrupted or invalid and could not be read: ${msg}`,
      "invalid_file",
    );
  }

  if (!text) {
    throw new DocumentExtractionError(
      "No readable text was found in this DOCX file.",
      "no_text",
    );
  }

  if (text.length > MAX_EXTRACTED_TEXT_CHARACTERS) {
    throw new DocumentExtractionError(
      "This document contains too much extractable text to process safely.",
      "too_large",
    );
  }

  return {
    text,
    pageText: null,
    pageCount: null,
  };
}

async function validateDocxArchive(bytes: Uint8Array): Promise<void> {
  let zip: yauzl.ZipFile;
  try {
    zip = await yauzl.fromBufferPromise(Buffer.from(bytes), {
      lazyEntries: true,
      autoClose: false,
      validateEntrySizes: true,
      strictFileNames: true,
    });
  } catch {
    throw new DocumentExtractionError(
      "The DOCX file could not be read. It may be corrupted or invalid.",
      "invalid_file",
    );
  }

  let entryCount = 0;
  let uncompressedBytes = 0;
  let hasDocumentXml = false;
  try {
    await new Promise<void>((resolve, reject) => {
      zip.on("entry", (entry) => {
        entryCount++;
        if (entryCount > MAX_DOCX_ARCHIVE_ENTRIES) {
          reject(
            new DocumentExtractionError(
              "This DOCX archive contains too many files to process safely.",
              "too_large",
            ),
          );
          return;
        }
        if (entry.fileName === "word/document.xml") {
          hasDocumentXml = true;
          if ((entry.uncompressedSize ?? 0) > MAX_DOCX_DOCUMENT_XML_BYTES) {
            reject(
              new DocumentExtractionError(
                "This DOCX contains too much document data to process safely.",
                "too_large",
              ),
            );
            return;
          }
        }
        const size = entry.uncompressedSize ?? 0;
        uncompressedBytes += size;
        if (uncompressedBytes > MAX_DOCX_ARCHIVE_UNCOMPRESSED_BYTES) {
          reject(
            new DocumentExtractionError(
              "This DOCX archive expands beyond the safe processing limit.",
              "too_large",
            ),
          );
          return;
        }
        zip.readEntry();
      });
      zip.on("end", () => resolve());
      zip.on("error", (err) => reject(err));
      zip.readEntry();
    }).catch((err) => {
      if (err instanceof DocumentExtractionError) {
        throw err;
      }
      throw new DocumentExtractionError(
        "The DOCX file could not be read. It may be corrupted or invalid.",
        "invalid_file",
      );
    });
  } catch (error) {
    if (error instanceof DocumentExtractionError) {
      throw error;
    }
    throw new DocumentExtractionError(
      "The DOCX file could not be read. It may be corrupted or invalid.",
      "invalid_file",
    );
  } finally {
    zip.close();
  }

  if (!hasDocumentXml) {
    throw new DocumentExtractionError(
      "The DOCX file is missing its document content.",
      "invalid_file",
    );
  }
}

export async function extractDocumentText(
  fileType: "pdf" | "docx",
  bytes: Uint8Array,
): Promise<ExtractedDocumentText> {
  if (bytes.byteLength === 0) {
    throw new DocumentExtractionError(
      "The stored document is empty.",
      "empty_file",
    );
  }

  return fileType === "pdf" ? extractPdf(bytes) : extractDocx(bytes);
}

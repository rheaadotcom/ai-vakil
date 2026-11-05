// Split extracted document text into chunks and persist to `document_chunks`.
// Observed schema (do not invent columns):
//   id uuid default gen_random_uuid()
//   document_id uuid NOT NULL
//   page_number integer NULL
//   chunk_index integer NOT NULL
//   section_title text NULL
//   content text NOT NULL
//   token_count integer NULL
//   created_at timestamptz
// Unique: (document_id, chunk_index)
// No user_id column — ownership is enforced by RLS via documents.user_id.
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ServerSupabaseClient = Awaited<
  ReturnType<typeof createServerSupabaseClient>
>;

export const DEFAULT_CHUNK_SIZE = 1000;
export const DEFAULT_OVERLAP = 200;

export interface Chunk {
  documentId: string;
  pageNumber?: number;
  chunkIndex: number;
  content: string;
  tokenCount: number;
}

function chunkString(
  text: string,
  chunkSize: number = DEFAULT_CHUNK_SIZE,
  overlap: number = DEFAULT_OVERLAP,
): Array<{ content: string; tokenCount: number }> {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const tokens = trimmed.split(/\s+/).filter((token) => token.length > 0);
  if (tokens.length === 0) return [];

  const safeChunkSize = Math.max(1, chunkSize);
  const safeOverlap = Math.min(Math.max(0, overlap), safeChunkSize - 1);
  const result: Array<{ content: string; tokenCount: number }> = [];
  let start = 0;

  while (start < tokens.length) {
    const end = Math.min(start + safeChunkSize, tokens.length);
    const chunkTokens = tokens.slice(start, end);
    const chunkText = chunkTokens.join(" ").trim();
    if (chunkText.length > 0) {
      result.push({ content: chunkText, tokenCount: chunkTokens.length });
    }
    if (end >= tokens.length) break;
    const nextStart = end - safeOverlap;
    // Always advance so overlap cannot create an infinite loop.
    start = nextStart <= start ? end : nextStart;
  }

  return result;
}

/**
 * Split extracted text into non-empty chunks.
 * When pageText is present, each page is chunked and keeps its page_number.
 */
export function splitIntoChunks(
  documentId: string,
  extractedText: string,
  pageText?: Array<{ page: number; text: string }> | null,
  chunkSize: number = DEFAULT_CHUNK_SIZE,
  overlap: number = DEFAULT_OVERLAP,
): Chunk[] {
  const chunks: Chunk[] = [];
  let globalIndex = 0;

  if (pageText && pageText.length > 0) {
    for (const { page, text } of pageText) {
      const pageChunks = chunkString(text, chunkSize, overlap);
      for (const pc of pageChunks) {
        if (!pc.content.trim()) continue;
        chunks.push({
          documentId,
          pageNumber: page,
          chunkIndex: globalIndex,
          content: pc.content,
          tokenCount: pc.tokenCount,
        });
        globalIndex += 1;
      }
    }
  } else {
    const docChunks = chunkString(extractedText, chunkSize, overlap);
    for (const dc of docChunks) {
      if (!dc.content.trim()) continue;
      chunks.push({
        documentId,
        chunkIndex: globalIndex,
        content: dc.content,
        tokenCount: dc.tokenCount,
      });
      globalIndex += 1;
    }
  }

  return chunks;
}

/**
 * Idempotently replace chunks for a document.
 * Uses unique(document_id, chunk_index) upsert, then deletes any leftover
 * higher indexes from a previous longer extraction.
 * Ownership: inserts run as the signed-in user; RLS checks documents.user_id.
 */
export async function persistChunks(
  supabase: ServerSupabaseClient,
  documentId: string,
  chunks: Chunk[],
): Promise<boolean> {
  const rows = chunks
    .filter((c) => c.content.trim().length > 0)
    .map((c, index) => ({
      document_id: documentId,
      page_number: c.pageNumber ?? null,
      chunk_index: index,
      section_title: null,
      content: c.content.trim(),
      token_count: c.tokenCount,
    }));

  if (rows.length === 0) {
    const { error: deleteError } = await supabase
      .from("document_chunks")
      .delete()
      .eq("document_id", documentId);
    return !deleteError;
  }

  const { error: upsertError } = await supabase
    .from("document_chunks")
    .upsert(rows, { onConflict: "document_id,chunk_index" });

  if (upsertError) {
    console.error("[Chunking] Upsert failed:", {
      documentId,
      errorCode: upsertError.code,
    });
    return false;
  }

  // Drop orphan rows from a previous run that produced more chunks.
  const { error: pruneError } = await supabase
    .from("document_chunks")
    .delete()
    .eq("document_id", documentId)
    .gte("chunk_index", rows.length);

  if (pruneError) {
    console.error("[Chunking] Prune failed:", {
      documentId,
      errorCode: pruneError.code,
    });
    return false;
  }

  return true;
}

/**
 * Idempotently replace per-page rows in document_pages.
 * Observed schema: id, document_id, page_number, extracted_text, created_at
 * Unique: (document_id, page_number). No user_id — RLS via documents.
 */
export async function persistPages(
  supabase: ServerSupabaseClient,
  documentId: string,
  pageText?: Array<{ page: number; text: string }> | null,
): Promise<boolean> {
  const rows = (pageText ?? [])
    .filter((page) => page.text.trim().length > 0)
    .map((page) => ({
      document_id: documentId,
      page_number: page.page,
      extracted_text: page.text.trim(),
    }));

  // Delete-then-insert keeps re-runs idempotent when page sets change
  // (upsert alone would leave pages that disappeared).
  const { error: deleteError } = await supabase
    .from("document_pages")
    .delete()
    .eq("document_id", documentId);

  if (deleteError) {
    console.error("[Chunking] Page delete failed:", {
      documentId,
      errorCode: deleteError.code,
    });
    return false;
  }

  if (rows.length === 0) return true;

  const { error: insertError } = await supabase
    .from("document_pages")
    .insert(rows);

  if (insertError) {
    console.error("[Chunking] Page insert failed:", {
      documentId,
      errorCode: insertError.code,
    });
    return false;
  }

  return true;
}

export async function processAndStoreChunks(
  supabase: ServerSupabaseClient,
  documentId: string,
  extractedText: string,
  pageText?: Array<{ page: number; text: string }> | null,
): Promise<{ ok: boolean; chunkCount: number }> {
  const pagesSaved = await persistPages(supabase, documentId, pageText);
  if (!pagesSaved) {
    return { ok: false, chunkCount: 0 };
  }

  const chunks = splitIntoChunks(documentId, extractedText, pageText);
  const chunksSaved = await persistChunks(supabase, documentId, chunks);
  return { ok: chunksSaved, chunkCount: chunks.length };
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { getSupabaseClient } from "@/lib/supabase/client";
import {
  DOCUMENTS_CHANGED_EVENT,
  readJsonResponse,
} from "@/lib/supabase/documents";
import type { LibraryDocument } from "@/types/document";

interface ExtractionResponse {
  status?: string;
  message?: string;
  error?: string | { code?: string; message?: string };
}

function isExtractionResponse(value: unknown): value is ExtractionResponse {
  return typeof value === "object" && value !== null;
}

function messageFromPayload(payload: ExtractionResponse): string {
  if (typeof payload.error === "object" && payload.error?.message) {
    return payload.error.message;
  }
  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error;
  }
  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }
  return "Text extraction failed. Please try again.";
}

export function DocumentExtractionAction({
  document,
}: {
  document: LibraryDocument;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  async function processDocument() {
    setIsProcessing(true);
    setRequestError(null);

    try {
      const headers: Record<string, string> = {};
      try {
        const supabase = getSupabaseClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.access_token) {
          headers.Authorization = `Bearer ${session.access_token}`;
        }
      } catch {
        // Cookie session may still authorize the request.
      }

      const response = await fetch(
        `/api/documents/${encodeURIComponent(document.id)}/extract`,
        {
          method: "POST",
          headers,
          credentials: "include",
        },
      );

      const payload = await readJsonResponse(
        response,
        response.ok
          ? "The extraction service returned an unexpected response."
          : "Text extraction failed. Please try again.",
      );

      if (!isExtractionResponse(payload)) {
        throw new Error("The server returned an unexpected response.");
      }

      window.dispatchEvent(new Event(DOCUMENTS_CHANGED_EVENT));

      if (!response.ok || payload.status !== "extracted") {
        throw new Error(messageFromPayload(payload));
      }
    } catch (error) {
      setRequestError(
        error instanceof Error
          ? error.message
          : "Text extraction failed. Please try again.",
      );
      window.dispatchEvent(new Event(DOCUMENTS_CHANGED_EVENT));
    } finally {
      setIsProcessing(false);
    }
  }

  if (isProcessing || document.extractionStatus === "processing") {
    return (
      <div className="flex flex-col items-start gap-2">
        <StatusBadge status="processing" size="sm" />
        <p className="text-xs text-zinc-400" role="status">
          Extracting text…
        </p>
      </div>
    );
  }

  if (document.extractionStatus === "extracted") {
    return (
      <p className="text-xs text-emerald-300">
        Text extracted. No AI analysis has been run.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => void processDocument()}
      >
        {document.extractionStatus === "failed"
          ? "Retry Extraction"
          : "Extract Text"}
      </Button>
      {(requestError || document.extractionError) && (
        <p className="text-xs text-rose-300" role="alert">
          {requestError ?? document.extractionError}
        </p>
      )}
      {!document.extractionStatus && (
        <p className="text-xs text-zinc-500">Text has not been extracted.</p>
      )}
    </div>
  );
}

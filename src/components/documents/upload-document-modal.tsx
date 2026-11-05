"use client";

import React, { useRef, useState } from "react";
import {
  AlertOctagon,
  CheckCircle2,
  FileCode,
  FileText,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  DOCUMENTS_CHANGED_EVENT,
  MAX_DOCUMENT_UPLOAD_BYTES,
  uploadUserDocument,
  triggerDocumentExtraction,
} from "@/lib/supabase/documents";
import { formatFileSize } from "@/lib/file-size";

export interface UploadDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type UploadStage =
  | "idle"
  | "selected"
  | "uploading"
  | "processing"
  | "extracted"
  | "failed";

const BUSY_STAGES: UploadStage[] = ["uploading", "processing"];

export function UploadDocumentModal({
  open,
  onOpenChange,
}: UploadDocumentModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [stage, setStage] = useState<UploadStage>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reset = () => {
    setSelectedFile(null);
    setStage("idle");
    setDragOver(false);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && BUSY_STAGES.includes(stage)) {
      return;
    }

    onOpenChange(nextOpen);
    if (!nextOpen) {
      reset();
    }
  };

  const notifyDocumentsChanged = () => {
    window.dispatchEvent(new Event(DOCUMENTS_CHANGED_EVENT));
  };

  const handleFileSelect = (file?: File) => {
    setErrorMessage(null);
    if (!file) {
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    const supportedType =
      (extension === "pdf" && file.type === "application/pdf") ||
      (extension === "docx" &&
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

    if (!supportedType) {
      setSelectedFile(null);
      setStage("idle");
      setErrorMessage("Choose a PDF or DOCX file with a matching file type.");
      return;
    }

    if (file.size === 0) {
      setSelectedFile(null);
      setStage("idle");
      setErrorMessage("The selected file is empty.");
      return;
    }

    if (file.size > MAX_DOCUMENT_UPLOAD_BYTES) {
      setSelectedFile(null);
      setStage("idle");
      setErrorMessage("The selected file exceeds the 25 MB upload limit.");
      return;
    }

    setSelectedFile(file);
    setStage("selected");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    setStage("uploading");
    setErrorMessage(null);

    let documentId: string;
    try {
      documentId = await uploadUserDocument(selectedFile);
    } catch (error) {
      setStage("failed");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The upload could not be completed. Please try again.",
      );
      toast.error("Upload failed", "Your document was not added to the library.");
      return;
    }

    // Upload succeeded — refresh the library even if extraction fails next.
    notifyDocumentsChanged();
    setStage("processing");

    try {
      await triggerDocumentExtraction(documentId);
      setStage("extracted");
      notifyDocumentsChanged();
      toast.success(
        "Text extracted",
        "Your file is stored and text was extracted. No AI analysis has been run.",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Text extraction failed. Please try again.";
      setStage("failed");
      setErrorMessage(message);
      notifyDocumentsChanged();
      toast.error("Extraction failed", message);
    }
  };

  const fileType = selectedFile?.name.toLowerCase().endsWith(".docx")
    ? "DOCX"
    : "PDF";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent maxWidth="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-zinc-100">
            <UploadCloud className="h-5 w-5 text-violet-400" />
            <span>Upload Document</span>
          </DialogTitle>
          <DialogDescription>
            Securely store a PDF or DOCX file in your private document library.
            After upload, text extraction runs automatically. AI analysis has
            not been run.
          </DialogDescription>
        </DialogHeader>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(event) => {
            handleFileSelect(event.target.files?.[0]);
            event.target.value = "";
          }}
          disabled={BUSY_STAGES.includes(stage) || stage === "extracted"}
        />

        {stage === "idle" && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Choose a PDF or DOCX file"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragOver(false);
              handleFileSelect(event.dataTransfer.files?.[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
              dragOver
                ? "border-violet-500 bg-violet-500/10"
                : "border-white/10 bg-white/[0.015] hover:border-violet-500/40 hover:bg-violet-500/[0.03]"
            }`}
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
              <UploadCloud className="h-6 w-6" />
            </div>
            <p className="mb-1 text-sm font-semibold text-zinc-200">
              Drop your document here
            </p>
            <p className="mb-3 text-xs text-zinc-400">
              or <span className="font-medium text-violet-400">browse files</span>
            </p>
            <p className="text-[11px] text-zinc-500">
              PDF or DOCX · Maximum file size: 25 MB
            </p>
          </div>
        )}

        {stage === "selected" && selectedFile && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                    fileType === "PDF"
                      ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                      : "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {fileType === "PDF" ? (
                    <FileText className="h-5 w-5" />
                  ) : (
                    <FileCode className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-zinc-200">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    {fileType} · {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-zinc-100"
                aria-label="Remove selected file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-center text-[11px] leading-relaxed text-zinc-500">
              The original filename will be saved as the document title.
            </p>
          </div>
        )}

        {stage === "uploading" && (
          <div
            role="status"
            className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center"
          >
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-400" />
            <p className="text-sm font-semibold text-zinc-200">Uploading…</p>
            <p className="text-xs text-zinc-400">
              Storing your file securely in your private library.
            </p>
          </div>
        )}

        {stage === "processing" && (
          <div
            role="status"
            className="space-y-3 rounded-2xl border border-violet-500/20 bg-violet-500/[0.05] p-6 text-center"
          >
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-400" />
            <p className="text-sm font-semibold text-zinc-200">Processing…</p>
            <p className="text-xs text-zinc-400">
              Extracting text from your document. No AI analysis is running.
            </p>
          </div>
        )}

        {stage === "extracted" && (
          <div className="space-y-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
            <p className="text-sm font-semibold text-emerald-300">Extracted</p>
            <p className="text-xs text-zinc-400">
              Text extraction is complete. No AI analysis has been run.
            </p>
          </div>
        )}

        {stage === "failed" && (
          <div className="space-y-3 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 text-center">
            <AlertOctagon className="mx-auto h-8 w-8 text-rose-400" />
            <p className="text-sm font-semibold text-rose-300">Failed</p>
            <p className="text-xs text-zinc-400">
              {errorMessage
                ? "See the error below. You can retry from your document library."
                : "The operation could not be completed."}
            </p>
          </div>
        )}

        {errorMessage && (
          <p role="alert" className="text-xs leading-relaxed text-rose-300">
            {errorMessage}
          </p>
        )}

        <DialogFooter>
          {stage === "idle" && (
            <Button variant="ghost" size="sm" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
          )}
          {stage === "selected" && (
            <>
              <Button variant="ghost" size="sm" onClick={reset}>
                Change File
              </Button>
              <Button variant="primary" size="sm" onClick={() => void handleUpload()}>
                Upload Document
              </Button>
            </>
          )}
          {(stage === "extracted" || stage === "failed") && (
            <Button variant="primary" size="sm" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

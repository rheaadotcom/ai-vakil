"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileText,
  FileCode,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { MockDocument } from "@/lib/mock-documents";

export interface UploadDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess?: (newDoc: MockDocument) => void;
}

export function UploadDocumentModal({
  open,
  onOpenChange,
  onUploadSuccess,
}: UploadDocumentModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    type: "PDF" | "DOCX";
  } | null>(null);

  const [stage, setStage] = useState<
    "idle" | "selected" | "processing" | "analyzing" | "completed"
  >("idle");

  const [dragOver, setDragOver] = useState(false);

  const handleReset = () => {
    setSelectedFile(null);
    setStage("idle");
    setDragOver(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(handleReset, 200);
  };

  const handleFileSelect = (name: string, sizeBytes?: number) => {
    const isDocx = name.toLowerCase().endsWith(".docx");
    const formattedSize = sizeBytes
      ? `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
      : "2.4 MB";

    setSelectedFile({
      name,
      size: formattedSize,
      type: isDocx ? "DOCX" : "PDF",
    });
    setStage("selected");
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file.name, file.size);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file.name, file.size);
    } else {
      handleFileSelect("Residential_Rental_Agreement.pdf", 2485760);
    }
  };

  const handleStartUpload = () => {
    if (!selectedFile) {
      handleFileSelect("Commercial_Lease_Agreement.pdf", 2500000);
    }

    setStage("processing");

    // Stage 1 -> Stage 2 (analyzing)
    setTimeout(() => {
      setStage("analyzing");

      // Stage 2 -> Stage 3 (completed)
      setTimeout(() => {
        setStage("completed");
        toast.success(
          "Document Uploaded Successfully",
          `${selectedFile?.name || "Document"} has been parsed and analyzed.`
        );

        if (onUploadSuccess && selectedFile) {
          const newDoc: MockDocument = {
            id: `doc-${Date.now()}`,
            name: selectedFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
            type: "Uploaded Legal Agreement",
            fileType: selectedFile.type,
            pages: 12,
            status: "Analyzed",
            updatedAt: "Just now",
            createdAt: new Date().toISOString().split("T")[0],
            favorite: false,
            size: selectedFile.size,
            clausesCount: 18,
            attentionCount: 1,
            summary:
              "Recently uploaded legal document indexed with automated clause extraction and risk analysis.",
          };
          onUploadSuccess(newDoc);
        }
      }, 900);
    }, 800);
  };

  const handleOpenUploadedDocument = () => {
    handleClose();
    router.push("/documents/demo-rental");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-zinc-100">
            <UploadCloud className="h-5 w-5 text-violet-400" />
            <span>Upload Document</span>
          </DialogTitle>
          <DialogDescription>
            Upload a PDF or DOCX document to analyze it with AI Vakil.
          </DialogDescription>
        </DialogHeader>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleFileInputChange}
        />

        {/* Stage 1: IDLE / Drag & Drop */}
        {stage === "idle" && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
              dragOver
                ? "border-violet-500 bg-violet-500/10"
                : "border-white/10 hover:border-violet-500/40 bg-white/[0.015] hover:bg-violet-500/[0.03]"
            }`}
          >
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform mb-3">
              <UploadCloud className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-zinc-200 mb-1">
              Drop your document here
            </p>
            <p className="text-xs text-zinc-400 mb-3">
              or <span className="text-violet-400 font-medium group-hover:underline">browse files</span>
            </p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-medium">
              <span>Supported: PDF, DOCX</span>
              <span>•</span>
              <span>Maximum size: 25 MB</span>
            </div>
          </div>
        )}

        {/* Stage 2: FILE SELECTED */}
        {stage === "selected" && selectedFile && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center border shrink-0 ${
                    selectedFile.type === "PDF"
                      ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                      : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                  }`}
                >
                  {selectedFile.type === "PDF" ? (
                    <FileText className="h-5 w-5" />
                  ) : (
                    <FileCode className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-zinc-200 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    {selectedFile.type} · {selectedFile.size}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-lg hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-100 transition-colors"
                aria-label="Remove selected file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-[11px] text-zinc-500 leading-relaxed text-center">
              Ready to process covenants, risk indicators, and key legal terms.
            </p>
          </div>
        )}

        {/* Stage 3: PROCESSING */}
        {stage === "processing" && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-4">
            <div className="h-12 w-12 mx-auto rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-zinc-200">
                Processing Document...
              </h4>
              <p className="text-[11px] text-zinc-400 truncate max-w-xs mx-auto">
                Extracting legal text, clauses, and structure for {selectedFile?.name || "document"}
              </p>
            </div>
            <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
              <div className="bg-violet-500 h-1.5 rounded-full w-1/2 transition-all duration-500" />
            </div>
          </div>
        )}

        {/* Stage 4: ANALYZING */}
        {stage === "analyzing" && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-4">
            <div className="h-12 w-12 mx-auto rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-zinc-200">
                AI Analyzing Clauses...
              </h4>
              <p className="text-[11px] text-zinc-400">
                Identifying obligations, notice deadlines, and clauses that may require review
              </p>
            </div>
            <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-1.5 rounded-full w-5/6 transition-all duration-500" />
            </div>
          </div>
        )}

        {/* Stage 5: COMPLETED */}
        {stage === "completed" && (
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4">
            <div className="h-12 w-12 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-emerald-300">
                Document uploaded successfully
              </h4>
              <p className="text-[11px] text-zinc-400">
                Analysis complete. Ready for search, questions, and clause inspection.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {stage === "idle" && (
            <>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleFileSelect("Residential_Rental_Agreement.pdf", 2485760);
                  setStage("selected");
                }}
              >
                Choose Sample File
              </Button>
            </>
          )}

          {stage === "selected" && (
            <>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Change File
              </Button>
              <Button variant="primary" size="sm" onClick={handleStartUpload}>
                Upload Document
              </Button>
            </>
          )}

          {stage === "completed" && (
            <>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenUploadedDocument}
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Open Document
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

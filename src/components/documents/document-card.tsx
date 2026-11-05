"use client";

import { FileCode, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatFileSize } from "@/lib/file-size";
import type { LibraryDocument } from "@/types/document";
import { DocumentExtractionAction } from "./document-extraction-action";

export interface DocumentCardProps {
  document: LibraryDocument;
  className?: string;
}

export function DocumentCard({ document, className }: DocumentCardProps) {
  const Icon = document.fileType === "PDF" ? FileText : FileCode;

  return (
    <Card
      className={`relative flex h-full flex-col justify-between border-white/[0.08] bg-[#0D0D11]/90 p-5 backdrop-blur-xl ${
        className || ""
      }`}
    >
      <div>
        <div className="mb-3.5 flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
              document.fileType === "PDF"
                ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                : "border-blue-500/20 bg-blue-500/10 text-blue-400"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <Badge
              variant={document.fileType === "PDF" ? "destructive" : "primary"}
              size="sm"
              className="text-[10px] font-mono font-semibold uppercase tracking-wider"
            >
              {document.fileType}
            </Badge>
            <p className="mt-1 text-[11px] text-zinc-500">
              {formatFileSize(document.fileSizeBytes)}
              {document.pageCount ? ` · ${document.pageCount} pages` : ""}
            </p>
          </div>
        </div>
        <h3 className="line-clamp-2 break-words text-sm font-semibold text-zinc-100">
          {document.title}
        </h3>
        <p className="mt-2 text-xs text-zinc-500">
          Stored securely. Text extraction does not perform AI analysis.
        </p>
      </div>
      <div className="mt-4">
        <DocumentExtractionAction document={document} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
        <StatusBadge
          status={document.extractionStatus ?? document.status}
          size="sm"
        />
        <span className="text-[10px] text-zinc-500">Private</span>
      </div>
    </Card>
  );
}

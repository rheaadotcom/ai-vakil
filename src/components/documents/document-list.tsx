"use client";

import { FileCode, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatFileSize } from "@/lib/file-size";
import type { LibraryDocument } from "@/types/document";
import { DocumentExtractionAction } from "./document-extraction-action";

export interface DocumentListProps {
  documents: LibraryDocument[];
  className?: string;
}

export function DocumentList({ documents, className }: DocumentListProps) {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D11]/90 backdrop-blur-xl ${
        className || ""
      }`}
    >
      <div className="hidden grid-cols-12 gap-4 border-b border-white/[0.06] bg-white/[0.02] px-6 py-3.5 text-xs font-semibold text-zinc-400 md:grid">
        <div className="col-span-6">Document</div>
        <div className="col-span-2">Format & Size</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Metadata</div>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {documents.map((document) => {
          const Icon = document.fileType === "PDF" ? FileText : FileCode;
          return (
            <div
              key={document.id}
              className="flex flex-col gap-3 p-4 sm:px-6 md:grid md:grid-cols-12 md:items-center md:gap-4"
            >
              <div className="flex min-w-0 items-center gap-3 md:col-span-6">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                    document.fileType === "PDF"
                      ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                      : "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="break-words text-xs font-semibold text-zinc-100 sm:text-sm">
                  {document.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 md:col-span-2">
                <Badge
                  variant={document.fileType === "PDF" ? "destructive" : "primary"}
                  size="sm"
                  className="text-[10px] font-mono font-semibold uppercase tracking-wider"
                >
                  {document.fileType}
                </Badge>
                <span className="font-mono text-[11px] text-zinc-500">
                  {formatFileSize(document.fileSizeBytes)}
                </span>
              </div>
              <div className="md:col-span-2">
                <StatusBadge
                  status={document.extractionStatus ?? document.status}
                  size="sm"
                />
              </div>
              <div className="flex flex-col items-start gap-2 text-[11px] text-zinc-500 md:col-span-2 md:items-end">
                {document.pageCount ? `${document.pageCount} pages` : "Page count unavailable"}
                <DocumentExtractionAction document={document} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Citation } from "@/types";
import { FileText, ExternalLink } from "lucide-react";

export interface SourceCitationProps {
  citation: Citation;
  onClick?: (citation: Citation) => void;
  className?: string;
  showQuote?: boolean;
}

export function SourceCitation({
  citation,
  onClick,
  className,
  showQuote = false,
}: SourceCitationProps) {
  return (
    <div className={cn("inline-block group", className)}>
      <button
        type="button"
        onClick={() => onClick?.(citation)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border border-violet-500/25 bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-300 transition-all duration-150",
          "hover:border-violet-500/40 hover:bg-violet-500/20 hover:text-violet-200 active:scale-95 text-left",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400"
        )}
      >
        <FileText className="h-3 w-3 shrink-0 text-violet-400/80" />
        <span className="font-mono text-[10.5px]">
          {citation.clauseNumber ? `${citation.clauseNumber} ` : ""}
          (p. {citation.page})
        </span>
        <ExternalLink className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
      </button>

      {showQuote && citation.quote && (
        <div className="mt-1.5 pl-2.5 border-l-2 border-violet-500/30 text-xs italic text-zinc-400 bg-white/[0.02] p-2 rounded-r-lg">
          &ldquo;{citation.quote}&rdquo;
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { ContinueDocument } from "@/lib/mock-dashboard";

export interface ContinueCardProps {
  document?: ContinueDocument;
  className?: string;
}

export function ContinueCard({ document, className }: ContinueCardProps) {
  const doc = document || {
    id: "doc-rental-001",
    title: "Residential Rental Agreement",
    fileType: "PDF",
    pageCount: 12,
    lastViewed: "Termination — Page 7",
    status: "Analyzed" as const,
    href: "/documents/demo-rental?page=7",
    pageNumber: 7,
    previewSnippet:
      "Clause 7.2: Termination by Notice — Either party may terminate this tenancy by serving 60 (sixty) days prior written notice. If lessee vacates prior to the 6-month lock-in expiry, security deposit shall be forfeit.",
    riskScore: 42,
  };

  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#0F0E17]/90 via-[#0D0D12]/80 to-[#0A0A0D]/90 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-black/40 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300 ${
        className || ""
      }`}
    >
      {/* Subtle top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-3 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-violet-400" />
              <span>Continue Where You Left Off</span>
            </span>
            <span className="text-zinc-600">·</span>
            <Badge variant="outline" size="sm" className="text-[10px] bg-white/[0.02]">
              {doc.fileType} · {doc.pageCount} pages
            </Badge>
            <StatusBadge status={doc.status} size="sm" />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100 font-display truncate">
              {doc.title}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-violet-300 font-medium">
              <BookOpen className="h-3.5 w-3.5 text-violet-400" />
              <span>Last viewed: {doc.lastViewed}</span>
            </div>
          </div>

          {doc.previewSnippet && (
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 font-mono text-[11px]">
              &ldquo;{doc.previewSnippet}&rdquo;
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row md:flex-col sm:items-stretch gap-2.5 shrink-0">
          <Link href="/documents/demo-rental" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              className="w-full justify-center shadow-md shadow-violet-600/25"
            >
              Continue Reading
            </Button>
          </Link>

          <Link href="/documents/demo-rental" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ExternalLink className="h-3.5 w-3.5 text-zinc-500" />}
              className="w-full justify-center border border-white/[0.06] hover:bg-white/[0.04]"
            >
              Open Document
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

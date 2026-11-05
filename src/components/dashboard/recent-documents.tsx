"use client";

import React from "react";
import Link from "next/link";
import { FileText, ArrowRight, Clock, FileCode, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { RecentDocItem } from "@/lib/mock-dashboard";

export interface RecentDocumentsProps {
  documents?: RecentDocItem[];
  className?: string;
}

export function RecentDocuments({
  documents = [],
  className,
}: RecentDocumentsProps) {
  if (!documents || documents.length === 0) {
    return (
      <Card className={`p-6 ${className || ""}`}>
        <EmptyState
          icon={FileText}
          title="No documents yet"
          description="Upload your first contract, rental lease, or vendor agreement to begin automated legal intelligence."
          action={
            <Link
              href="/documents/demo-rental"
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 underline"
            >
              Try Demo Rental Agreement
            </Link>
          }
        />
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden border border-white/[0.08] bg-[#0D0D12]/80 backdrop-blur-xl ${className || ""}`}>
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between border-b border-white/[0.04]">
        <div>
          <CardTitle className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <FileText className="h-4 w-4 text-violet-400" />
            <span>Recent Documents</span>
          </CardTitle>
          <CardDescription className="text-xs text-zinc-400">
            Recently parsed contracts and compliance agreements
          </CardDescription>
        </div>
        <Link
          href="/documents"
          className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>

      <CardContent className="p-0 divide-y divide-white/[0.04]">
        {documents.map((doc) => {
          const isDemoRental = doc.id === "rec-1" || doc.title.includes("Rental");
          const destinationHref = isDemoRental ? "/documents/demo-rental" : doc.href || "/documents/demo-rental";

          return (
            <Link
              key={doc.id}
              href={destinationHref}
              className="flex items-center justify-between p-4 hover:bg-white/[0.025] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 group-hover:scale-105 group-hover:text-violet-300 transition-all">
                  {doc.fileFormat === "DOCX" ? (
                    <FileCode className="h-5 w-5" />
                  ) : (
                    <FileText className="h-5 w-5" />
                  )}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-violet-200 transition-colors truncate">
                      {doc.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06] shrink-0">
                      {doc.fileFormat}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-zinc-500 truncate">
                    <span>{doc.type}</span>
                    <span>·</span>
                    <span>{doc.pages} pages</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{doc.lastAnalyzed}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-3">
                <StatusBadge status={doc.status} size="sm" />
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

"use client";

import React from "react";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { mockAttentionAreas } from "@/lib/mock-document";
import { StatusBadge } from "@/components/shared/status-badge";

export interface InsightAttentionProps {
  onNavigateToPage: (page: number, sectionId?: string) => void;
  className?: string;
}

export function InsightAttention({
  onNavigateToPage,
  className,
}: InsightAttentionProps) {
  return (
    <div className={`space-y-3.5 ${className || ""}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="h-4 w-4 text-amber-400" />
          <span>Areas That May Require Review</span>
        </h4>
        <span className="text-[11px] text-zinc-500 font-mono">
          3 Items
        </span>
      </div>

      <div className="space-y-3">
        {mockAttentionAreas.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onNavigateToPage(item.page, item.clauseRef)}
            className="p-3.5 rounded-xl bg-amber-500/[0.03] border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/[0.06] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-mono text-[10px] font-bold">
                  0{idx + 1}
                </span>
                <h5 className="text-xs font-semibold text-zinc-100 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h5>
              </div>
              <StatusBadge status="May Require Review" size="sm" />
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-2">
              &ldquo;{item.description}&rdquo;
            </p>

            {item.details && (
              <p className="text-[11px] text-zinc-400 leading-normal mb-2.5">
                {item.details}
              </p>
            )}

            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-amber-500/10">
              <span className="text-zinc-500 font-mono">{item.clauseRef}</span>
              <span className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-0.5">
                <span>View on Page {item.page}</span>
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

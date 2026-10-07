"use client";

import React from "react";
import { Calendar, AlertCircle, ArrowUpRight } from "lucide-react";
import { mockImportantDates } from "@/lib/mock-document";

export interface InsightDatesProps {
  onNavigateToPage: (page: number, section?: string) => void;
  className?: string;
}

export function InsightDates({ onNavigateToPage, className }: InsightDatesProps) {
  return (
    <div className={`space-y-4 ${className || ""}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Timeline & Important Dates
        </h4>
        <span className="text-[11px] text-zinc-500 font-mono">
          3 Key Milestones
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
        {mockImportantDates.map((item) => {
          // Parse page number from clauseReference
          const pageMatch = item.clauseReference?.match(/Page\s+(\d+)/);
          const targetPage = pageMatch ? parseInt(pageMatch[1], 10) : 2;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline marker node */}
              <div
                className={`absolute -left-5 top-1.5 h-3 w-3 rounded-full border-2 transition-all ${
                  item.isCritical
                    ? "bg-amber-500 border-amber-300 ring-4 ring-amber-500/20"
                    : "bg-zinc-800 border-zinc-500 group-hover:border-violet-400"
                }`}
              />

              {/* Date Card */}
              <div
                onClick={() => onNavigateToPage(targetPage, item.clauseReference)}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-violet-400" />
                    <span className="text-xs font-bold text-zinc-100 font-mono">
                      {item.date}
                    </span>
                  </div>

                  {item.isCritical && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      <AlertCircle className="h-2.5 w-2.5" />
                      Critical
                    </span>
                  )}
                </div>

                <h5 className="text-xs font-semibold text-zinc-200">
                  {item.title}
                </h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5 mb-2">
                  {item.description}
                </p>

                {/* Source Citation Link */}
                <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-white/[0.04]">
                  <span className="text-zinc-500">Source:</span>
                  <span className="text-violet-400 hover:text-violet-300 font-mono font-medium flex items-center gap-0.5">
                    <span>Page {targetPage}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

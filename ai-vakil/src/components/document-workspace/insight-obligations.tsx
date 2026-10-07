"use client";

import React, { useState } from "react";
import { CheckCircle2, User, Building, ArrowUpRight } from "lucide-react";
import { mockObligations } from "@/lib/mock-document";

export interface InsightObligationsProps {
  onNavigateToPage: (page: number) => void;
  className?: string;
}

export function InsightObligations({
  onNavigateToPage,
  className,
}: InsightObligationsProps) {
  const [activeParty, setActiveParty] = useState<"My Obligations" | "Other Party">(
    "My Obligations"
  );

  const filteredObligations = mockObligations.filter(
    (ob) => ob.party === activeParty
  );

  const pageLookup: Record<string, number> = {
    "sec-4.1": 4,
    "sec-5.2": 5,
    "sec-7.2": 7,
    "sec-6.1": 6,
    "sec-9.1": 9,
    "sec-7.1": 7,
  };

  return (
    <div className={`space-y-3.5 ${className || ""}`}>
      {/* Segmented Party Selector */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
        <button
          type="button"
          onClick={() => setActiveParty("My Obligations")}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeParty === "My Obligations"
              ? "bg-violet-600/30 text-violet-200 border border-violet-500/40 shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>My Obligations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveParty("Other Party")}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeParty === "Other Party"
              ? "bg-violet-600/30 text-violet-200 border border-violet-500/40 shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Building className="h-3.5 w-3.5" />
          <span>Other Party</span>
        </button>
      </div>

      {/* Obligations List */}
      <div className="space-y-2.5">
        {filteredObligations.map((ob) => {
          const targetPage = pageLookup[ob.clauseId || ""] || 4;

          return (
            <div
              key={ob.id}
              onClick={() => onNavigateToPage(targetPage)}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-md bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-zinc-200 leading-relaxed">
                    {ob.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-2 pt-1.5 border-t border-white/[0.04]">
                    <span>Timing: {ob.dueDate}</span>
                    <span className="text-violet-400 font-mono flex items-center gap-0.5 group-hover:underline">
                      <span>Page {targetPage}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Sparkles, IndianRupee, ShieldCheck, Clock, Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface InsightOverviewProps {
  onExplainClause?: () => void;
  onNavigateToPage?: (page: number) => void;
  className?: string;
}

export function InsightOverview({
  onExplainClause,
  onNavigateToPage,
  className,
}: InsightOverviewProps) {
  const keyTerms = [
    {
      label: "Monthly Rent",
      value: "₹20,000",
      context: "Due by 5th each month",
      icon: IndianRupee,
      color: "text-emerald-400",
      page: 4,
    },
    {
      label: "Security Deposit",
      value: "₹60,000",
      context: "Interest-free refundable",
      icon: ShieldCheck,
      color: "text-blue-400",
      page: 4,
    },
    {
      label: "Duration",
      value: "11 months",
      context: "12 Jan 2026 – 11 Dec 2026",
      icon: Calendar,
      color: "text-violet-400",
      page: 2,
    },
    {
      label: "Notice Period",
      value: "60 days",
      context: "Mutual written requirement",
      icon: Clock,
      color: "text-amber-400",
      page: 7,
    },
  ];

  return (
    <div className={`space-y-4 ${className || ""}`}>
      {/* AI Summary Card */}
      <Card className="p-4 bg-violet-950/20 border-violet-500/25 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-violet-300">
          <Sparkles className="h-4 w-4 text-violet-400" />
          <h4 className="text-xs font-semibold uppercase tracking-wider">
            AI Document Summary
          </h4>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          This agreement is an 11-month residential rental agreement with a monthly rent of ₹20,000 and a security deposit of ₹60,000. The termination section requires written notice and contains provisions relevant to early exit.
        </p>
      </Card>

      {/* Key Terms Grid (4 Compact Cards) */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
          Key Terms
        </h4>
        <div className="grid grid-cols-2 gap-2.5">
          {keyTerms.map((term) => {
            const Icon = term.icon;
            return (
              <div
                key={term.label}
                onClick={() => onNavigateToPage?.(term.page)}
                className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-violet-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-zinc-400 font-medium truncate">
                    {term.label}
                  </span>
                  <Icon className={`h-3.5 w-3.5 ${term.color}`} />
                </div>
                <div className={`text-sm sm:text-base font-bold font-display ${term.color}`}>
                  {term.value}
                </div>
                <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                  {term.context}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flagged Item Quick Jump */}
      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold text-amber-300 block">
            Clause 7.2: 60-Day Notice Window
          </span>
          <span className="text-[10px] text-zinc-400">
            May affect lease exit timeline.
          </span>
        </div>
        {onExplainClause && (
          <Button
            variant="outline"
            size="xs"
            onClick={onExplainClause}
            rightIcon={<ArrowRight className="h-3 w-3" />}
            className="text-[11px] h-7 shrink-0 text-amber-300 border-amber-500/30 hover:bg-amber-500/10"
          >
            Explain
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, CheckSquare, AlertTriangle, Shield } from "lucide-react";
import { InsightOverview } from "./insight-overview";
import { InsightDates } from "./insight-dates";
import { InsightObligations } from "./insight-obligations";
import { InsightAttention } from "./insight-attention";

export type InsightsTab = "overview" | "dates" | "obligations" | "attention";

export interface InsightsPanelProps {
  onNavigateToPage: (page: number, section?: string) => void;
  onExplainClause?: () => void;
  initialTab?: InsightsTab;
  className?: string;
}

export function InsightsPanel({
  onNavigateToPage,
  onExplainClause,
  initialTab = "overview",
  className,
}: InsightsPanelProps) {
  const [activeTab, setActiveTab] = useState<InsightsTab>(initialTab);

  const tabs: { id: InsightsTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: "overview", label: "Overview", icon: Sparkles },
    { id: "dates", label: "Dates", icon: Calendar, count: 3 },
    { id: "obligations", label: "Obligations", icon: CheckSquare, count: 6 },
    { id: "attention", label: "Attention", icon: AlertTriangle, count: 3 },
  ];

  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#0D0D11]/90 backdrop-blur-xl p-4 flex flex-col h-full ${
        className || ""
      }`}
    >
      {/* Header & Tabs Navigation */}
      <div className="pb-3 mb-3 border-b border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              AI Document Insights
            </h3>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30 font-semibold">
            Analyzed
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-4 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06] gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-all select-none truncate ${
                  isActive
                    ? "bg-violet-600/30 text-violet-200 border border-violet-500/30 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <Icon className="h-3 w-3 shrink-0" />
                <span className="truncate">{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[9px] font-mono px-1 rounded-full ${
                      isActive ? "bg-violet-500/40 text-white" : "text-zinc-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Panels */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {activeTab === "overview" && (
          <InsightOverview
            onExplainClause={onExplainClause}
            onNavigateToPage={onNavigateToPage}
          />
        )}

        {activeTab === "dates" && (
          <InsightDates onNavigateToPage={onNavigateToPage} />
        )}

        {activeTab === "obligations" && (
          <InsightObligations onNavigateToPage={onNavigateToPage} />
        )}

        {activeTab === "attention" && (
          <InsightAttention onNavigateToPage={onNavigateToPage} />
        )}
      </div>

      {/* Subtle Legal Disclaimer (Section 37) */}
      <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-start gap-1.5 text-[10px] text-zinc-500 leading-tight">
        <Shield className="h-3 w-3 shrink-0 text-zinc-600 mt-0.5" />
        <p>
          AI Vakil provides document analysis for informational purposes and does not replace professional legal advice.
        </p>
      </div>
    </div>
  );
}

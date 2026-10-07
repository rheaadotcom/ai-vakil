"use client";

import React from "react";
import { FileText, MessageSquare, FileCheck, Calendar, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatItem } from "@/lib/mock-dashboard";

export interface SummaryMetricsProps {
  stats?: StatItem[];
  className?: string;
}

export function SummaryMetrics({ stats, className }: SummaryMetricsProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    FileText,
    MessageSquare,
    FileCheck,
    Calendar,
  };

  const defaultStats: StatItem[] = [
    {
      id: "stat-docs",
      number: "12",
      label: "Documents",
      context: "+2 added this month",
      iconName: "FileText",
    },
    {
      id: "stat-qa",
      number: "48",
      label: "Questions",
      context: "14 asked today across 3 docs",
      iconName: "MessageSquare",
    },
    {
      id: "stat-clauses",
      number: "27",
      label: "Important Clauses",
      context: "4 flagged for review",
      iconName: "FileCheck",
    },
    {
      id: "stat-dates",
      number: "08",
      label: "Upcoming Dates",
      context: "Next: 12 Oct 2026",
      iconName: "Calendar",
    },
  ];

  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${
        className || ""
      }`}
    >
      {displayStats.map((item) => {
        const IconComponent = iconMap[item.iconName] || FileText;

        return (
          <Card
            key={item.id}
            className="p-5 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300 bg-[#0E0E12]/80 backdrop-blur-xl"
          >
            {/* Ambient hover flare */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-xl group-hover:bg-violet-600/15 transition-all duration-300 pointer-events-none" />

            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 group-hover:text-violet-300 transition-all">
                <IconComponent className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View</span>
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-display">
                {item.number}
              </div>
              <div className="text-xs font-semibold text-zinc-300">
                {item.label}
              </div>
              {item.context && (
                <p className="text-[11px] text-zinc-500 leading-tight">
                  {item.context}
                </p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

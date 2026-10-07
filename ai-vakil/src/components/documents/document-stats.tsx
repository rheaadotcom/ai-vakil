"use client";

import React from "react";
import { Files, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DocumentStatsData } from "@/lib/mock-documents";

export interface DocumentStatsProps {
  stats?: DocumentStatsData;
  activeFilter?: string;
  onFilterClick?: (status: string) => void;
  className?: string;
}

export function DocumentStats({
  stats = { total: 12, analyzed: 8, processing: 2, needsReview: 2 },
  activeFilter,
  onFilterClick,
  className,
}: DocumentStatsProps) {
  const statItems = [
    {
      id: "all",
      filterValue: "all",
      number: String(stats.total).padStart(2, "0"),
      label: "Documents",
      context: "Total legal files in library",
      icon: Files,
      colorStyles: "text-zinc-100",
      iconStyles: "bg-zinc-500/10 border-zinc-500/20 text-zinc-300",
      glowStyles: "group-hover:bg-zinc-500/10",
    },
    {
      id: "analyzed",
      filterValue: "Analyzed",
      number: String(stats.analyzed).padStart(2, "0"),
      label: "Analyzed",
      context: "Indexed with clause extraction",
      icon: CheckCircle2,
      colorStyles: "text-emerald-400",
      iconStyles: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      glowStyles: "group-hover:bg-emerald-500/10",
    },
    {
      id: "processing",
      filterValue: "Processing",
      number: String(stats.processing).padStart(2, "0"),
      label: "Processing",
      context: "OCR & parsing in progress",
      icon: Clock,
      colorStyles: "text-violet-400",
      iconStyles: "bg-violet-500/10 border-violet-500/20 text-violet-400",
      glowStyles: "group-hover:bg-violet-500/10",
    },
    {
      id: "needs_review",
      filterValue: "Needs Review",
      number: String(stats.needsReview).padStart(2, "0"),
      label: "Needs Review",
      context: "Clauses requiring attention",
      icon: AlertTriangle,
      colorStyles: "text-amber-400",
      iconStyles: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      glowStyles: "group-hover:bg-amber-500/10",
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${
        className || ""
      }`}
    >
      {statItems.map((item) => {
        const Icon = item.icon;
        const isSelected =
          activeFilter &&
          (activeFilter === item.filterValue ||
            (item.filterValue === "all" && activeFilter === "all"));

        return (
          <Card
            key={item.id}
            onClick={() => onFilterClick?.(item.filterValue)}
            className={`p-4 sm:p-5 relative overflow-hidden group transition-all duration-300 bg-[#0E0E12]/80 backdrop-blur-xl ${
              onFilterClick ? "cursor-pointer" : ""
            } ${
              isSelected
                ? "border-violet-500/60 ring-1 ring-violet-500/30 shadow-lg shadow-violet-500/5"
                : "border-white/[0.08] hover:border-white/20"
            }`}
          >
            {/* Ambient hover glow */}
            <div
              className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-xl transition-all duration-300 pointer-events-none ${item.glowStyles}`}
            />

            <div className="flex items-start justify-between mb-3">
              <div
                className={`h-9 w-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${item.iconStyles}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                AI Vakil
              </span>
            </div>

            <div className="space-y-1">
              <div
                className={`text-2xl sm:text-3xl font-bold tracking-tight font-display ${item.colorStyles}`}
              >
                {item.number}
              </div>
              <div className="text-xs font-semibold text-zinc-200">
                {item.label}
              </div>
              <p className="text-[11px] text-zinc-500 leading-tight">
                {item.context}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

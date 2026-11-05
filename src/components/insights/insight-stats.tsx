import React from "react";
import { CalendarDays, FileText, CircleAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InsightStatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  accentClassName?: string;
}

export function InsightStatCard({ label, value, icon, accentClassName }: InsightStatCardProps) {
  return (
    <div className="rounded-[22px] border border-white/[0.07] bg-[#0D0D12]/80 p-4 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">{label}</div>
          <div className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100">{value}</div>
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border", accentClassName)}>{icon}</div>
      </div>
    </div>
  );
}

export interface InsightStatsProps {
  documentsAnalyzed: number;
  importantClauses: number;
  upcomingDates: number;
  obligations: number;
}

export function InsightStats({ documentsAnalyzed, importantClauses, upcomingDates, obligations }: InsightStatsProps) {
  const stats = [
    { label: "Documents", value: String(documentsAnalyzed), icon: <FileText className="h-4 w-4" />, accentClassName: "border-violet-500/30 bg-violet-500/10 text-violet-200" },
    { label: "Important clauses", value: String(importantClauses), icon: <CircleAlert className="h-4 w-4" />, accentClassName: "border-amber-500/30 bg-amber-500/10 text-amber-200" },
    { label: "Upcoming dates", value: String(upcomingDates), icon: <CalendarDays className="h-4 w-4" />, accentClassName: "border-sky-500/30 bg-sky-500/10 text-sky-200" },
    { label: "Obligations", value: String(obligations), icon: <ShieldCheck className="h-4 w-4" />, accentClassName: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <InsightStatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} accentClassName={stat.accentClassName} />
      ))}
    </div>
  );
}

import React from "react";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface InsightDateItem {
  id: string;
  date: string;
  event: string;
  document: string;
  status: "Upcoming" | "Completed" | "Attention";
  href?: string;
}

export interface ImportantDatesProps {
  items: InsightDateItem[];
  onOpenItem?: (href?: string) => void;
}

const statusStyles: Record<InsightDateItem["status"], "primary" | "success" | "warning"> = {
  Upcoming: "primary",
  Completed: "success",
  Attention: "warning",
};

export function ImportantDates({ items, onOpenItem }: ImportantDatesProps) {
  return (
    <div className="rounded-[28px] border border-white/[0.07] bg-[#0D0D13]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Important dates</h2>
          <p className="mt-1 text-sm text-zinc-400">Dates identified from your documents.</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-200">
          <CalendarClock className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpenItem?.(item.href)}
            className="flex w-full items-start justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-colors hover:border-violet-500/30 hover:bg-violet-500/[0.04]"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-zinc-100">{item.date}</span>
                <Badge variant={statusStyles[item.status]} size="sm" className="text-[9px] uppercase tracking-[0.12em]">
                  {item.status}
                </Badge>
              </div>
              <div className="mt-2 text-sm text-zinc-200">{item.event}</div>
              <div className="mt-1 text-xs text-zinc-400">{item.document}</div>
            </div>
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
          </button>
        ))}
      </div>
    </div>
  );
}

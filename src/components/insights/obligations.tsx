import React from "react";
import { Badge } from "@/components/ui/badge";

export interface ObligationItem {
  title: string;
  document: string;
  description?: string;
  source?: string;
  status?: "Active" | "Review" | "Upcoming";
}

export interface ObligationsProps {
  myObligations: ObligationItem[];
  otherParty: ObligationItem[];
}

const statusStyles: Record<NonNullable<ObligationItem["status"]>, "primary" | "warning" | "success"> = {
  Active: "primary",
  Review: "warning",
  Upcoming: "success",
};

export function Obligations({ myObligations, otherParty }: ObligationsProps) {
  const renderSection = (title: string, items: ObligationItem[]) => (
    <div className="space-y-3">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-zinc-100">{item.title}</div>
                <div className="mt-1 text-xs text-zinc-400">{item.document}</div>
              </div>
              {item.status && (
                <Badge variant={statusStyles[item.status]} size="sm" className="text-[9px] uppercase tracking-[0.08em]">
                  {item.status}
                </Badge>
              )}
            </div>
            {item.description && <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.description}</p>}
            {item.source && <div className="mt-2 text-[11px] text-zinc-500">{item.source}</div>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="rounded-[28px] border border-white/[0.07] bg-[#0D0D13]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-zinc-100">Obligations</h2>
        <p className="mt-1 text-sm text-zinc-400">Key responsibilities identified across your documents.</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">{renderSection("My obligations", myObligations)}{renderSection("Other party", otherParty)}</div>
    </div>
  );
}

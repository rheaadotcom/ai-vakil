import React from "react";

export interface InsightBreakdownProps {
  clausesAnalyzed: number;
  important: number;
  standard: number;
  review: number;
  datesIdentified: number;
  obligations: number;
}

export function InsightBreakdown({ clausesAnalyzed, important, standard, review, datesIdentified, obligations }: InsightBreakdownProps) {
  const total = clausesAnalyzed || 1;

  return (
    <div className="rounded-[28px] border border-white/[0.07] bg-[#0D0D13]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-zinc-100">Analysis breakdown</h2>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-zinc-300">
            <span>Clauses analyzed</span>
            <span className="font-medium text-zinc-100">{clausesAnalyzed}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400" style={{ width: `${(clausesAnalyzed / total) * 100}%` }} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Important", value: important, tone: "bg-violet-500/20 text-violet-200 border-violet-500/30" },
            { label: "Standard", value: standard, tone: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30" },
            { label: "May Require Review", value: review, tone: "bg-amber-500/15 text-amber-200 border-amber-500/30" },
          ].map((item) => (
            <div key={item.label} className={`rounded-2xl border p-3 ${item.tone}`}>
              <div className="text-[10px] uppercase tracking-[0.14em]">{item.label}</div>
              <div className="mt-2 text-xl font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Dates identified</div>
            <div className="mt-2 text-xl font-semibold text-zinc-100">{datesIdentified}</div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Obligations</div>
            <div className="mt-2 text-xl font-semibold text-zinc-100">{obligations}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

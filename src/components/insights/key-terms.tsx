import React from "react";

export interface KeyTermGroup {
  document: string;
  terms: Array<{ label: string; value: string }>;
}

export interface KeyTermsProps {
  groups: KeyTermGroup[];
}

export function KeyTerms({ groups }: KeyTermsProps) {
  return (
    <div className="rounded-[28px] border border-white/[0.07] bg-[#0D0D13]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-zinc-100">Key terms</h2>
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.document} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">{group.document}</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {group.terms.map((term) => (
                <div key={`${group.document}-${term.label}`} className="rounded-xl border border-white/[0.05] bg-[#0E0E12]/90 p-3">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{term.label}</div>
                  <div className="mt-1 text-base font-medium text-zinc-100">{term.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

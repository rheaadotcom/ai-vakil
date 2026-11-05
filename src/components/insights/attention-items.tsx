import React from "react";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface AttentionItem {
  id: string;
  title: string;
  summary: string;
  document: string;
  page: number;
  status: "May Require Review";
  href?: string;
}

export interface AttentionItemsProps {
  items: AttentionItem[];
  onOpenItem?: (href?: string) => void;
}

export function AttentionItems({ items, onOpenItem }: AttentionItemsProps) {
  return (
    <div className="rounded-[28px] border border-white/[0.07] bg-[#0D0D13]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Worth a closer look</h2>
          <p className="mt-1 text-sm text-zinc-400">Items that may deserve additional review based on the document content.</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-200">
          <ShieldAlert className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpenItem?.(item.href)}
            className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-colors hover:border-amber-500/30 hover:bg-amber-500/[0.04]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-medium text-zinc-100">{item.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.summary}</p>
              </div>
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs text-zinc-400">{item.document} · Page {item.page}</div>
              <Badge variant="warning" size="sm" className="text-[9px] uppercase tracking-[0.12em]">
                {item.status}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

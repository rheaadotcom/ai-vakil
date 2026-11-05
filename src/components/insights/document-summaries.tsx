import React from "react";
import { FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DocumentSummaryItem {
  id: string;
  name: string;
  type: string;
  status: "Analyzed" | "Review";
  summary: string;
  href: string;
  askAiHref?: string;
}

export interface DocumentSummariesProps {
  items: DocumentSummaryItem[];
  onOpenDocument?: (href: string) => void;
  onAskAi?: (href?: string) => void;
}

export function DocumentSummaries({ items, onOpenDocument, onAskAi }: DocumentSummariesProps) {
  return (
    <div className="rounded-[28px] border border-white/[0.07] bg-[#0D0D13]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-zinc-100">Document summaries</h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-medium text-zinc-100">{item.name}</div>
                <div className="mt-1 text-xs text-zinc-400">{item.type}</div>
              </div>
              <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-emerald-200">
                {item.status}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">“{item.summary}”</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => onOpenDocument?.(item.href)} leftIcon={<FileText className="h-3.5 w-3.5" />}>
                Open Document
              </Button>
              <Button variant="outline" size="sm" onClick={() => onAskAi?.(item.askAiHref)} leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
                Ask AI
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

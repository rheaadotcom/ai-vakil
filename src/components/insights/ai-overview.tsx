import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AiOverviewProps {
  summary: string;
  tags: string[];
  onAskAi?: () => void;
}

export function AiOverview({ summary, tags, onAskAi }: AiOverviewProps) {
  return (
    <div className="rounded-[28px] border border-white/[0.07] bg-[#0D0D13]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-violet-200">
          <Sparkles className="h-4 w-4" />
          <h2 className="text-[11px] font-mono uppercase tracking-[0.18em]">AI Overview</h2>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-zinc-500">Based on analyzed document content</span>
      </div>

      <p className="mt-4 text-base leading-7 text-zinc-200 sm:text-lg">{summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-violet-200">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
        <div className="text-xs text-zinc-400">Legal-safe synthesis for review, not legal advice.</div>
        <Button variant="primary" size="sm" onClick={onAskAi} rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
          Ask AI about these insights
        </Button>
      </div>
    </div>
  );
}

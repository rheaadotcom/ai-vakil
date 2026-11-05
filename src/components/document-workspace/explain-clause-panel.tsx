"use client";

import React from "react";
import { Sparkles, FileText, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mockExplainClauseData } from "@/lib/mock-document";

export interface ExplainClausePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateToSource?: (page: number) => void;
}

export function ExplainClausePanel({
  open,
  onOpenChange,
  onNavigateToSource,
}: ExplainClausePanelProps) {
  const data = mockExplainClauseData;

  const handleJumpToSource = () => {
    onOpenChange(false);
    onNavigateToSource?.(data.page);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <DialogTitle className="text-base text-zinc-100 font-bold">
              AI Clause Explanation
            </DialogTitle>
          </div>
          <DialogDescription>
            {data.sectionNumber}: {data.clauseTitle} — Plain English breakdown and legal context.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1 text-xs">
          {/* 1. Original Clause */}
          <div className="space-y-1.5">
            <h4 className="font-semibold text-zinc-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-zinc-500" />
              <span>Original Clause (Contract Text)</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] font-serif text-amber-100/90 italic leading-relaxed text-[13px] border-l-2 border-l-amber-500">
              &ldquo;{data.originalText}&rdquo;
            </div>
          </div>

          {/* 2. In Simple Language */}
          <div className="space-y-1.5">
            <h4 className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>In Simple Language</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-zinc-200 leading-relaxed font-sans">
              {data.simpleLanguage}
            </div>
          </div>

          {/* 3. Why It Matters */}
          <div className="space-y-1.5">
            <h4 className="font-semibold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
              <span>Why It Matters</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-zinc-200 leading-relaxed font-sans">
              {data.whyItMatters}
            </div>
          </div>

          {/* 4. Ground Truth Source Citation */}
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Cited Location:</span>
            <button
              type="button"
              onClick={handleJumpToSource}
              className="text-violet-400 hover:text-violet-300 font-mono font-medium flex items-center gap-1 hover:underline"
            >
              <span>{data.sourcePageCitation}</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleJumpToSource}>
            View in Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

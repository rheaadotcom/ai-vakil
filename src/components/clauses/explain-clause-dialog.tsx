import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MockClause } from "@/lib/mock-clauses";

export interface ExplainClauseDialogProps {
  clause: MockClause | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExplainClauseDialog({ clause, open, onOpenChange }: ExplainClauseDialogProps) {
  if (!clause) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-lg">
        <DialogHeader>
          <DialogTitle>AI Explanation</DialogTitle>
          <DialogDescription>Powered by the uploaded document context in this mock workflow.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-sm leading-relaxed text-zinc-200">
            “Based on the uploaded document, this clause describes the process for {clause.title.toLowerCase()} and may be relevant because {clause.whyItMatters.toLowerCase()}”
          </p>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E14] p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">What it says</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">{clause.simpleLanguage}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E14] p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Why it matters</div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">{clause.whyItMatters}</p>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-violet-200">Source</div>
            <p className="mt-2 text-sm text-zinc-200">
              {clause.documentName} · Page {clause.page} · {clause.section}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="primary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

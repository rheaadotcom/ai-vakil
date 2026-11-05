import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MockClause } from "@/lib/mock-clauses";

export interface ClauseCompareDialogProps {
  currentClause: MockClause | null;
  relatedClause: MockClause | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClauseCompareDialog({ currentClause, relatedClause, open, onOpenChange }: ClauseCompareDialogProps) {
  if (!currentClause || !relatedClause) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Compare Clause</DialogTitle>
          <DialogDescription>Mock comparison of the selected clause against a related clause.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E14] p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Current Clause</div>
            <h3 className="mt-3 text-lg font-semibold text-zinc-100">{currentClause.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{currentClause.simpleLanguage}</p>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-violet-200">Related Clause</div>
            <h3 className="mt-3 text-lg font-semibold text-zinc-100">{relatedClause.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{relatedClause.simpleLanguage}</p>
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

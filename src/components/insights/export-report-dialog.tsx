import React, { useState } from "react";
import { Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface ExportReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate?: () => void;
  onViewDemo?: () => void;
}

export function ExportReportDialog({ open, onOpenChange, onGenerate, onViewDemo }: ExportReportDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    onGenerate?.();

    window.setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsGenerating(false);
    setIsDone(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent maxWidth="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-4 w-4 text-violet-400" />
            Export Insights
          </DialogTitle>
          <DialogDescription>Choose a format for this mock report export.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-3">
            <label className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-200">
              <input type="radio" name="report-format" defaultChecked className="accent-violet-500" />
              PDF
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm text-zinc-200">
              <input type="radio" name="report-format" className="accent-violet-500" />
              DOCX
            </label>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0E0E12]/80 p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">Included sections</div>
            <div className="mt-3 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
              {[
                "Executive Summary",
                "Important Dates",
                "Obligations",
                "Attention Items",
                "Key Terms",
                "Document Summaries",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-violet-500" />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" size="sm" onClick={() => onViewDemo?.()}>
            View Demo Report
          </Button>
          <Button variant="primary" size="sm" onClick={handleGenerate} isLoading={isGenerating} leftIcon={!isGenerating ? <Sparkles className="h-3.5 w-3.5" /> : undefined}>
            {isGenerating ? "Generating..." : "Generate Report"}
          </Button>
        </DialogFooter>

        {isDone && (
          <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            Report generation is available in the full workflow.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

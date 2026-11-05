"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

export function ReportExportDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedFormat, setSelectedFormat] = useState<"PDF" | "DOCX">("PDF");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleGenerate = () => {
    setStatus("loading");

    window.setTimeout(() => {
      setStatus("done");
      toast.info("Report generation is available in the full workflow.", "This is a mock export experience.");
    }, 1000);
  };

  const handleClose = () => {
    setStatus("idle");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">Export Report</DialogTitle>
          <DialogDescription>Choose a format for this prototype report.</DialogDescription>
        </DialogHeader>

        {status === "done" ? (
          <div className="space-y-4">
            <p className="text-sm text-zinc-300">Report generation is available in the full workflow.</p>
            <DialogFooter>
              <Button variant="primary" onClick={handleClose}>Close</Button>
            </DialogFooter>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="pdf-format"
                  checked={selectedFormat === "PDF"}
                  onChange={() => setSelectedFormat("PDF")}
                  className="h-4 w-4 accent-violet-500"
                />
                <label htmlFor="pdf-format" className="text-sm text-zinc-200">PDF</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="docx-format"
                  checked={selectedFormat === "DOCX"}
                  onChange={() => setSelectedFormat("DOCX")}
                  className="h-4 w-4 accent-violet-500"
                />
                <label htmlFor="docx-format" className="text-sm text-zinc-200">DOCX</label>
              </div>
            </div>

            <div className="mt-5 space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-sm text-zinc-300">
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-violet-500" /> Executive Summary</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-violet-500" /> Document Overview</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-violet-500" /> Important Dates</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-violet-500" /> Obligations</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-violet-500" /> Areas Worth Reviewing</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-violet-500" /> Clause Breakdown</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-violet-500" /> Key Terms</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-violet-500" /> AI Observations</label>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={handleClose}>Close</Button>
              <Button variant="primary" onClick={handleGenerate} disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Report"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

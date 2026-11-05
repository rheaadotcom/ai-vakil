import React from "react";
import { ArrowUpRight, Copy, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface InsightDetailItem {
  id: string;
  title: string;
  category: string;
  document: string;
  page: number;
  section: string;
  summary: string;
  whyItMatters: string;
  href?: string;
}

export interface InsightDetailDialogProps {
  item: InsightDetailItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenSource?: (href?: string) => void;
  onAskAi?: () => void;
  onCopy?: (value: string) => void;
}

export function InsightDetailDialog({ item, open, onOpenChange, onOpenSource, onAskAi, onCopy }: InsightDetailDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-violet-200">
            {item.category}
          </div>
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>{item.document}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">Source</div>
            <div className="mt-2 text-sm text-zinc-200">Page {item.page} · {item.section}</div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">Summary</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200">{item.summary}</p>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">Why it matters</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200">{item.whyItMatters}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-5">
          <Button variant="outline" size="sm" onClick={() => onOpenSource?.(item.href)} leftIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
            Open Source
          </Button>
          <Button variant="secondary" size="sm" onClick={onAskAi} leftIcon={<MessageSquareText className="h-3.5 w-3.5" />}>
            Ask AI
          </Button>
          <Button variant="primary" size="sm" onClick={() => onCopy?.(item.summary)} leftIcon={<Copy className="h-3.5 w-3.5" />}>
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

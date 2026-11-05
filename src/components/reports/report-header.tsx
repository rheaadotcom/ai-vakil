import Link from "next/link";
import { ArrowLeft, MessageSquareText, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ReportMetadata } from "@/types";

interface ReportHeaderProps {
  metadata: ReportMetadata;
  onExport: () => void;
  onPrint?: () => void;
}

export function ReportHeader({ metadata, onExport, onPrint }: ReportHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-[30px] border border-white/[0.08] bg-[#0b0d12]/80 p-5 sm:p-7 shadow-[0_24px_80px_-24px_rgba(94,77,153,0.35)]"
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-violet-200/90">
              AI Vakil
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-zinc-100 sm:text-3xl xl:text-4xl">
              Document Analysis Report
            </h1>
            <p className="text-xl font-medium text-zinc-200 sm:text-2xl">
              {metadata.documentTitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/[0.02]">
            <Link href="/documents/demo-rental">
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Document
              </span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/[0.02]">
            <Link href="/chat">
              <span className="inline-flex items-center gap-2">
                <MessageSquareText className="h-3.5 w-3.5" />
                Ask AI
              </span>
            </Link>
          </Button>
          <Button variant="primary" size="sm" onClick={onExport} className="shadow-violet-500/20">
            Export
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrint}
            className="border border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:text-white"
          >
            <span className="inline-flex items-center gap-2">
              <Printer className="h-3.5 w-3.5" />
              Print View
            </span>
          </Button>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Document type</p>
          <p className="mt-2 text-sm font-medium text-zinc-100">{metadata.documentType}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Format</p>
          <p className="mt-2 text-sm font-medium text-zinc-100">{metadata.format}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Pages</p>
          <p className="mt-2 text-sm font-medium text-zinc-100">{metadata.pages}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Clauses analyzed</p>
          <p className="mt-2 text-sm font-medium text-zinc-100">{metadata.clausesAnalyzed}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Analysis date</p>
          <p className="mt-2 text-sm font-medium text-zinc-100">{metadata.analysisDate}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Status</p>
          <div className="mt-2">
            <Badge variant="success" size="sm" dot>
              {metadata.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] px-4 py-3 text-sm text-zinc-300">
        AI Vakil provides document-based information for review and does not provide legal advice. The observations in this report are based on the uploaded document.
      </div>
    </motion.header>
  );
}

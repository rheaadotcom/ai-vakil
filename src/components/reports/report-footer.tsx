import type { ReportMetadata } from "@/types";

export function ReportFooter({ metadata }: { metadata: ReportMetadata }) {
  return (
    <footer className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7 text-zinc-300">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-zinc-100">AI Vakil</p>
          <p className="mt-1 text-sm text-zinc-400">Document Analysis Report</p>
        </div>
        <p className="text-sm text-zinc-400">Generated for demo purposes.</p>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-4 text-sm text-zinc-400">
        <p>AI Vakil provides document-based information and is not a substitute for professional legal advice.</p>
        <div className="mt-3 flex flex-wrap gap-4 text-xs uppercase tracking-[0.12em] text-zinc-500">
          <span>Document ID: {metadata.documentId}</span>
          <span>Analysis: Frontend Demo</span>
        </div>
      </div>
    </footer>
  );
}

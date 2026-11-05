import { motion } from "framer-motion";
import { SourceCitation } from "@/components/shared/source-citation";
import type { SourceCoverageData } from "@/types";

export function SourceCoverage({ coverage }: { coverage: SourceCoverageData }) {
  return (
    <motion.section
      id="source-coverage"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.22 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <h2 className="text-2xl font-semibold text-zinc-100">Source Coverage</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Clauses analyzed</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-100">{coverage.clausesAnalyzed}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Pages reviewed</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-100">{coverage.pagesReviewed}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Dates identified</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-100">{coverage.datesIdentified}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Obligations identified</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-100">{coverage.obligationsIdentified}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-4 text-zinc-200">
        <p className="text-sm font-medium text-violet-200">High source coverage</p>
        <p className="mt-2 text-sm text-zinc-300">{coverage.note}</p>
      </div>

      <div className="mt-5">
        <SourceCitation
          citation={{
            id: "source-coverage-citation",
            documentId: coverage.source.documentId,
            documentTitle: coverage.source.documentName,
            page: coverage.source.page,
            clauseNumber: coverage.source.section,
            quote: coverage.source.sourceText,
          }}
          onClick={() => undefined}
        />
      </div>
    </motion.section>
  );
}

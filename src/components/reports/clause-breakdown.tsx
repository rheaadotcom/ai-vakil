import { motion } from "framer-motion";
import type { ReportClauseSummary } from "@/types";

export function ClauseBreakdown({ data }: { data: ReportClauseSummary }) {
  const total = data.total;

  return (
    <motion.section
      id="clause-breakdown"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.16 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <h2 className="text-2xl font-semibold text-zinc-100">Clause Breakdown</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Total Clauses</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-100">{data.total}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Important</p>
          <p className="mt-2 text-3xl font-semibold text-violet-300">{data.important}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Standard</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-100">{data.standard}</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">May Require Review</p>
          <p className="mt-2 text-3xl font-semibold text-amber-300">{data.mayRequireReview}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {data.categories.map((category) => {
          const width = (category.count / total) * 100;

          return (
            <div key={category.category} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-zinc-200">{category.category}</p>
                <span className="text-sm text-zinc-400">{category.count}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

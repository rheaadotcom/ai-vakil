import { motion } from "framer-motion";
import type { ReportKeyTerm } from "@/types";

export function ReportKeyTerms({ items }: { items: ReportKeyTerm[] }) {
  return (
    <motion.section
      id="key-terms"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.18 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <h2 className="text-2xl font-semibold text-zinc-100">Key Terms</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">{item.label}</p>
            <p className="mt-2 text-lg font-medium text-zinc-100">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

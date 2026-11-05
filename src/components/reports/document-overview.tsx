import { motion } from "framer-motion";
import type { DocumentOverviewData } from "@/types";

export function DocumentOverview({ overview }: { overview: DocumentOverviewData }) {
  const entries = [
    ["Document", overview.document],
    ["Document Type", overview.documentType],
    ["Term", overview.term],
    ["Start Date", overview.startDate],
    ["End Date", overview.endDate],
    ["Monthly Rent", overview.monthlyRent],
    ["Security Deposit", overview.securityDeposit],
    ["Notice Period", overview.noticePeriod],
    ["Pages", overview.pages],
    ["Clauses", overview.clauses],
  ];

  return (
    <motion.section
      id="document-overview"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.08 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <h2 className="text-2xl font-semibold text-zinc-100">Document at a glance</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {entries.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">{label}</p>
            <p className="mt-2 text-sm font-medium text-zinc-100">{value}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

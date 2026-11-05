import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { ExecutiveSummaryData } from "@/types";

export function ExecutiveSummary({ summary }: { summary: ExecutiveSummaryData }) {
  return (
    <motion.section
      id="executive-summary"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.05 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-zinc-100">Executive Summary</h2>
      </div>

      <div className="mt-5 space-y-4 text-base leading-relaxed text-zinc-300">
        {summary.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {summary.tags.map((tag) => (
          <Badge key={tag} size="sm" variant="primary" className="rounded-full border-violet-500/25 bg-violet-500/10 text-violet-200">
            {tag}
          </Badge>
        ))}
      </div>
    </motion.section>
  );
}

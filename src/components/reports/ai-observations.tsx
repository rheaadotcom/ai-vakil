import { motion } from "framer-motion";
import { SourceCitation } from "@/components/shared/source-citation";
import type { ReportObservation } from "@/types";

export function AiObservations({ items }: { items: ReportObservation[] }) {
  return (
    <motion.section
      id="ai-observations"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.2 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <h2 className="text-2xl font-semibold text-zinc-100">AI Observations</h2>

      <div className="mt-6 space-y-4">
        {items.map((item, index) => (
          <div key={`${item.text}-${index}`} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-base leading-relaxed text-zinc-300">{item.text}</p>
            {item.source && (
              <div className="mt-3">
                <SourceCitation
                  citation={{
                    id: `obs-${index}`,
                    documentId: item.source.documentId,
                    documentTitle: item.source.documentName,
                    page: item.source.page,
                    clauseNumber: item.source.section,
                    quote: item.source.sourceText,
                  }}
                  onClick={() => undefined}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

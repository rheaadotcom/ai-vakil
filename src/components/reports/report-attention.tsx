import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SourceCitation } from "@/components/shared/source-citation";
import type { ReportAttentionItem } from "@/types";

const statusColor: Record<ReportAttentionItem["status"], "warning" | "legal" | "secondary"> = {
  "May Require Review": "warning",
  Important: "legal",
  Standard: "secondary",
};

export function ReportAttention({ items }: { items: ReportAttentionItem[] }) {
  return (
    <motion.section
      id="areas-worth-reviewing"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.14 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100">Areas Worth Reviewing</h2>
          <p className="mt-2 text-sm text-zinc-400">Items identified from the document that may benefit from closer review.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-medium text-zinc-100">{item.title}</h3>
                <p className="mt-2 text-xs text-zinc-500">Page {item.page} · Section {item.section}</p>
              </div>
              <Badge variant={statusColor[item.status]} size="sm" className="shrink-0">
                {item.status}
              </Badge>
            </div>

            <p className="mt-4 text-sm text-zinc-300">{item.description}</p>

            <div className="mt-4 flex items-center justify-between gap-3">
              <SourceCitation
                citation={{
                  id: item.id,
                  documentId: item.source.documentId,
                  documentTitle: item.source.documentName,
                  page: item.source.page,
                  clauseNumber: item.source.section,
                  quote: item.source.sourceText,
                }}
                onClick={() => undefined}
              />

              <Link
                href={item.href}
                className="inline-flex items-center gap-1 text-xs font-medium text-violet-300 hover:text-violet-200"
              >
                View Source <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

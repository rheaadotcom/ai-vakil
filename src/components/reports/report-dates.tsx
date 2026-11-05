import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReportDateItem } from "@/types";

export function ReportDates({ items }: { items: ReportDateItem[] }) {
  return (
    <motion.section
      id="important-dates"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.1 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <h2 className="text-2xl font-semibold text-zinc-100">Important Dates</h2>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.date} className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex flex-col items-center pt-1">
              <span className="h-3 w-3 rounded-full bg-violet-400" />
              <span className="mt-2 h-full w-px bg-white/[0.08]" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-medium text-zinc-100">{item.date}</p>
                  <p className="mt-1 text-sm text-zinc-300">{item.event}</p>
                </div>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-xs font-medium text-violet-300 hover:text-violet-200"
                >
                  Document source <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <p className="mt-3 text-xs text-zinc-500">Source: Page {item.source.page} · {item.source.section}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

import { motion } from "framer-motion";
import type { ReportObligation } from "@/types";

export function ReportObligations({
  myObligations,
  otherParty,
}: {
  myObligations: ReportObligation[];
  otherParty: ReportObligation[];
}) {
  return (
    <motion.section
      id="key-obligations"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.12 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <h2 className="text-2xl font-semibold text-zinc-100">Key Obligations</h2>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium text-zinc-100">My Obligations</h3>
          <ul className="mt-4 space-y-3">
            {myObligations.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="font-medium text-zinc-100">{item.title}</p>
                {item.value && <p className="mt-1 text-sm text-violet-200">{item.value}</p>}
                {item.description && <p className="mt-2 text-sm text-zinc-400">{item.description}</p>}
                <p className="mt-2 text-[11px] text-zinc-500">Source: {item.source.section}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-zinc-100">Other Party</h3>
          <ul className="mt-4 space-y-3">
            {otherParty.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="font-medium text-zinc-100">{item.title}</p>
                {item.value && <p className="mt-1 text-sm text-violet-200">{item.value}</p>}
                {item.description && <p className="mt-2 text-sm text-zinc-400">{item.description}</p>}
                <p className="mt-2 text-[11px] text-zinc-500">Source: {item.source.section}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

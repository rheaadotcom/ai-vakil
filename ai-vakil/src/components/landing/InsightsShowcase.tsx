"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const dates = [
  { date: "12 Jan 2026", label: "Agreement Begins", type: "normal" },
  { date: "12 Oct 2026", label: "Notice Deadline", type: "attention" },
  { date: "11 Dec 2026", label: "Agreement Ends", type: "normal" },
];

const attentionItems = [
  "Early termination provision may require closer review.",
  "Security deposit forfeiture clause has conditions in Schedule B.",
];

export function InsightsShowcase() {
  return (
    <section id="product" className="py-28 px-5 sm:px-8 relative">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-4">Insights</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Know what deserves your attention.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl border border-white/[0.08] p-8 sm:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Important Dates */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-zinc-200">Important Dates</span>
              </div>
              <div className="space-y-3">
                {dates.map((d) => (
                  <div
                    key={d.label}
                    className={`flex items-center gap-4 rounded-xl px-4 py-3.5 border ${
                      d.type === "attention"
                        ? "border-amber-500/25 bg-amber-500/6"
                        : "border-white/[0.06] bg-white/[0.02]"
                    }`}
                  >
                    <div className={`text-xs font-mono font-semibold min-w-[90px] ${
                      d.type === "attention" ? "text-amber-400" : "text-violet-400"
                    }`}>
                      {d.date}
                    </div>
                    <div className="text-sm text-zinc-300">{d.label}</div>
                    {d.type === "attention" && (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 ml-auto shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Attention areas */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-zinc-200">Areas Worth Reviewing</span>
              </div>
              <div className="space-y-3">
                {attentionItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3.5 flex items-start gap-3"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-300 leading-relaxed">{item}</p>
                  </div>
                ))}

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
                  <div className="text-xs text-zinc-600 mb-2">Key Terms</div>
                  <div className="flex flex-wrap gap-2">
                    {["Security Deposit", "Notice Period", "Early Termination", "Renewal"].map((term) => (
                      <span key={term} className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-zinc-400">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.05]">
            <Link href="/insights">
              <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                See Insights
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

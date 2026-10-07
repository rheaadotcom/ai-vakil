"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const clauseTypes = [
  "Termination",
  "Payment",
  "Confidentiality",
  "Liability",
  "Renewal",
  "Dispute Resolution",
];

const selectedClause = {
  title: "Early Termination",
  tag: "Termination",
  source: "Page 9",
  riskLevel: "Attention",
  original:
    "In the event of early termination by the Tenant, the Landlord shall be entitled to forfeit a portion of the Security Deposit as stipulated in Schedule B. The Tenant shall remain liable for dues incurred up to the date of vacating.",
  simple:
    "If you leave before the agreement ends, the landlord may keep part of your security deposit. You'll also need to pay any remaining dues until the day you leave.",
  whyItMatters:
    "This clause affects how much of your security deposit you can recover if you need to leave early. Understanding the exact conditions is important before signing.",
};

export function ClauseShowcase() {
  const [activeClause, setActiveClause] = useState("Termination");

  return (
    <section className="py-28 px-5 sm:px-8 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-violet-600/6 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-4">Clause Explorer</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            See the clauses that matter.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl border border-white/[0.08] overflow-hidden"
        >
          {/* Clause type tabs */}
          <div className="flex flex-wrap gap-2 p-5 border-b border-white/[0.06] bg-white/[0.01]">
            {clauseTypes.map((clause) => (
              <button
                key={clause}
                onClick={() => setActiveClause(clause)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                  activeClause === clause
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                    : "text-zinc-500 border border-white/[0.06] hover:text-zinc-300 hover:border-white/[0.12]"
                }`}
              >
                {clause}
              </button>
            ))}
          </div>

          {/* Clause detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeClause}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-base font-semibold text-white">{selectedClause.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 font-medium">
                  {selectedClause.riskLevel}
                </span>
                <span className="text-[10px] text-zinc-500 ml-auto flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Source: {selectedClause.source}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <div className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-3">Original Clause</div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono">{selectedClause.original}</p>
                </div>
                <div className="rounded-xl border border-violet-500/20 bg-violet-600/6 p-5">
                  <div className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider mb-3">Plain Language</div>
                  <p className="text-sm text-zinc-200 leading-relaxed">{selectedClause.simple}</p>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <div className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-3">Why It Matters</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{selectedClause.whyItMatters}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="px-8 pb-6">
            <Link href="/clauses">
              <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                Explore Clauses
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

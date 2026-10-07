"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, AlertTriangle, ChevronRight } from "lucide-react";

const leftNav = [
  "Overview",
  "Parties",
  "Rent & Payment",
  "Responsibilities",
  "Maintenance",
  "Termination",
  "Dispute Resolution",
];

const insightStats = [
  { label: "Monthly Rent", value: "₹20,000" },
  { label: "Security Deposit", value: "₹60,000" },
  { label: "Agreement", value: "11 Months" },
  { label: "Notice", value: "60 Days" },
];

const attentionItems = [
  { icon: AlertTriangle, label: "Early Termination", color: "text-amber-400" },
  { icon: AlertTriangle, label: "Security Deposit", color: "text-orange-400" },
  { icon: AlertTriangle, label: "Notice Requirement", color: "text-amber-400" },
];

const floatingCards = [
  { label: "Clauses analyzed", value: "24", top: "8%", left: "-4%", delay: 0.8 },
  { label: "Important Dates", value: "4", top: "28%", right: "-4%", delay: 1.0 },
  { label: "Obligations", value: "8", bottom: "22%", left: "-3%", delay: 1.2 },
];

export function ProductPreview() {
  return (
    <div className="relative px-4">
      {/* Floating ambient glow behind preview */}
      <div className="absolute inset-0 -top-16 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[80px]" />
      </div>

      {/* Floating stat cards */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: card.delay, duration: 0.5 }}
          className="absolute z-20 hidden lg:flex flex-col gap-0.5 px-4 py-3 rounded-xl glass-card border border-white/[0.08] shadow-xl shadow-black/40 min-w-[130px]"
          style={{
            top: card.top,
            left: card.left,
            right: card.right,
            bottom: card.bottom,
          }}
        >
          <span className="text-xl font-bold text-white font-display">{card.value}</span>
          <span className="text-[11px] text-zinc-500">{card.label}</span>
        </motion.div>
      ))}

      {/* Main product container */}
      <div className="relative glass-card rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/60">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <div className="flex-1 mx-4">
            <div className="max-w-[280px] mx-auto h-5 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center px-3">
              <span className="text-[10px] text-zinc-600">aivakil.app/documents/rental-agreement</span>
            </div>
          </div>
        </div>

        {/* Three-panel layout */}
        <div className="grid grid-cols-[180px_1fr_220px] min-h-[420px] divide-x divide-white/[0.05] max-lg:grid-cols-[140px_1fr] max-md:grid-cols-1">

          {/* LEFT: Document nav */}
          <div className="p-4 flex flex-col gap-1 bg-white/[0.01] max-md:hidden">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <span className="text-[11px] font-semibold text-zinc-200 leading-tight">Residential Rental Agreement</span>
            </div>
            {leftNav.map((item) => (
              <button
                key={item}
                className={`text-left text-[11px] px-2.5 py-1.5 rounded-lg transition-colors ${
                  item === "Termination"
                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CENTER: Document */}
          <div className="p-5 overflow-hidden bg-[#0A0A0D]/40">
            <div className="text-[10px] text-zinc-600 font-mono mb-4 uppercase tracking-wider">Page 7 of 14 · Section 8</div>
            <div className="space-y-3 text-[12px] leading-relaxed text-zinc-400 font-mono">
              <p className="text-zinc-300 font-semibold text-[13px]">8. TERMINATION OF AGREEMENT</p>
              <p>
                This Agreement shall be for a fixed term of Eleven (11) months commencing from the date of execution. Upon expiry of the said term, the tenancy shall stand terminated without any requirement of notice.
              </p>

              {/* Highlighted clause */}
              <div className="relative rounded-lg border border-violet-500/30 bg-violet-500/8 px-3 py-2.5">
                <div className="absolute -top-2 left-3 px-1.5 py-0.5 rounded text-[9px] bg-violet-600 text-white font-semibold tracking-wide">TERMINATION</div>
                <p>
                  Either party may terminate this Agreement prior to the expiry of the term by giving a minimum of{" "}
                  <span className="text-violet-300 font-semibold">Sixty (60) days</span>{" "}
                  written notice to the other party. Such early termination shall be subject to the provisions of Clause 9.
                </p>
              </div>

              <p className="text-zinc-500 text-[11px]">9. EARLY TERMINATION</p>

              {/* Second highlighted clause */}
              <div className="relative rounded-lg border border-amber-500/25 bg-amber-500/6 px-3 py-2.5">
                <div className="absolute -top-2 left-3 px-1.5 py-0.5 rounded text-[9px] bg-amber-600 text-white font-semibold tracking-wide">ATTENTION</div>
                <p>
                  In the event of early termination by the Tenant, the Landlord shall be entitled to forfeit a portion of the Security Deposit as stipulated in Schedule B. The Tenant shall remain liable for dues incurred up to the date of vacating.
                </p>
              </div>

              <p className="text-zinc-600 text-[11px] leading-loose">
                10. RENEWAL — Upon mutual written agreement of both parties, this Agreement may be renewed for a further period...
              </p>
            </div>
          </div>

          {/* RIGHT: AI Insights */}
          <div className="p-4 flex flex-col gap-3 bg-white/[0.01] max-lg:hidden">
            {/* Tabs */}
            <div className="flex gap-1 mb-1">
              {["Overview", "Dates", "Obligations", "Attention"].map((tab) => (
                <button
                  key={tab}
                  className={`text-[10px] px-2 py-1 rounded-md transition-colors ${
                    tab === "Overview"
                      ? "bg-violet-500/15 text-violet-300"
                      : "text-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2">
              {insightStats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5">
                  <div className="text-base font-bold text-white font-display">{stat.value}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Attention */}
            <div>
              <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Attention</div>
              <div className="space-y-1.5">
                {attentionItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <item.icon className={`w-3 h-3 shrink-0 ${item.color}`} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: AI Q&A bar */}
        <div className="border-t border-white/[0.05] bg-[#0A0A0D]/60 p-4">
          <div className="max-w-3xl mx-auto space-y-2.5">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-violet-600/20 border border-violet-500/25 rounded-xl px-3.5 py-2 text-xs text-violet-200 max-w-xs">
                Can I terminate this agreement before 11 months?
              </div>
            </div>
            {/* AI response */}
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[8px] font-bold text-white">AI</span>
              </div>
              <div className="flex-1">
                <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-[11px] text-zinc-300 leading-relaxed">
                  Based on the agreement, termination is permitted with <span className="text-violet-300 font-medium">60 days&#39; written notice</span>. The early termination provision may create additional obligations depending on the circumstances.
                </div>
                <div className="flex gap-1.5 mt-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center gap-1">
                    <ChevronRight className="w-2.5 h-2.5" /> Page 7
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center gap-1">
                    <ChevronRight className="w-2.5 h-2.5" /> Page 9
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

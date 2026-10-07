"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, User } from "lucide-react";

const conversation = [
  {
    role: "user",
    text: "Can I terminate my rental agreement before 11 months?",
  },
  {
    role: "ai",
    text: "Based on the agreement, termination is permitted with 60 days' written notice. The early termination provision may create additional obligations depending on the circumstances.",
    sources: ["Page 7 — Termination", "Page 9 — Early Termination"],
  },
];

const followups = ["What happens to my deposit?", "When does my agreement end?"];

export function AIQAShowcase() {
  return (
    <section className="py-28 px-5 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-5">AI Q&amp;A</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-6 leading-[1.08]">
              Your document.
              <span className="block text-zinc-400">Now conversational.</span>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              Stop searching through pages of legal language. Ask AI Vakil directly and get answers with source references from your document.
            </p>
          </motion.div>

          {/* Right: Chat interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="glass-card rounded-2xl border border-white/[0.08] overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">AI</span>
              </div>
              <span className="text-sm font-medium text-zinc-200">AI Vakil</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs text-zinc-500">Rental Agreement</span>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-4">
              {conversation.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[8px] font-bold text-white">AI</span>
                    </div>
                  )}
                  <div className={`max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-2`}>
                    <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-violet-600/20 border border-violet-500/25 text-violet-100 rounded-br-sm"
                        : "bg-white/[0.04] border border-white/[0.07] text-zinc-200 rounded-bl-sm"
                    }`}>
                      {msg.text}
                    </div>
                    {msg.role === "ai" && msg.sources && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((source) => (
                          <span
                            key={source}
                            className="text-[10px] px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center gap-1"
                          >
                            <ChevronRight className="w-2.5 h-2.5" />
                            {source}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3 h-3 text-zinc-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Follow-up suggestions */}
            <div className="px-5 pb-4 flex flex-wrap gap-2">
              {followups.map((q) => (
                <button
                  key={q}
                  className="text-[11px] px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-violet-500/30 hover:text-zinc-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
                <span className="flex-1 text-xs text-zinc-600">Ask a question about your document...</span>
                <button className="shrink-0 w-7 h-7 rounded-lg bg-violet-600 hover:bg-violet-500 flex items-center justify-center transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

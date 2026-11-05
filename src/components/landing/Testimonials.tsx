"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I finally understood what my rental agreement actually required without spending an hour searching through the document.",
    name: "Aarav Mehta",
    role: "Independent Professional",
    initials: "AM",
  },
  {
    quote:
      "AI Vakil makes long contracts much easier to scan and understand. The plain language summaries are genuinely useful.",
    name: "Neha Sharma",
    role: "Startup Founder",
    initials: "NS",
  },
  {
    quote:
      "The source references make the AI answers much more useful. I can actually verify what it's telling me.",
    name: "Rohan Kapoor",
    role: "Freelancer",
    initials: "RK",
  },
];

export function Testimonials() {
  return (
    <section className="py-28 px-5 sm:px-8 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-violet-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-4">Testimonials</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            What people are saying.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -2 }}
              className="glass-card rounded-2xl border border-white/[0.07] p-7 flex flex-col gap-5 hover:border-violet-500/15 transition-all duration-300"
            >
              <Quote className="w-5 h-5 text-violet-400/50" />
              <p className="text-sm text-zinc-300 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600/40 to-indigo-600/40 border border-violet-500/25 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-violet-300">{t.initials}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

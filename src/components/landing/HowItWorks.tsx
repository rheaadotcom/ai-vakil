"use client";

import React from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, MessageSquare, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload",
    description: "Upload a PDF or DOCX document.",
    highlight: false,
  },
  {
    number: "02",
    icon: Cpu,
    title: "Analyze",
    description: "AI identifies clauses, dates, obligations and key terms.",
    highlight: true,
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Ask",
    description: "Ask questions in plain English.",
    highlight: false,
  },
  {
    number: "04",
    icon: Lightbulb,
    title: "Understand",
    description: "Get clear answers with source references.",
    highlight: false,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-4">How It Works</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            From document to clarity.
          </h2>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={item}
                className={cn(
                  "relative rounded-2xl border p-8 transition-all duration-300",
                  step.highlight
                    ? "bg-gradient-to-br from-violet-600/12 to-indigo-600/8 border-violet-500/25 shadow-lg shadow-violet-600/10"
                    : "glass-card border-white/[0.07] hover:border-white/[0.12]"
                )}
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      step.highlight
                        ? "bg-violet-600/25 border border-violet-500/30"
                        : "bg-white/[0.05] border border-white/[0.08]"
                    )}>
                      <Icon className={cn("w-5 h-5", step.highlight ? "text-violet-300" : "text-zinc-400")} />
                    </div>
                  </div>
                  <div>
                    <div className={cn(
                      "text-xs font-mono font-bold tracking-widest mb-2",
                      step.highlight ? "text-violet-400" : "text-zinc-600"
                    )}>
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1.5">{step.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

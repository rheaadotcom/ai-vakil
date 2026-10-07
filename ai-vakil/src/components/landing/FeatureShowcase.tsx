"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileSearch, MessageSquare, BookOpen, Calendar, ClipboardList, AlertTriangle } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "AI Document Analysis",
    description: "Understand the structure and meaning of complex legal documents.",
    size: "large",
  },
  {
    icon: MessageSquare,
    title: "Ask Your Document",
    description: "Ask questions naturally and get answers grounded in your document.",
    size: "normal",
  },
  {
    icon: BookOpen,
    title: "Clause Explorer",
    description: "Find termination, payment, confidentiality, liability and other important clauses.",
    size: "normal",
  },
  {
    icon: Calendar,
    title: "Important Dates",
    description: "Surface deadlines, notice periods and agreement dates.",
    size: "normal",
  },
  {
    icon: ClipboardList,
    title: "Obligations",
    description: "Understand what you and the other party are expected to do.",
    size: "normal",
  },
  {
    icon: AlertTriangle,
    title: "Attention Areas",
    description: "See provisions that may deserve closer review.",
    size: "large",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeatureShowcase() {
  return (
    <section id="features" className="py-28 px-5 sm:px-8 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-4">Features</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight max-w-2xl mx-auto">
            Everything important.
            <span className="block text-zinc-400">Without reading every line.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={item}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="glass-card rounded-2xl border border-white/[0.07] p-7 hover:border-violet-500/20 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

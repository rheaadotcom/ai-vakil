"use client";

import React from "react";
import { motion } from "framer-motion";

export function Disclaimer() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 px-5 sm:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl border border-white/[0.05] bg-white/[0.01] px-6 py-4 text-center">
          <p className="text-xs text-zinc-600 leading-relaxed">
            <span className="text-zinc-500 font-medium">Disclaimer: </span>
            AI Vakil provides AI-powered document intelligence and educational information. It does not provide legal representation or professional legal advice. For important legal matters, consider consulting a qualified legal professional.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

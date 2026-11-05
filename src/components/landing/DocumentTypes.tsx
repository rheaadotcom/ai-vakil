"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, Shield, Pen, Settings2, Mail } from "lucide-react";

const docTypes = [
  {
    icon: FileText,
    title: "Rental Agreements",
    description: "Residential and commercial rental and lease agreements.",
  },
  {
    icon: Briefcase,
    title: "Employment Agreements",
    description: "Offer letters, employment contracts, and HR agreements.",
  },
  {
    icon: Shield,
    title: "NDAs",
    description: "Non-disclosure and confidentiality agreements.",
  },
  {
    icon: Pen,
    title: "Freelance Contracts",
    description: "Project agreements and scope-of-work documents.",
  },
  {
    icon: Settings2,
    title: "Service Agreements",
    description: "Service contracts, vendor agreements and SLAs.",
  },
  {
    icon: Mail,
    title: "Offer Letters",
    description: "Job offers and formal employment proposals.",
  },
];

export function DocumentTypes() {
  return (
    <section className="py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-4">Document Types</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Built for everyday legal documents.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {docTypes.map((doc, i) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -2 }}
                className="glass-card rounded-2xl border border-white/[0.07] p-6 flex items-start gap-4 hover:border-violet-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{doc.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{doc.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

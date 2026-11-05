"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What documents can I upload?",
    a: "You can upload PDF and DOCX files. AI Vakil works best with standard legal documents such as rental agreements, employment contracts, NDAs, freelance agreements, service agreements, and offer letters.",
  },
  {
    q: "Does AI Vakil provide legal advice?",
    a: "No. AI Vakil provides AI-powered document intelligence and educational information. It does not provide legal representation or professional legal advice. For important legal matters, consider consulting a qualified legal professional.",
  },
  {
    q: "Can I ask questions about my document?",
    a: "Yes. Once a document is uploaded and analyzed, you can ask questions in plain English. Answers are grounded in your document and include source references to the relevant pages.",
  },
  {
    q: "Can AI Vakil understand contracts?",
    a: "AI Vakil is designed to analyze common legal documents. It can identify clauses, dates, obligations, and key terms. Results are based on the content of your uploaded document.",
  },
  {
    q: "Are my documents stored?",
    a: "This is a prototype. Please do not upload sensitive or confidential documents. In a production version, document storage and privacy practices would be governed by a privacy policy.",
  },
  {
    q: "Can I export an analysis report?",
    a: "Analysis report export is available on the Pro plan. The report includes a document summary, clause overview, important dates, obligations, and attention areas.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-28 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-4">FAQ</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Common questions.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm font-medium text-zinc-200">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-white/[0.05] pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

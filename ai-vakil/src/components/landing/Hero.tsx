"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductPreview } from "./ProductPreview";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-5 sm:px-8 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-500/6 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 text-xs font-semibold tracking-[0.12em] text-violet-300 uppercase"
        >
          <Sparkles className="w-3 h-3" />
          AI-Powered Legal Document Intelligence
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl lg:text-[82px] font-semibold leading-[1.05] tracking-tight text-white mb-7"
        >
          Understand Your{" "}
          <span className="block mt-1">
            Legal Documents
            <span className="gradient-text-accent">.</span>
          </span>
          <span className="block text-zinc-400 mt-1">Without the Legal Jargon</span>
          <span className="gradient-text-accent text-5xl sm:text-6xl lg:text-[82px]">.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed mb-10"
        >
          Upload a legal document, ask questions in plain English, understand important clauses, and discover what deserves your attention — in seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <Link href="/login">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="px-8 py-3.5 text-base shadow-xl shadow-violet-600/25"
            >
              Try AI Vakil
            </Button>
          </Link>
          <Link href="/documents/demo-rental">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3.5 text-base"
            >
              Explore Demo
            </Button>
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xs text-zinc-600 tracking-wide"
        >
          PDF &amp; DOCX &nbsp;•&nbsp; AI-powered analysis &nbsp;•&nbsp; Source-backed answers
        </motion.p>
      </div>

      {/* Product Preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto mt-16"
      >
        <ProductPreview />
      </motion.div>
    </section>
  );
}

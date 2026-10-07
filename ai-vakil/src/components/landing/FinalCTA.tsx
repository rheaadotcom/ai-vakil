"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-32 px-5 sm:px-8 relative overflow-hidden">
      {/* Large ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-indigo-600/10 rounded-full blur-[80px]" />
      </div>

      {/* Subtle radial border */}
      <div className="absolute inset-x-8 sm:inset-x-16 inset-y-8 rounded-3xl border border-white/[0.04] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-6">Get Started</p>
          <h2 className="font-display text-5xl sm:text-6xl font-semibold text-white tracking-tight leading-[1.06] mb-6">
            Your legal documents.
            <span className="block gradient-text-accent mt-1">Finally understandable.</span>
          </h2>
          <p className="text-base text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed">
            Turn complicated documents into clear, searchable, actionable information.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="px-9 py-3.5 text-base shadow-2xl shadow-violet-600/30"
              >
                Try AI Vakil
              </Button>
            </Link>
            <Link href="/documents/demo-rental">
              <Button variant="outline" size="lg" className="px-9 py-3.5 text-base">
                Explore Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

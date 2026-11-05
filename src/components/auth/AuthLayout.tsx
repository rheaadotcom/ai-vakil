"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scale,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  Sparkles,
  FileText,
  AlertTriangle,
} from "lucide-react";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-[#070707] text-[#F8F7FB] flex flex-col justify-between overflow-x-hidden selection:bg-violet-500/30 selection:text-white">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[130px]" />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* Top Navbar / Back navigation */}
      <header className="relative z-20 w-full px-6 py-5 max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors duration-200"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/25 group-hover:border-violet-500/50 group-hover:bg-violet-500/20 transition-all duration-200">
            <Scale className="h-4 w-4 text-violet-400 group-hover:text-violet-300" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-zinc-100">
            AI Vakil
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors py-1.5 px-3 rounded-lg hover:bg-white/[0.04]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Brand & Interactive Document Visual (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-8 pr-4">
            {/* Tagline & Headline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                <span>AI-Powered Legal Document Intelligence</span>
              </div>

              <h1 className="font-serif text-4xl xl:text-5xl font-normal tracking-tight text-zinc-100 leading-[1.15]">
                Understand your documents.{" "}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
                  With clarity.
                </span>
              </h1>

              <p className="text-zinc-400 text-sm xl:text-base leading-relaxed max-w-lg">
                Upload digital contracts, review clauses with source citations,
                identify critical deadlines, and make confident decisions
                without legal confusion.
              </p>
            </motion.div>

            {/* Abstract Legal/Document UI Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-md"
            >
              {/* Decorative Document Card Mockup */}
              <div className="relative rounded-2xl border border-white/[0.08] bg-[#0E0E14]/90 p-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-violet-400">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-200">
                        Residential_Lease_Agreement.pdf
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        14 Pages • Analyzed just now
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    Source Verified
                  </span>
                </div>

                {/* Simulated Contract Clauses */}
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-violet-300 font-mono">
                        Clause 14.2 — Termination Notice
                      </span>
                      <span className="text-amber-400 text-[10px] font-medium flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Closer Review
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      &ldquo;Either party may terminate this lease by providing no
                      less than sixty (60) days prior written notice to the
                      registered address...&rdquo;
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-violet-300 font-mono">
                        Clause 4.1 — Security Deposit
                      </span>
                      <span className="text-emerald-400 text-[10px] font-medium">
                        Standard Term
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      &ldquo;Tenant shall deposit with Landlord the sum of ₹60,000 as
                      security for full performance of lease obligations...&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: 24 Clauses Analyzed */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -top-3.5 -left-4 sm:-left-6 px-3.5 py-2 rounded-xl bg-[#12121A]/95 border border-white/[0.12] shadow-xl backdrop-blur-xl flex items-center gap-2"
              >
                <div className="h-5 w-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-zinc-100">
                  24 Clauses Analyzed
                </span>
              </motion.div>

              {/* Floating Badge 2: 4 Important Dates */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-3.5 -right-3 sm:-right-5 px-3.5 py-2 rounded-xl bg-[#12121A]/95 border border-white/[0.12] shadow-xl backdrop-blur-xl flex items-center gap-2"
              >
                <div className="h-5 w-5 rounded-md bg-violet-500/20 text-violet-400 flex items-center justify-center">
                  <Calendar className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-zinc-100">
                  4 Important Dates
                </span>
              </motion.div>

              {/* Floating Badge 3: AI-powered insights */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-8 left-6 px-3 py-1.5 rounded-lg bg-violet-950/70 border border-violet-500/30 text-violet-300 shadow-lg text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-md"
              >
                <Sparkles className="h-3 w-3 text-violet-400" />
                <span>AI-powered insights</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Form Container */}
          <div className="col-span-1 lg:col-span-6 w-full flex justify-center">
            {children}
          </div>
        </div>
      </main>

      {/* Footer disclaimer / privacy note */}
      <footer className="relative z-20 w-full px-6 py-4 text-center border-t border-white/[0.04]">
        <p className="text-[11px] text-zinc-500">
          AI Vakil provides document intelligence for informational clarity. It
          does not constitute formal legal representation.
        </p>
      </footer>
    </div>
  );
}

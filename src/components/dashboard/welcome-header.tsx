"use client";

import React from "react";
import Link from "next/link";
import { UploadCloud, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUploadModal } from "@/components/layout/app-shell";

export interface WelcomeHeaderProps {
  userName?: string;
  className?: string;
}

export function WelcomeHeader({
  userName = "Riya",
  className,
}: WelcomeHeaderProps) {
  const { openUploadModal } = useUploadModal();

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#12111A]/90 via-[#0D0D12]/80 to-[#0A0A0D]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/40 ${
        className || ""
      }`}
    >
      {/* Ambient gradient flare */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-[11px] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span>Workspace Active · Indian Jurisdiction (IEA & ICA Compliant)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-100 font-display">
            Good morning, {userName}.
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
            Continue reviewing your legal agreements, verify termination terms, track upcoming deadlines, and inspect important clauses across your workspace.
          </p>
        </div>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={openUploadModal}
            leftIcon={<UploadCloud className="h-4 w-4" />}
            className="shadow-lg shadow-violet-600/30"
          >
            Upload Document
          </Button>

          <Link href="/documents/demo-rental">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Play className="h-3.5 w-3.5 text-violet-400" />}
              rightIcon={<ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />}
              className="border-white/10 hover:border-violet-500/40 hover:bg-white/[0.04]"
            >
              Try Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

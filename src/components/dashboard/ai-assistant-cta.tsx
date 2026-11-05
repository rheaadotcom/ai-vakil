"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageSquare, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AIAssistantCTAProps {
  className?: string;
}

export function AIAssistantCTA({ className }: AIAssistantCTAProps) {
  const suggestedQuestions = [
    "Can I terminate my rental agreement early?",
    "What happens to my security deposit?",
    "When does my agreement end?",
  ];

  return (
    <div
      className={`rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-[#0E0D14]/90 to-[#0A0A0D]/95 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-violet-950/20 relative overflow-hidden group ${
        className || ""
      }`}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-300 font-mono">
            Legal Intelligence Assistant
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100 font-display">
            Ask your documents.
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
            Get answers grounded in the documents in your workspace with page-level citations and clause references.
          </p>
        </div>

        {/* Suggested Question Chips */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            Suggested Prompts
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <Link
                key={q}
                href="/chat"
                className="text-[11px] px-2.5 py-1 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-violet-500/10 hover:border-violet-500/30 text-zinc-300 hover:text-violet-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <MessageSquare className="h-3 w-3 text-zinc-500" />
                <span>{q}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Link href="/chat">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Bot className="h-4 w-4" />}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              className="shadow-lg shadow-violet-600/25"
            >
              Ask AI
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

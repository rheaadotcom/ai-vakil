import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Scale } from "lucide-react";

export interface LoadingStateProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function LoadingState({
  title = "Analyzing Legal Document...",
  subtitle = "Our legal AI intelligence engine is parsing clauses, identifying obligations, and evaluating contractual risk.",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-white/[0.06] bg-[#0D0D10]/60 backdrop-blur-xl",
        className
      )}
    >
      <div className="relative mb-6">
        {/* Pulsing ambient halo */}
        <div className="absolute -inset-3 rounded-full bg-violet-500/20 blur-xl animate-pulse" />

        {/* Central legal icon container */}
        <div className="relative h-16 w-16 rounded-2xl bg-zinc-900 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-2xl">
          <Scale className="h-8 w-8 animate-pulse text-violet-300" />
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-violet-400 animate-bounce" />
        </div>
      </div>

      <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
      <p className="text-xs text-zinc-400 max-w-md leading-relaxed">{subtitle}</p>

      {/* Progress bar shimmer effect */}
      <div className="w-48 h-1 rounded-full bg-white/[0.06] mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full w-1/2 animate-[shimmer_1.5s_infinite] -translate-x-full" />
      </div>
    </div>
  );
}

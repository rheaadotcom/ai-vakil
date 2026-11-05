import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ClauseStatCardProps {
  label: string;
  value: string;
  accent?: "violet" | "emerald" | "amber" | "blue";
  onClick?: () => void;
}

export function ClauseStatCard({ label, value, accent = "violet", onClick }: ClauseStatCardProps) {
  const accentStyles = {
    violet: "border-violet-500/25 bg-violet-500/[0.07] text-violet-200",
    emerald: "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-200",
    amber: "border-amber-500/25 bg-amber-500/[0.07] text-amber-200",
    blue: "border-sky-500/25 bg-sky-500/[0.07] text-sky-200",
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      className={cn(
        "w-full rounded-2xl border p-4 text-left shadow-lg shadow-black/20 transition-colors",
        accentStyles[accent]
      )}
    >
      <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-400">{label}</div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</div>
    </motion.button>
  );
}

export interface ClauseStatsProps {
  totalClauses: number;
  totalDocuments: number;
  categories: number;
  reviewClauses: number;
}

export function ClauseStats({ totalClauses, totalDocuments, categories, reviewClauses }: ClauseStatsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <ClauseStatCard label="Clauses Analyzed" value={String(totalClauses).padStart(2, "0")} accent="violet" />
      <ClauseStatCard label="Documents" value={String(totalDocuments).padStart(2, "0")} accent="blue" />
      <ClauseStatCard label="Categories" value={String(categories).padStart(2, "0")} accent="emerald" />
      <ClauseStatCard label="May Require Review" value={String(reviewClauses).padStart(2, "0")} accent="amber" />
    </div>
  );
}

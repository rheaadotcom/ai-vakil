"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className={cn(
        "relative w-full max-w-md mx-auto rounded-3xl border border-white/[0.08] bg-[#0E0E14]/85 p-7 sm:p-9 shadow-2xl shadow-black/80 backdrop-blur-2xl text-zinc-100",
        "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/[0.03] before:to-transparent before:pointer-events-none",
        className
      )}
    >
      {/* Subtle top card accent highlight */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      {children}
    </motion.div>
  );
}

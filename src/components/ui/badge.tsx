import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "destructive"
    | "legal";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-zinc-800/80 text-zinc-300 border-white/[0.08]",
    primary:
      "bg-violet-500/15 text-violet-300 border-violet-500/30",
    secondary:
      "bg-zinc-700/50 text-zinc-200 border-white/10",
    outline:
      "bg-transparent text-zinc-400 border-white/15",
    success:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    warning:
      "bg-amber-500/15 text-amber-300 border-amber-500/30",
    destructive:
      "bg-rose-500/15 text-rose-300 border-rose-500/30",
    legal:
      "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  };

  const dotColors = {
    default: "bg-zinc-400",
    primary: "bg-violet-400",
    secondary: "bg-zinc-300",
    outline: "bg-zinc-400",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    destructive: "bg-rose-400",
    legal: "bg-indigo-400",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant])}
        />
      )}
      {children}
    </div>
  );
}

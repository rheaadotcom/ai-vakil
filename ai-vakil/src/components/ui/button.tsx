"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "subtle"
    | "glass";
  size?: "xs" | "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 disabled:pointer-events-none disabled:opacity-45 select-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/35 border border-violet-400/25",
      secondary:
        "bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100 border border-white/10 hover:border-white/20 shadow-sm",
      outline:
        "border border-white/12 hover:border-violet-500/50 hover:bg-violet-500/10 text-zinc-200 hover:text-white backdrop-blur-md",
      ghost:
        "hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-100",
      destructive:
        "bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 hover:border-red-500/50",
      subtle:
        "bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-transparent",
      glass:
        "glass-surface hover:border-violet-500/40 text-zinc-200 hover:text-white shadow-lg shadow-black/40",
    };

    const sizes = {
      xs: "text-xs px-2.5 py-1.5 gap-1.5 rounded-lg",
      sm: "text-xs px-3 py-2 gap-2 rounded-lg",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5 rounded-2xl",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

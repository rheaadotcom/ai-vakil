import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <textarea
          ref={ref}
          className={cn(
            "flex min-h-[90px] w-full rounded-xl border border-white/[0.08] bg-[#0D0D10]/80 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 backdrop-blur-md transition-all duration-200",
            "focus-visible:outline-none focus-visible:border-violet-500/50 focus-visible:ring-2 focus-visible:ring-violet-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            error && "border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-400 font-medium pl-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-zinc-500 pl-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

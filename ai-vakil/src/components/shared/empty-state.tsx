import React from "react";
import { cn } from "@/lib/utils";
import { FileQuestion } from "lucide-react";

export interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = FileQuestion,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-white/10 bg-white/[0.015]",
        className
      )}
    >
      <div className="h-12 w-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 shadow-lg shadow-violet-500/5">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-zinc-100 mb-1.5">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-sm leading-relaxed mb-5">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}

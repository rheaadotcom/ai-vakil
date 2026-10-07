import React from "react";
import { cn } from "@/lib/utils";
import { DocumentStatus, RiskLevel } from "@/types";
import { AlertTriangle, CheckCircle2, Clock, AlertOctagon } from "lucide-react";

export interface StatusBadgeProps {
  status?: DocumentStatus | "Analyzed" | "Processing" | "Needs Review" | "May Require Review" | "needs_review";
  riskLevel?: RiskLevel;
  className?: string;
  size?: "sm" | "md";
}

export function StatusBadge({
  status,
  riskLevel,
  className,
  size = "md",
}: StatusBadgeProps) {
  // If riskLevel is provided
  if (riskLevel) {
    const riskConfig = {
      low: {
        label: "Low Risk",
        icon: CheckCircle2,
        styles: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
        dot: "bg-emerald-400",
      },
      medium: {
        label: "Moderate Risk",
        icon: AlertTriangle,
        styles: "bg-amber-500/10 text-amber-400 border-amber-500/25",
        dot: "bg-amber-400",
      },
      high: {
        label: "High Risk",
        icon: AlertTriangle,
        styles: "bg-orange-500/10 text-orange-400 border-orange-500/25",
        dot: "bg-orange-400",
      },
      critical: {
        label: "Critical Risk",
        icon: AlertOctagon,
        styles: "bg-rose-500/10 text-rose-400 border-rose-500/30",
        dot: "bg-rose-400",
      },
    };

    const config = riskConfig[riskLevel];
    const Icon = config.icon;

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border font-medium select-none",
          config.styles,
          size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
          className
        )}
      >
        <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
        <span>{config.label}</span>
      </span>
    );
  }

  // If status is provided, normalize status key
  const normalizedStatus = typeof status === "string" ? status.toLowerCase().replace(/\s+/g, "_") : "analyzed";

  const statusConfig: Record<
    string,
    { label: string; icon: React.ComponentType<{ className?: string }>; styles: string; animate: boolean }
  > = {
    uploaded: {
      label: "Uploaded",
      icon: Clock,
      styles: "bg-zinc-800 text-zinc-300 border-white/10",
      animate: false,
    },
    processing: {
      label: "Processing",
      icon: Clock,
      styles: "bg-violet-500/15 text-violet-300 border-violet-500/30",
      animate: true,
    },
    analyzed: {
      label: "Analyzed",
      icon: CheckCircle2,
      styles: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
      animate: false,
    },
    needs_review: {
      label: "Needs Review",
      icon: AlertTriangle,
      styles: "bg-amber-500/10 text-amber-400 border-amber-500/25",
      animate: false,
    },
    may_require_review: {
      label: "May Require Review",
      icon: AlertTriangle,
      styles: "bg-amber-500/10 text-amber-400 border-amber-500/25",
      animate: false,
    },
    error: {
      label: "Analysis Error",
      icon: AlertOctagon,
      styles: "bg-rose-500/10 text-rose-400 border-rose-500/25",
      animate: false,
    },
  };

  const config = statusConfig[normalizedStatus] || statusConfig.analyzed;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium select-none",
        config.styles,
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      <Icon
        className={cn(
          size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5",
          config.animate && "animate-spin text-violet-400"
        )}
      />
      <span>{config.label}</span>
    </span>
  );
}

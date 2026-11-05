import React from "react";
import { cn } from "@/lib/utils";

export interface AmbientBackgroundProps {
  className?: string;
  showGrid?: boolean;
}

export function AmbientBackground({
  className,
  showGrid = true,
}: AmbientBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none",
        className
      )}
    >
      {/* Primary purple ambient glow at top center */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-violet-600/[0.07] blur-[140px]" />

      {/* Subtle indigo glow on bottom right */}
      <div className="absolute top-[40%] -right-[15%] w-[650px] h-[650px] rounded-full bg-indigo-600/[0.04] blur-[150px]" />

      {/* Deep purple glow on bottom left */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[700px] h-[550px] rounded-full bg-purple-700/[0.05] blur-[160px]" />

      {/* Subtle grid pattern overlay */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      )}
    </div>
  );
}

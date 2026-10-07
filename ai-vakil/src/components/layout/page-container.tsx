import React from "react";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/shared/page-transition";

export interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  maxWidth?: "default" | "full" | "narrow" | "wide";
  className?: string;
}

export function PageContainer({
  children,
  title,
  description,
  actions,
  badge,
  maxWidth = "default",
  className,
}: PageContainerProps) {
  const maxWidthClasses = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1600px]",
    full: "max-w-full",
  };

  return (
    <PageTransition>
      <div
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8",
          maxWidthClasses[maxWidth],
          className
        )}
      >
        {(title || actions) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-white/[0.04]">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                {title && (
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 font-display">
                    {title}
                  </h1>
                )}
                {badge}
              </div>
              {description && (
                <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2.5 shrink-0">
                {actions}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </PageTransition>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, CalendarDays } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UpcomingDateItem } from "@/lib/mock-dashboard";

export interface UpcomingDatesProps {
  dates?: UpcomingDateItem[];
  className?: string;
}

export function UpcomingDates({ dates = [], className }: UpcomingDatesProps) {
  if (!dates || dates.length === 0) {
    return (
      <Card className={`p-5 ${className || ""}`}>
        <div className="flex items-center gap-3 text-zinc-400 text-xs">
          <CalendarDays className="h-5 w-5 text-violet-400 shrink-0" />
          <span>No upcoming contract deadlines or notice expiration dates scheduled.</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden border border-white/[0.08] bg-[#0D0D12]/80 backdrop-blur-xl ${className || ""}`}>
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between border-b border-white/[0.04]">
        <div>
          <CardTitle className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-violet-400" />
            <span>Upcoming Dates</span>
          </CardTitle>
          <CardDescription className="text-xs text-zinc-400">
            Critical deadlines, renewal milestones, and notice windows
          </CardDescription>
        </div>
        <Link
          href="/insights"
          className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
        >
          <span>All dates</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {dates.map((item) => (
          <Link
            key={item.id}
            href="/documents/demo-rental?page=7"
            className="flex items-start gap-3.5 p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.035] hover:border-violet-500/25 transition-all group"
          >
            {/* Visual Date Badge */}
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex flex-col items-center justify-center text-center shrink-0 group-hover:scale-105 group-hover:border-violet-500/40 transition-all">
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-300 font-bold leading-none">
                {item.dayMonth.split(" ")[1] || "OCT"}
              </span>
              <span className="text-base font-bold text-zinc-100 leading-tight font-display">
                {item.dayMonth.split(" ")[0] || "12"}
              </span>
            </div>

            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-violet-200 transition-colors truncate">
                  {item.title}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                  {item.year}
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center gap-2 pt-0.5 text-[10px] font-mono text-zinc-500">
                <span className="text-violet-400">{item.source}</span>
                <span>·</span>
                <span>{item.clauseRef}</span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

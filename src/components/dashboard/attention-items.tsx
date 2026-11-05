"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { AttentionItem } from "@/lib/mock-dashboard";

export interface AttentionItemsProps {
  items?: AttentionItem[];
  className?: string;
}

export function AttentionItems({ items = [], className }: AttentionItemsProps) {
  if (!items || items.length === 0) {
    return (
      <Card className={`p-5 ${className || ""}`}>
        <div className="flex items-center gap-3 text-zinc-400 text-xs">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>All clauses currently meet standard drafting parameters. No attention items flagged.</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden border border-white/[0.08] bg-[#0D0D12]/80 backdrop-blur-xl ${className || ""}`}>
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between border-b border-white/[0.04]">
        <div>
          <CardTitle className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Attention Items</span>
          </CardTitle>
          <CardDescription className="text-xs text-zinc-400">
            Clauses highlighted for careful review based on contractual obligations
          </CardDescription>
        </div>
        <Link
          href="/clauses"
          className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
        >
          <span>Clause view</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href="/documents/demo-rental?page=7"
            className="block p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.035] hover:border-amber-500/25 transition-all group"
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {item.source}
                </span>
              </div>
              <StatusBadge status={item.status} size="sm" />
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-zinc-400" />
                <span>{item.clauseRef}</span>
              </span>
              <span className="text-violet-400 group-hover:underline flex items-center gap-0.5">
                Inspect Source <ArrowRight className="h-2.5 w-2.5" />
              </span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

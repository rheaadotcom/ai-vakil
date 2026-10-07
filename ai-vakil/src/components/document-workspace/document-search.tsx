"use client";

import React, { useState } from "react";
import { Search, X, ChevronRight, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockSearchIndex } from "@/lib/mock-document";

export interface DocumentSearchProps {
  onNavigateToResult: (page: number, section: string) => void;
  onClose: () => void;
  className?: string;
}

export function DocumentSearch({
  onNavigateToResult,
  onClose,
  className,
}: DocumentSearchProps) {
  const [query, setQuery] = useState("");

  const sampleKeywords = ["termination", "notice", "deposit", "rent", "maintenance"];

  // Search results from mock index
  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const normalized = query.toLowerCase().trim();

    // Check direct key match or partial matches
    const matchedKeys = Object.keys(mockSearchIndex).filter((k) =>
      k.includes(normalized) || normalized.includes(k)
    );

    const accumulated: { page: number; section: string; snippet: string }[] = [];
    for (const key of matchedKeys) {
      accumulated.push(...mockSearchIndex[key]);
    }

    return accumulated;
  }, [query]);

  return (
    <div
      className={`p-3 rounded-xl bg-[#111116] border border-white/10 shadow-2xl space-y-2.5 ${
        className || ""
      }`}
    >
      {/* Search Input Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search document (e.g. notice, termination, deposit)..."
            leftIcon={<Search className="h-3.5 w-3.5" />}
            autoFocus
            className="h-8 text-xs bg-black/40 border-white/10"
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08]"
          aria-label="Close search"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Suggested keywords when query is empty */}
      {!query && (
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[11px] text-zinc-500">Suggested:</span>
          {sampleKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => setQuery(kw)}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-violet-500/15 text-zinc-400 hover:text-violet-300 transition-colors"
            >
              {kw}
            </button>
          ))}
        </div>
      )}

      {/* Results List */}
      {query && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <span>
              <strong>{results.length}</strong> {results.length === 1 ? "match" : "matches"} found
            </span>
          </div>

          {results.length === 0 ? (
            <p className="text-xs text-zinc-500 py-2 text-center">
              No matching legal terms found on these pages. Try &quot;notice&quot; or &quot;termination&quot;.
            </p>
          ) : (
            <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar">
              {results.map((res, i) => (
                <button
                  key={`${res.page}-${res.section}-${i}`}
                  type="button"
                  onClick={() => {
                    onNavigateToResult(res.page, res.section);
                    onClose();
                  }}
                  className="w-full text-left p-2 rounded-lg bg-white/[0.02] hover:bg-violet-500/10 border border-white/[0.04] hover:border-violet-500/20 transition-all flex items-start justify-between gap-2 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-violet-300">
                      <FileText className="h-3 w-3" />
                      <span>{res.section}</span>
                      <span className="text-zinc-500 font-mono">Page {res.page}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                      {res.snippet}
                    </p>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-violet-400 shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

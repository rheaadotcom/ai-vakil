import React from "react";
import { ArrowUpRight, Bookmark, Copy, FileText, Share2, Sparkles, GitCompareArrows } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MockClause } from "@/lib/mock-clauses";

export interface ClauseDetailsProps {
  clause: MockClause;
  isSaved: boolean;
  relatedClauses: MockClause[];
  onToggleSave: (clauseId: string) => void;
  onCopy: (value: string) => void;
  onExplain: () => void;
  onShare: () => void;
  onCompare: () => void;
  onOpenSource: (clause: MockClause) => void;
  onSelectRelatedClause: (clauseId: string) => void;
}

const statusVariantMap: Record<MockClause["status"], "success" | "warning" | "primary"> = {
  Standard: "success",
  Important: "primary",
  "May Require Review": "warning",
};

export function ClauseDetails({
  clause,
  isSaved,
  relatedClauses,
  onToggleSave,
  onCopy,
  onExplain,
  onShare,
  onCompare,
  onOpenSource,
  onSelectRelatedClause,
}: ClauseDetailsProps) {
  return (
    <div className="h-full rounded-[28px] border border-white/[0.08] bg-[#0B0B10]/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" size="sm" className="text-[10px] uppercase tracking-[0.12em] text-violet-200">
              {clause.category}
            </Badge>
            <Badge variant={statusVariantMap[clause.status]} size="sm" className="text-[10px] uppercase tracking-[0.08em]">
              {clause.status}
            </Badge>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">{clause.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <span>{clause.documentName}</span>
              <span className="text-zinc-600">•</span>
              <span>
                Page {clause.page} · {clause.section}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={isSaved ? `Remove ${clause.title} from saved clauses` : `Save ${clause.title}`}
          onClick={() => onToggleSave(clause.id)}
          className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5 text-zinc-300 transition-colors hover:border-violet-500/40 hover:text-violet-200"
        >
          <Bookmark className={isSaved ? "h-4 w-4 fill-violet-300 text-violet-300" : "h-4 w-4"} />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="primary" size="sm" onClick={onExplain} leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
          Explain with AI
        </Button>
        <Button variant="outline" size="sm" onClick={() => onCopy(clause.originalText)} leftIcon={<Copy className="h-3.5 w-3.5" />}>
          Copy
        </Button>
        <Button variant="secondary" size="sm" onClick={onShare} leftIcon={<Share2 className="h-3.5 w-3.5" />}>
          Share
        </Button>
        <Button variant="secondary" size="sm" onClick={onCompare} leftIcon={<GitCompareArrows className="h-3.5 w-3.5" />}>
          Compare
        </Button>
      </div>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0E1016]/80 p-4">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Original Clause</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-200">“{clause.originalText}”</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0E1016]/80 p-4">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Simple Language</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-200">{clause.simpleLanguage}</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0E1016]/80 p-4">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Why It Matters</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-200">{clause.whyItMatters}</p>
        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.18em] text-violet-200">Source</h3>
              <div className="mt-2 text-sm text-zinc-200">
                Page {clause.page} · {clause.section}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenSource(clause)}
              className="inline-flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 py-2 text-xs text-violet-200 transition-colors hover:border-violet-500/40 hover:bg-violet-500/20"
            >
              Open source
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-4">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
          <FileText className="h-3.5 w-3.5" />
          Related Clauses
        </div>

        <div className="space-y-2">
          {relatedClauses.length > 0 ? (
            relatedClauses.map((relatedClause) => (
              <button
                key={relatedClause.id}
                type="button"
                onClick={() => onSelectRelatedClause(relatedClause.id)}
                className="flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-left transition-colors hover:border-violet-500/30 hover:bg-violet-500/[0.04]"
              >
                <div>
                  <div className="text-sm font-medium text-zinc-100">{relatedClause.title}</div>
                  <div className="text-xs text-zinc-400">Page {relatedClause.page}</div>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
              </button>
            ))
          ) : (
            <p className="text-sm text-zinc-400">No related clauses in this document.</p>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MockClause } from "@/lib/mock-clauses";
import { Bookmark, BookmarkCheck } from "lucide-react";

export interface ClauseCardProps {
  clause: MockClause;
  isSelected?: boolean;
  isSaved?: boolean;
  onSelect: (clauseId: string) => void;
  onToggleSave: (clauseId: string) => void;
}

const statusStyles: Record<MockClause["status"], "primary" | "success" | "warning" | "destructive"> = {
  Standard: "success",
  Important: "primary",
  "May Require Review": "warning",
};

export function ClauseCard({ clause, isSelected = false, isSaved = false, onSelect, onToggleSave }: ClauseCardProps) {
  return (
    <div
      className={cn(
        "group rounded-[22px] border p-4 transition-all duration-200",
        isSelected
          ? "border-violet-500/40 bg-violet-500/[0.08] shadow-lg shadow-violet-900/10"
          : "border-white/[0.06] bg-[#101116]/70 hover:border-violet-500/25 hover:bg-white/[0.02]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" size="sm" className="text-[10px] uppercase tracking-[0.12em] text-violet-200">
              {clause.category}
            </Badge>
            <Badge variant={statusStyles[clause.status]} size="sm" className="text-[10px] uppercase tracking-[0.08em]">
              {clause.status}
            </Badge>
          </div>

          <button
            type="button"
            onClick={() => onSelect(clause.id)}
            className="text-left"
            aria-label={`Open ${clause.title}`}
          >
            <h3 className="text-base font-semibold text-zinc-100">{clause.title}</h3>
          </button>

          <div className="text-xs text-zinc-400">
            {clause.documentName} · Page {clause.page}
          </div>
        </div>

        <button
          type="button"
          aria-label={isSaved ? `Remove ${clause.title} from saved clauses` : `Save ${clause.title}`}
          onClick={(event) => {
            event.stopPropagation();
            onToggleSave(clause.id);
          }}
          className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-2 text-zinc-400 transition-colors hover:border-violet-500/40 hover:text-violet-200"
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4 text-violet-300" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-300">“{clause.originalText}”</p>
    </div>
  );
}

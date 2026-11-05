import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ClauseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  documentFilter: string;
  onDocumentFilterChange: (value: string) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  categories: string[];
  statusOptions: string[];
  documentOptions: Array<{ value: string; label: string }>;
  sortOptions: string[];
}

export function ClauseFilters({
  searchTerm,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  statusFilter,
  onStatusFilterChange,
  documentFilter,
  onDocumentFilterChange,
  sortValue,
  onSortChange,
  categories,
  statusOptions,
  documentOptions,
  sortOptions,
}: ClauseFiltersProps) {
  return (
    <div className="rounded-[24px] border border-white/[0.08] bg-[#0B0B10]/80 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="flex-1">
            <Input
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search clauses..."
              leftIcon={<Search className="h-4 w-4" />}
              aria-label="Search clauses"
            />
          </div>
          <div className="w-full xl:max-w-[220px]">
            <label className="mb-1.5 block text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500">
              Sort
            </label>
            <select
              value={sortValue}
              onChange={(event) => onSortChange(event.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#111218] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-violet-500/50"
              aria-label="Sort clauses"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "border-violet-500/40 bg-violet-500/15 text-violet-100"
                    : "border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-violet-500/25 hover:text-violet-200"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#111218] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-violet-500/50"
              aria-label="Filter by status"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500">
              Document
            </label>
            <select
              value={documentFilter}
              onChange={(event) => onDocumentFilterChange(event.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#111218] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-violet-500/50"
              aria-label="Filter by document"
            >
              {documentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

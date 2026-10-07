"use client";

import React from "react";
import {
  Search,
  X,
  Filter,
  FileCode2,
  ArrowUpDown,
  LayoutGrid,
  List,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "@/components/ui/dropdown";

export type StatusFilterOption =
  | "all"
  | "Analyzed"
  | "Processing"
  | "Needs Review"
  | "favorites";

export type TypeFilterOption = "all" | "PDF" | "DOCX";

export type SortOption =
  | "recently_updated"
  | "recently_added"
  | "name_asc"
  | "name_desc";

export type ViewMode = "grid" | "list";

export interface DocumentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilterOption;
  onStatusFilterChange: (status: StatusFilterOption) => void;
  typeFilter: TypeFilterOption;
  onTypeFilterChange: (type: TypeFilterOption) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalFilteredCount: number;
  totalCount: number;
  onResetFilters: () => void;
  className?: string;
}

export function DocumentFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalFilteredCount,
  totalCount,
  onResetFilters,
  className,
}: DocumentFiltersProps) {
  const statusLabels: Record<StatusFilterOption, string> = {
    all: "All Documents",
    Analyzed: "Analyzed",
    Processing: "Processing",
    "Needs Review": "Needs Review",
    favorites: "Favorites",
  };

  const typeLabels: Record<TypeFilterOption, string> = {
    all: "All Types",
    PDF: "PDF",
    DOCX: "DOCX",
  };

  const sortLabels: Record<SortOption, string> = {
    recently_updated: "Recently Updated",
    recently_added: "Recently Added",
    name_asc: "Name A–Z",
    name_desc: "Name Z–A",
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    statusFilter !== "all" ||
    typeFilter !== "all" ||
    sortBy !== "recently_updated";

  return (
    <div className={`space-y-3 ${className || ""}`}>
      {/* Main Toolbar Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-full md:max-w-md">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search documents by name, type, or status..."
            leftIcon={<Search className="h-4 w-4" />}
            rightIcon={
              searchQuery ? (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="Clear search query"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : undefined
            }
            className="h-10 text-xs sm:text-sm bg-[#0E0E12]/90 border-white/[0.08]"
          />
        </div>

        {/* Right: Filter dropdowns, sort, and view mode toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter Dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant={statusFilter !== "all" ? "primary" : "outline"}
                size="sm"
                className="h-9 text-xs gap-1.5"
                leftIcon={<Filter className="h-3.5 w-3.5" />}
              >
                <span>{statusLabels[statusFilter]}</span>
              </Button>
            </DropdownTrigger>
            <DropdownContent align="right" className="w-48">
              <DropdownLabel>Filter By Status</DropdownLabel>
              <DropdownItem onClick={() => onStatusFilterChange("all")}>
                <div className="flex items-center justify-between w-full">
                  <span>All Documents</span>
                  {statusFilter === "all" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => onStatusFilterChange("Analyzed")}>
                <div className="flex items-center justify-between w-full">
                  <span>Analyzed</span>
                  {statusFilter === "Analyzed" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => onStatusFilterChange("Processing")}>
                <div className="flex items-center justify-between w-full">
                  <span>Processing</span>
                  {statusFilter === "Processing" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => onStatusFilterChange("Needs Review")}>
                <div className="flex items-center justify-between w-full">
                  <span>Needs Review</span>
                  {statusFilter === "Needs Review" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={() => onStatusFilterChange("favorites")}>
                <div className="flex items-center justify-between w-full">
                  <span>★ Favorites Only</span>
                  {statusFilter === "favorites" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>

          {/* Document Type Dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant={typeFilter !== "all" ? "primary" : "outline"}
                size="sm"
                className="h-9 text-xs gap-1.5"
                leftIcon={<FileCode2 className="h-3.5 w-3.5" />}
              >
                <span>{typeLabels[typeFilter]}</span>
              </Button>
            </DropdownTrigger>
            <DropdownContent align="right" className="w-40">
              <DropdownLabel>File Format</DropdownLabel>
              <DropdownItem onClick={() => onTypeFilterChange("all")}>
                <div className="flex items-center justify-between w-full">
                  <span>All Types</span>
                  {typeFilter === "all" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => onTypeFilterChange("PDF")}>
                <div className="flex items-center justify-between w-full">
                  <span>PDF Document</span>
                  {typeFilter === "PDF" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => onTypeFilterChange("DOCX")}>
                <div className="flex items-center justify-between w-full">
                  <span>DOCX Document</span>
                  {typeFilter === "DOCX" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>

          {/* Sort Dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="outline"
                size="sm"
                className="h-9 text-xs gap-1.5"
                leftIcon={<ArrowUpDown className="h-3.5 w-3.5" />}
              >
                <span>{sortLabels[sortBy]}</span>
              </Button>
            </DropdownTrigger>
            <DropdownContent align="right" className="w-48">
              <DropdownLabel>Sort By</DropdownLabel>
              <DropdownItem onClick={() => onSortChange("recently_updated")}>
                <div className="flex items-center justify-between w-full">
                  <span>Recently Updated</span>
                  {sortBy === "recently_updated" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => onSortChange("recently_added")}>
                <div className="flex items-center justify-between w-full">
                  <span>Recently Added</span>
                  {sortBy === "recently_added" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onClick={() => onSortChange("name_asc")}>
                <div className="flex items-center justify-between w-full">
                  <span>Name A–Z</span>
                  {sortBy === "name_asc" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
              <DropdownItem onClick={() => onSortChange("name_desc")}>
                <div className="flex items-center justify-between w-full">
                  <span>Name Z–A</span>
                  {sortBy === "name_desc" && <Check className="h-3.5 w-3.5 text-violet-400" />}
                </div>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>

          {/* Grid / List View Toggle */}
          <div className="flex items-center rounded-xl bg-zinc-900/80 p-0.5 border border-white/[0.08]">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active filters pill display and clear action */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs pt-1">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>
              Showing{" "}
              <strong className="text-zinc-100 font-semibold">
                {totalFilteredCount}
              </strong>{" "}
              of {totalCount} documents
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] text-zinc-200 text-[11px]">
                Search: &quot;{searchQuery}&quot;
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="hover:text-white"
                  aria-label="Remove search filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20 text-[11px]">
                Status: {statusLabels[statusFilter]}
                <button
                  type="button"
                  onClick={() => onStatusFilterChange("all")}
                  className="hover:text-white"
                  aria-label="Remove status filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {typeFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[11px]">
                Type: {typeFilter}
                <button
                  type="button"
                  onClick={() => onTypeFilterChange("all")}
                  className="hover:text-white"
                  aria-label="Remove type filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onResetFilters}
            className="text-[11px] text-violet-400 hover:text-violet-300 hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ViewerToolbarProps {
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
  onPageChange: (newPage: number) => void;
  onZoomChange: (newZoom: number) => void;
  onToggleSearch: () => void;
  onExplainClause?: () => void;
  searchOpen?: boolean;
  className?: string;
}

export function ViewerToolbar({
  currentPage,
  totalPages,
  zoomLevel,
  onPageChange,
  onZoomChange,
  onToggleSearch,
  onExplainClause,
  searchOpen = false,
  className,
}: ViewerToolbarProps) {
  const zoomLevels = [75, 90, 100, 110, 125];

  const handleZoomIn = () => {
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex < zoomLevels.length - 1) {
      onZoomChange(zoomLevels[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex > 0) {
      onZoomChange(zoomLevels[currentIndex - 1]);
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 p-2 rounded-xl bg-[#0D0D11]/90 border border-white/[0.08] backdrop-blur-md text-xs select-none ${
        className || ""
      }`}
    >
      {/* Left: Page Navigation */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Previous Page"
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="font-mono text-zinc-300 px-2 py-0.5 rounded bg-white/[0.04] text-[11px] font-semibold min-w-[50px] text-center">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Next Page"
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Middle: Document Search & Explain Clause */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleSearch}
          className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            searchOpen
              ? "bg-violet-600/30 text-violet-300 border border-violet-500/40"
              : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06]"
          }`}
          title="Search in document"
          aria-label="Search in document"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline text-[11px] font-medium">Search</span>
        </button>

        {onExplainClause && (
          <Button
            variant="outline"
            size="xs"
            onClick={onExplainClause}
            leftIcon={<Sparkles className="h-3 w-3 text-violet-400" />}
            className="text-[11px] h-7 hidden sm:inline-flex"
          >
            Explain Clause
          </Button>
        )}
      </div>

      {/* Right: Zoom Controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoomLevel <= 75}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </button>

        <span className="font-mono text-[11px] text-zinc-300 min-w-[42px] text-center">
          {zoomLevel}%
        </span>

        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoomLevel >= 125}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </button>

        {zoomLevel !== 100 && (
          <button
            type="button"
            onClick={() => onZoomChange(100)}
            className="p-1 rounded text-[10px] text-violet-400 hover:underline ml-1"
            title="Reset Zoom"
          >
            <Maximize2 className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}

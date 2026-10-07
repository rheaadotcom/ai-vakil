"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Sparkles, FileText, Star, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useUploadModal } from "@/components/layout/app-shell";
import {
  initialMockDocuments,
  MockDocument,
  DocumentStatsData,
} from "@/lib/mock-documents";
import { DocumentStats } from "./document-stats";
import {
  DocumentFilters,
  StatusFilterOption,
  TypeFilterOption,
  SortOption,
  ViewMode,
} from "./document-filters";
import { DocumentGrid } from "./document-grid";
import { DocumentList } from "./document-list";
import { UploadDocumentModal } from "./upload-document-modal";

export function DocumentsView() {
  const [documents, setDocuments] = useState<MockDocument[]>(initialMockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilterOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recently_updated");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [localUploadOpen, setLocalUploadOpen] = useState(false);

  // AppShell global upload modal
  const { openUploadModal } = useUploadModal();

  // Handle upload button click
  const handleOpenUpload = () => {
    // If AppShell upload modal is available, open it; otherwise open local modal
    if (openUploadModal) {
      openUploadModal();
    } else {
      setLocalUploadOpen(true);
    }
  };

  // Stats calculation
  const statsData: DocumentStatsData = useMemo(() => {
    const total = documents.length;
    const analyzed = documents.filter((d) => d.status === "Analyzed").length;
    const processing = documents.filter((d) => d.status === "Processing").length;
    const needsReview = documents.filter((d) => d.status === "Needs Review").length;
    return { total, analyzed, processing, needsReview };
  }, [documents]);

  // Handle stat card click to filter
  const handleStatFilterClick = (statusValue: string) => {
    if (statusValue === "all") {
      setStatusFilter("all");
    } else if (statusFilter === statusValue) {
      setStatusFilter("all");
    } else {
      setStatusFilter(statusValue as StatusFilterOption);
    }
  };

  // Handle favorite toggle
  const handleToggleFavorite = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, favorite: !doc.favorite } : doc
      )
    );
  };

  // Handle rename
  const handleRename = (id: string, newName: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, name: newName } : doc
      )
    );
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  // Handle upload success
  const handleUploadSuccess = (newDoc: MockDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setSortBy("recently_updated");
  };

  // Restore sample documents if library is emptied
  const handleRestoreDefaults = () => {
    setDocuments(initialMockDocuments);
    handleResetFilters();
  };

  // Filtered & sorted documents
  const filteredDocuments = useMemo(() => {
    return documents
      .filter((doc) => {
        // Status & Favorites filter
        if (statusFilter === "favorites") {
          if (!doc.favorite) return false;
        } else if (statusFilter !== "all") {
          if (doc.status !== statusFilter) return false;
        }

        // File Type filter
        if (typeFilter !== "all" && doc.fileType !== typeFilter) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = doc.name.toLowerCase().includes(query);
          const matchType = doc.type.toLowerCase().includes(query);
          const matchFileType = doc.fileType.toLowerCase().includes(query);
          const matchStatus = doc.status.toLowerCase().includes(query);
          const matchSummary = doc.summary?.toLowerCase().includes(query) || false;

          if (!matchName && !matchType && !matchFileType && !matchStatus && !matchSummary) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name_asc") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "name_desc") {
          return b.name.localeCompare(a.name);
        }
        if (sortBy === "recently_added") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        // default: recently_updated (keep initial array order)
        return 0;
      });
  }, [documents, statusFilter, typeFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ==================================================
          1. TOP HEADER
      ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 font-display">
            Your Documents
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage, review, and explore your legal documents.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link href="/documents/demo-rental">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Sparkles className="h-3.5 w-3.5 text-violet-400" />}
            >
              Try Demo
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenUpload}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* ==================================================
          2. DOCUMENT STATS (4 Compact Metric Cards)
      ================================================== */}
      <DocumentStats
        stats={statsData}
        activeFilter={statusFilter}
        onFilterClick={handleStatFilterClick}
      />

      {/* ==================================================
          3. TOOLBAR (Search, Filters, Sort, View Toggle)
      ================================================== */}
      <DocumentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalFilteredCount={filteredDocuments.length}
        totalCount={documents.length}
        onResetFilters={handleResetFilters}
      />

      {/* ==================================================
          4. DOCUMENT CONTENT / EMPTY STATES
      ================================================== */}
      {documents.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Your document library is empty"
          description="Upload a legal agreement or contract to get started with automated analysis."
          action={
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
                onClick={handleRestoreDefaults}
              >
                Restore Sample Files
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="h-3.5 w-3.5" />}
                onClick={handleOpenUpload}
              >
                Upload Document
              </Button>
            </div>
          }
        />
      ) : filteredDocuments.length === 0 ? (
        statusFilter === "favorites" && !searchQuery.trim() ? (
          <EmptyState
            icon={Star}
            title="No favorite documents yet"
            description="Click the star icon on any contract or agreement to pin it to your favorites."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                View All Documents
              </Button>
            }
          />
        ) : (
          <EmptyState
            icon={Search}
            title="No documents found"
            description="Try changing your search or filters."
            action={
              <Button
                variant="primary"
                size="sm"
                onClick={handleResetFilters}
              >
                Clear Filters
              </Button>
            }
          />
        )
      ) : viewMode === "grid" ? (
        <DocumentGrid
          documents={filteredDocuments}
          onToggleFavorite={handleToggleFavorite}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      ) : (
        <DocumentList
          documents={filteredDocuments}
          onToggleFavorite={handleToggleFavorite}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      )}

      {/* Standalone Local Upload Modal fallback */}
      <UploadDocumentModal
        open={localUploadOpen}
        onOpenChange={setLocalUploadOpen}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}

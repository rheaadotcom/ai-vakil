"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { FileText, Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useUploadModal } from "@/components/layout/app-shell";
import { useAuthSession } from "@/components/auth/AuthSessionProvider";
import {
  DOCUMENTS_CHANGED_EVENT,
  listUserDocuments,
} from "@/lib/supabase/documents";
import type { LibraryDocument } from "@/types/document";
import { DocumentStats } from "./document-stats";
import {
  DocumentFilters,
  type StatusFilterOption,
  type TypeFilterOption,
  type SortOption,
  type ViewMode,
} from "./document-filters";
import { DocumentGrid } from "./document-grid";
import { DocumentList } from "./document-list";

export function DocumentsView() {
  const { user, isLoading: isAuthLoading, authError } = useAuthSession();
  const { openUploadModal } = useUploadModal();
  const documentRequestRevision = useRef(0);
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilterOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name_asc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const loadDocuments = useCallback(async () => {
    const requestRevision = ++documentRequestRevision.current;

    // If auth is still initializing (no user yet and no auth error), keep loading state.
    if (!user && !authError) {
      // Do not clear documents or set loading false; we'll retry once auth resolves.
      return;
    }
    // If auth failed, show empty state.
    if (!user) {
      setDocuments([]);
      setIsLoading(false);
      setLoadError(null);
      return;
    }

    setIsLoading(true);
    setLoadError(null);
    try {
      const loadedDocuments = await listUserDocuments();
      if (documentRequestRevision.current === requestRevision) {
        setDocuments(loadedDocuments);
      }
    } catch (error) {
      if (documentRequestRevision.current === requestRevision) {
        setLoadError(
          error instanceof Error
            ? error.message
            : "Your documents could not be loaded. Check your connection and try again.",
        );
      }
    } finally {
      if (documentRequestRevision.current === requestRevision) {
        setIsLoading(false);
      }
    }
  }, [user, authError]);

  useEffect(() => {
    if (!isAuthLoading) {
      void loadDocuments();
    }
  }, [isAuthLoading, loadDocuments]);

  useEffect(() => {
    const refresh = () => void loadDocuments();
    window.addEventListener(DOCUMENTS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(DOCUMENTS_CHANGED_EVENT, refresh);
  }, [loadDocuments]);

  const statusCounts = useMemo(() => {
    const countExtraction = (status: "processing" | "extracted" | "failed") =>
      documents.filter((document) => document.extractionStatus === status)
        .length;
    return {
      total: documents.length,
      extracted: countExtraction("extracted"),
      processing: countExtraction("processing"),
      failed: countExtraction("failed"),
    };
  }, [documents]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setSortBy("name_asc");
  };

  const filteredDocuments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return documents
      .filter((document) => {
        if (
          statusFilter === "Uploaded" &&
          document.status.toLowerCase() !== "uploaded"
        ) {
          return false;
        }
        if (typeFilter !== "all" && document.fileType !== typeFilter) {
          return false;
        }
        return !query || document.title.toLowerCase().includes(query);
      })
      .sort((left, right) => {
        if (sortBy === "name_asc") {
          return left.title.localeCompare(right.title);
        }
        return right.title.localeCompare(left.title);
      });
  }, [documents, searchQuery, sortBy, statusFilter, typeFilter]);

  if (isAuthLoading || isLoading) {
    return (
      <div className="space-y-6" role="status" aria-live="polite">
        <div className="h-10 w-56 animate-pulse rounded-xl bg-white/[0.06]" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-white/[0.04]"
            />
          ))}
        </div>
        <div className="h-12 animate-pulse rounded-xl bg-white/[0.04]" />
        <p className="text-xs text-zinc-500">Loading your private documents…</p>
      </div>
    );
  }

  if (!user) {
    if (authError) {
      return (
        <EmptyState
          icon={FileText}
          title="Could not verify your session"
          description={authError}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          }
        />
      );
    }

    return (
      <EmptyState
        icon={FileText}
        title="Sign in to view your documents"
        description="Your private document library is available after you sign in."
        action={
          <Link href="/login">
            <Button variant="primary" size="sm">
              Sign in
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col justify-between gap-4 border-b border-white/[0.06] pb-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            Your Documents
          </h1>
          <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
            Private files you have uploaded. Analysis has not been run.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
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
            onClick={openUploadModal}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {loadError && (
        <div
          role="alert"
          className="flex flex-col justify-between gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/[0.05] p-4 sm:flex-row sm:items-center"
        >
          <p className="text-sm text-rose-200">{loadError}</p>
          <Button variant="outline" size="sm" onClick={() => void loadDocuments()}>
            Retry
          </Button>
        </div>
      )}

      <DocumentStats
        stats={statusCounts}
        activeFilter={statusFilter}
      />

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

      {loadError && documents.length === 0 ? null : documents.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents yet"
          description="Upload a PDF or DOCX to store it in your private legal document library."
          action={
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="h-3.5 w-3.5" />}
              onClick={openUploadModal}
            >
              Upload Document
            </Button>
          }
        />
      ) : filteredDocuments.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No documents found"
          description="Try changing your search or filters."
          action={
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Clear Filters
            </Button>
          }
        />
      ) : viewMode === "grid" ? (
        <DocumentGrid documents={filteredDocuments} />
      ) : (
        <DocumentList documents={filteredDocuments} />
      )}
    </div>
  );
}

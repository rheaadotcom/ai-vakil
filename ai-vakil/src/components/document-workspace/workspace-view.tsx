"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Sparkles,
  MessageSquare,
  Trash2,
  Edit2,
  Info,
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  mockDocument,
  mockWorkspaceSections,
  WorkspaceSection,
} from "@/lib/mock-document";
import { WorkspaceHeader } from "./workspace-header";
import { DocumentNavigation } from "./document-navigation";
import { DocumentViewer } from "./document-viewer";
import { ViewerToolbar } from "./viewer-toolbar";
import { DocumentSearch } from "./document-search";
import { InsightsPanel } from "./insights-panel";
import { AIQuestionBar } from "./ai-question-bar";
import { ExplainClausePanel } from "./explain-clause-panel";

export function WorkspaceView() {
  const router = useRouter();

  // Navigation & Viewer state
  const [activePage, setActivePage] = useState<number>(7);
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-term");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [highlightClauseId, setHighlightClauseId] = useState<string>("sec-7.2");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Modals & Dialogs state
  const [explainOpen, setExplainOpen] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [renameOpen, setRenameOpen] = useState<boolean>(false);
  const [docTitle, setDocTitle] = useState<string>(mockDocument.title);
  const [renameInput, setRenameInput] = useState<string>(mockDocument.title);
  const [isFavorite, setIsFavorite] = useState<boolean>(true);

  // Mobile navigation tabs ("document" | "insights" | "ai")
  const [mobileTab, setMobileTab] = useState<"document" | "insights" | "ai">(
    "document"
  );

  // Handle section select from left navigation
  const handleSelectSection = (section: WorkspaceSection) => {
    setActiveSectionId(section.id);
    setActivePage(section.page);
    setHighlightClauseId(section.page === 7 ? "sec-7.2" : `sec-${section.page}.1`);
  };

  // Handle page change from viewer toolbar or citations
  const handlePageChange = (newPage: number, sectionReference?: string) => {
    setActivePage(newPage);

    // Sync active section if page matches one
    const matchingSection = mockWorkspaceSections.find(
      (s) => s.page === newPage
    );
    if (matchingSection) {
      setActiveSectionId(matchingSection.id);
    }

    if (newPage === 7) {
      setHighlightClauseId("sec-7.2");
    }

    // On mobile, switch to document tab so user sees the page
    setMobileTab("document");

    if (sectionReference) {
      toast.info("Navigated to Citation", `Jumped to Page ${newPage} (${sectionReference}).`);
    }
  };

  // Handle favorite toggle
  const handleToggleFavorite = () => {
    setIsFavorite((prev) => {
      const next = !prev;
      if (next) {
        toast.success("Added to Favorites", "Document marked as favorite.");
      } else {
        toast.info("Removed from Favorites", "Document removed from favorites.");
      }
      return next;
    });
  };

  // Handle rename save
  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (renameInput.trim()) {
      setDocTitle(renameInput.trim());
      setRenameOpen(false);
      toast.success("Document Renamed", `Updated title to "${renameInput.trim()}".`);
    }
  };

  // Handle delete confirm
  const handleConfirmDelete = () => {
    setDeleteOpen(false);
    toast.success("Document Deleted", "Redirecting to your documents library...");
    setTimeout(() => {
      router.push("/documents");
    }, 600);
  };

  const currentDoc = {
    ...mockDocument,
    title: docTitle,
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">
      {/* ==================================================
          1. WORKSPACE HEADER
      ================================================== */}
      <WorkspaceHeader
        document={currentDoc}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onOpenDetails={() => setDetailsOpen(true)}
        onOpenDelete={() => setDeleteOpen(true)}
        onOpenRename={() => {
          setRenameInput(docTitle);
          setRenameOpen(true);
        }}
      />

      {/* ==================================================
          2. MOBILE VIEWPORT TAB SELECTOR (< 768px)
      ================================================== */}
      <div className="md:hidden flex items-center justify-between p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
        <button
          type="button"
          onClick={() => setMobileTab("document")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "document"
              ? "bg-violet-600/30 text-violet-200 border border-violet-500/40 shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Document</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab("insights")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "insights"
              ? "bg-violet-600/30 text-violet-200 border border-violet-500/40 shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Insights</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab("ai")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "ai"
              ? "bg-violet-600/30 text-violet-200 border border-violet-500/40 shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Ask AI</span>
        </button>
      </div>

      {/* ==================================================
          3. MAIN THREE-COLUMN WORKSPACE
      ================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start min-h-[720px]">
        {/* --------------------------------------------------
            LEFT COLUMN: Document Navigation (Desktop 3 cols / lg: 2.5 cols)
        -------------------------------------------------- */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-2 h-[750px] sticky top-20">
          <DocumentNavigation
            activeSectionId={activeSectionId}
            activePage={activePage}
            onSelectSection={handleSelectSection}
            className="h-full"
          />
        </div>

        {/* --------------------------------------------------
            CENTER COLUMN: Document Viewer & Toolbar (Desktop 6 or 7 cols)
        -------------------------------------------------- */}
        <div
          className={`space-y-3 ${
            mobileTab !== "document" ? "hidden md:block" : "block"
          } md:col-span-7 lg:col-span-6 xl:col-span-7`}
        >
          {/* Toolbar with Zoom, Page Navigation, Search, Explain */}
          <div className="relative">
            <ViewerToolbar
              currentPage={activePage}
              totalPages={mockDocument.pageCount}
              zoomLevel={zoomLevel}
              onPageChange={handlePageChange}
              onZoomChange={setZoomLevel}
              onToggleSearch={() => setSearchOpen((prev) => !prev)}
              onExplainClause={() => setExplainOpen(true)}
              searchOpen={searchOpen}
            />

            {/* Document Text Search Popover */}
            {searchOpen && (
              <div className="absolute top-12 left-0 right-0 z-30">
                <DocumentSearch
                  onNavigateToResult={(page, section) => {
                    handlePageChange(page, section);
                    setSearchOpen(false);
                  }}
                  onClose={() => setSearchOpen(false)}
                />
              </div>
            )}
          </div>

          {/* Document Viewer Container */}
          <div className="h-[680px]">
            <DocumentViewer
              currentPage={activePage}
              zoomLevel={zoomLevel}
              highlightClauseId={highlightClauseId}
              onClauseClick={(clauseId) => {
                setHighlightClauseId(clauseId);
                setExplainOpen(true);
              }}
              className="h-full"
            />
          </div>
        </div>

        {/* --------------------------------------------------
            RIGHT COLUMN: AI Insights Panel (Desktop 5 or 4 cols)
        -------------------------------------------------- */}
        <div
          className={`space-y-3 ${
            mobileTab !== "insights" ? "hidden md:block" : "block"
          } md:col-span-5 lg:col-span-3 xl:col-span-3 h-[750px] sticky top-20`}
        >
          <InsightsPanel
            onNavigateToPage={handlePageChange}
            onExplainClause={() => setExplainOpen(true)}
            className="h-full"
          />
        </div>

        {/* Mobile AI Tab Content (When user switches to Ask AI on mobile) */}
        {mobileTab === "ai" && (
          <div className="md:hidden block space-y-3">
            <AIQuestionBar
              onNavigateToPage={(page, sec) => {
                handlePageChange(page, sec);
                setMobileTab("document");
              }}
            />
          </div>
        )}
      </div>

      {/* ==================================================
          4. PERSISTENT AI QUESTION BAR (Desktop/Tablet)
      ================================================== */}
      <div className="hidden md:block sticky bottom-3 z-20">
        <AIQuestionBar onNavigateToPage={handlePageChange} />
      </div>

      {/* ==================================================
          5. MODALS & DIALOGS
      ================================================== */}

      {/* 5A. Explain Clause Panel */}
      <ExplainClausePanel
        open={explainOpen}
        onOpenChange={setExplainOpen}
        onNavigateToSource={(page) => handlePageChange(page, "Clause 7.2")}
      />

      {/* 5B. Document Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="h-4 w-4 text-violet-400" />
              <span>Document Details</span>
            </DialogTitle>
            <DialogDescription>
              Complete metadata and structural indexing for this legal deed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-1 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-400">Document Name</span>
              <span className="text-zinc-200 font-semibold text-right max-w-[220px] truncate">
                {currentDoc.title}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-400">File Type</span>
              <span className="text-zinc-200 font-mono uppercase">
                {currentDoc.fileType}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-400">Page Count</span>
              <span className="text-zinc-200 font-mono">
                {currentDoc.pageCount} pages
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-400">File Size</span>
              <span className="text-zinc-200 font-mono">2.4 MB</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-400">Extracted Clauses</span>
              <span className="text-zinc-200 font-mono">
                {currentDoc.clauseCount} clauses
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-400">Status</span>
              <span className="text-emerald-400 font-medium">Analyzed</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-400">Jurisdiction</span>
              <span className="text-zinc-200">{currentDoc.jurisdiction}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-400">Created / Effective</span>
              <span className="text-zinc-200 font-mono">12 Jan 2026</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => setDetailsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 5C. Rename Dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent maxWidth="max-w-md">
          <form onSubmit={handleSaveRename}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-violet-400" />
                <span>Rename Document</span>
              </DialogTitle>
              <DialogDescription>
                Update the display title for this document in your workspace.
              </DialogDescription>
            </DialogHeader>

            <div className="py-2">
              <label
                htmlFor="rename-workspace-input"
                className="block text-xs font-medium text-zinc-300 mb-1.5"
              >
                Document Title
              </label>
              <Input
                id="rename-workspace-input"
                value={renameInput}
                onChange={(e) => setRenameInput(e.target.value)}
                autoFocus
                className="text-sm"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRenameOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!renameInput.trim()}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 5D. Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-rose-400">
              <Trash2 className="h-4 w-4" />
              <span>Delete Document</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove &quot;
              <span className="text-zinc-200 font-medium">{docTitle}</span>&quot;
              from your library? This action will remove the local record and return to documents.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleConfirmDelete}
            >
              Delete Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

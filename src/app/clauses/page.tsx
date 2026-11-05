"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Download } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import {
  ClauseCompareDialog,
  ClauseDetails,
  ClauseFilters,
  ClauseList,
  ClauseStats,
  ExplainClauseDialog,
} from "@/components/clauses";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import {
  clauseCategories,
  clauseStatusOptions,
  clauseSummaryStats,
  mockClauses,
  type MockClause,
} from "@/lib/mock-clauses";

const sortOptions = ["Most Relevant", "Recently Updated", "A–Z", "Category"];

function slugifySource(source: string) {
  return source.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function ClausesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [documentFilter, setDocumentFilter] = useState("All Documents");
  const [sortValue, setSortValue] = useState("Most Relevant");
  const [selectedClauseId, setSelectedClauseId] = useState<string | null>(mockClauses[0]?.id ?? null);
  const [savedClauseIds, setSavedClauseIds] = useState<string[]>(["security-deposit"]);
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareTarget, setCompareTarget] = useState<MockClause | null>(null);

  const documentOptions = useMemo(
    () => [
      { value: "All Documents", label: "All Documents" },
      ...Array.from(new Set(mockClauses.map((clause) => clause.documentName))).map((documentName) => ({
        value: documentName,
        label: documentName,
      })),
    ],
    []
  );

  const filteredClauses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const next = mockClauses.filter((clause) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          clause.title,
          clause.category,
          clause.documentName,
          clause.section,
          clause.originalText,
          clause.simpleLanguage,
          clause.whyItMatters,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory = activeCategory === "All" || clause.category === activeCategory;
      const matchesStatus = statusFilter === "All" || clause.status === statusFilter;
      const matchesDocument =
        documentFilter === "All Documents" || clause.documentName === documentFilter;

      return matchesSearch && matchesCategory && matchesStatus && matchesDocument;
    });

    if (sortValue === "A–Z") {
      next.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "Category") {
      next.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortValue === "Recently Updated") {
      next.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    } else {
      next.sort((a, b) => {
        const statusWeight: Record<string, number> = { Standard: 1, Important: 2, "May Require Review": 3 };
        return statusWeight[b.status] - statusWeight[a.status] || a.title.localeCompare(b.title);
      });
    }

    return next;
  }, [searchTerm, activeCategory, statusFilter, documentFilter, sortValue]);

  const selectedClause =
    filteredClauses.find((clause) => clause.id === selectedClauseId) ?? filteredClauses[0] ?? null;

  React.useEffect(() => {
    if (selectedClause && !filteredClauses.some((clause) => clause.id === selectedClauseId)) {
      setSelectedClauseId(selectedClause.id);
    }
  }, [filteredClauses, selectedClause, selectedClauseId]);

  const relatedClauses =
    selectedClause ?
      mockClauses.filter(
        (clause) => clause.documentId === selectedClause.documentId && clause.id !== selectedClause.id
      ).slice(0, 3) : [];

  const comparisonTarget = compareTarget ?? relatedClauses[0] ?? null;

  const toggleSavedClause = (clauseId: string) => {
    setSavedClauseIds((previous) => {
      const isSaved = previous.includes(clauseId);
      toast.info(
        isSaved ? "Clause removed from saved items." : "Clause saved.",
        isSaved ? "This clause is no longer in your saved list." : "You can revisit it from your saved items."
      );

      return isSaved
        ? previous.filter((savedId) => savedId !== clauseId)
        : [...previous, clauseId];
    });
  };

  const handleOpenSource = (clause: MockClause) => {
    const isDemoDocument = clause.documentId === "doc-rental-001" || clause.documentId === "doc-emp-002" || clause.documentId === "doc-nda-003" || clause.documentId === "doc-serv-004";
    const destination = isDemoDocument
      ? `/documents/demo-rental?page=${clause.page}&source=${slugifySource(clause.title)}`
      : "/documents/demo-rental";

    if (!isDemoDocument) {
      toast.info("Demo source preview opens in the current document workspace.");
    }

    router.push(destination);
  };

  const handleCopyClause = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Clause copied.");
    } catch {
      toast.info("Clipboard unavailable", "Copy the clause manually from the details panel.");
    }
  };

  const handleShareLink = async () => {
    const link = selectedClause ? `https://ai-vakil.local/clauses?clause=${selectedClause.id}` : "https://ai-vakil.local/clauses";

    try {
      await navigator.clipboard.writeText(link);
      toast.success("Demo link copied.");
    } catch {
      toast.info("Demo link copied.", "Your clipboard is unavailable right now.");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setStatusFilter("All");
    setDocumentFilter("All Documents");
    setSortValue("Most Relevant");
  };

  const renderEmptyState = () => (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-dashed border-white/[0.08] bg-[#0B0B10]/70 p-8 text-center">
      <h3 className="text-xl font-semibold text-zinc-100">No clauses found</h3>
      <p className="mt-2 max-w-md text-sm text-zinc-400">Try changing your search or filters.</p>
      <Button variant="primary" size="sm" className="mt-5" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );

  const savedClauses = mockClauses.filter((clause) => savedClauseIds.includes(clause.id));

  return (
    <AppShell>
      <PageContainer
        maxWidth="full"
        className="px-3 sm:px-6"
        title="Explore your clauses."
        description="Find, understand, and review important clauses across your documents."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/chat")}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Ask AI
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toast.info("Export report", "This demo report export is available in the full workflow.");
              }}
              leftIcon={<Download className="h-3.5 w-3.5" />}
            >
              Export Report
            </Button>
          </div>
        }
      >
        <ClauseStats
          totalClauses={clauseSummaryStats.totalClauses}
          totalDocuments={clauseSummaryStats.totalDocuments}
          categories={clauseSummaryStats.categories}
          reviewClauses={clauseSummaryStats.reviewClauses}
        />

        <ClauseFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          documentFilter={documentFilter}
          onDocumentFilterChange={setDocumentFilter}
          sortValue={sortValue}
          onSortChange={setSortValue}
          categories={clauseCategories}
          statusOptions={clauseStatusOptions}
          documentOptions={documentOptions}
          sortOptions={sortOptions}
        />

        <div className="grid gap-4 xl:grid-cols-[52%_48%]">
          <div className="min-h-[700px] rounded-[28px] border border-white/[0.08] bg-[#0B0B10]/70 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Clauses</p>
                <h2 className="mt-1 text-lg font-semibold text-zinc-100">{filteredClauses.length} results</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-2.5 py-1 text-[10px] font-medium text-violet-200">
                <Sparkles className="h-3 w-3" />
                Local review
              </div>
            </div>

            {filteredClauses.length === 0 ? (
              renderEmptyState()
            ) : (
              <ClauseList
                clauses={filteredClauses}
                selectedClauseId={selectedClause?.id ?? null}
                savedClauseIds={savedClauseIds}
                onSelectClause={(clauseId) => setSelectedClauseId(clauseId)}
                onToggleSave={toggleSavedClause}
              />
            )}
          </div>

          <div>
            {selectedClause ? (
              <ClauseDetails
                clause={selectedClause}
                isSaved={savedClauseIds.includes(selectedClause.id)}
                relatedClauses={relatedClauses}
                onToggleSave={toggleSavedClause}
                onCopy={handleCopyClause}
                onExplain={() => setIsExplainOpen(true)}
                onShare={() => setIsShareOpen(true)}
                onCompare={() => {
                  setCompareTarget(relatedClauses[0] ?? selectedClause);
                  setIsCompareOpen(true);
                }}
                onOpenSource={handleOpenSource}
                onSelectRelatedClause={(clauseId) => setSelectedClauseId(clauseId)}
              />
            ) : (
              <div className="flex min-h-[700px] items-center justify-center rounded-[28px] border border-dashed border-white/[0.08] bg-[#0B0B10]/70 p-8 text-center text-zinc-400">
                Select a clause to inspect it.
              </div>
            )}
          </div>
        </div>

        {savedClauses.length === 0 && (
          <div className="rounded-[22px] border border-dashed border-white/[0.08] bg-[#0B0B10]/70 p-6 text-center">
            <h3 className="text-lg font-semibold text-zinc-100">No saved clauses yet</h3>
            <p className="mt-2 text-sm text-zinc-400">Save important clauses to find them quickly later.</p>
          </div>
        )}
      </PageContainer>

      <ExplainClauseDialog clause={selectedClause} open={isExplainOpen} onOpenChange={setIsExplainOpen} />

      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}> 
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Clause</DialogTitle>
            <DialogDescription>Clause sharing will be available in the full workflow.</DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E14] p-4 text-sm text-zinc-300">
            {selectedClause ? `${selectedClause.title} · ${selectedClause.documentName}` : "Clause preview"}
          </div>
          <DialogFooter>
            <Button variant="primary" onClick={handleShareLink}>Copy Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ClauseCompareDialog
        currentClause={selectedClause}
        relatedClause={comparisonTarget}
        open={isCompareOpen}
        onOpenChange={setIsCompareOpen}
      />
    </AppShell>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Download, Search } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import {
  AiOverview,
  AttentionItems,
  DocumentSummaries,
  ExportReportDialog,
  ImportantDates,
  InsightBreakdown,
  InsightDetailDialog,
  InsightStats,
  KeyTerms,
  Obligations,
  RecentActivity,
} from "@/components/insights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  documentSummaryItems,
  insightActivity,
  insightAttentionItems,
  insightDataItems,
  insightDates,
  insightDocumentOptions,
  insightFilterOptions,
  insightKeyTerms,
  insightOverviewTags,
  insightSummaryStats,
  insightSummaryText,
  obligationGroups,
  type DraftInsightItem,
  type InsightFilter,
} from "@/lib/mock-insights";

const documentLookup: Record<string, string> = {
  "doc-rental-001": "Residential Rental Agreement",
  "doc-emp-002": "Employment Agreement",
  "doc-nda-003": "Mutual Non-Disclosure Agreement",
  "doc-serv-004": "Freelance Service Agreement",
};

export default function InsightsPage() {
  const router = useRouter();
  const [selectedDocument, setSelectedDocument] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<InsightFilter>("All");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<DraftInsightItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const activeDocumentLabel = selectedDocument === "all" ? null : documentLookup[selectedDocument];

  const filteredDates = useMemo(() => {
    const targetDocuments = selectedDocument === "all" ? Object.values(documentLookup) : [activeDocumentLabel].filter(Boolean) as string[];
    return insightDates
      .filter((item) => {
        const matchesDocument = targetDocuments.includes(item.document);
        const query = searchTerm.toLowerCase();
        const haystack = `${item.date} ${item.event} ${item.document}`.toLowerCase();
        return matchesDocument && (!query || haystack.includes(query));
      })
      .map((item) => ({
        ...item,
        status: item.status as "Upcoming" | "Completed" | "Attention",
      }));
  }, [selectedDocument, searchTerm, activeDocumentLabel]);

  const filteredDocumentSummaries = useMemo(() => {
    const targetDocuments = selectedDocument === "all" ? Object.values(documentLookup) : [activeDocumentLabel].filter(Boolean) as string[];
    return documentSummaryItems
      .filter((item) => {
        const matchesDocument = targetDocuments.includes(item.name);
        const query = searchTerm.toLowerCase();
        const haystack = `${item.name} ${item.type} ${item.summary}`.toLowerCase();
        return matchesDocument && (!query || haystack.includes(query));
      })
      .map((item) => ({
        ...item,
        status: item.status as "Analyzed" | "Review",
      }));
  }, [selectedDocument, searchTerm, activeDocumentLabel]);

  const filteredAttention = useMemo(() => {
    const targetDocuments = selectedDocument === "all" ? Object.values(documentLookup) : [activeDocumentLabel].filter(Boolean) as string[];
    return insightAttentionItems
      .filter((item) => {
        const matchesDocument = targetDocuments.includes(item.document);
        const query = searchTerm.toLowerCase();
        const haystack = `${item.title} ${item.summary} ${item.document}`.toLowerCase();
        return matchesDocument && (!query || haystack.includes(query));
      })
      .map((item) => ({
        ...item,
        status: item.status as "May Require Review",
      }));
  }, [selectedDocument, searchTerm, activeDocumentLabel]);

  const filteredKeyTerms = useMemo(() => {
    const targetDocuments = selectedDocument === "all" ? Object.values(documentLookup) : [activeDocumentLabel].filter(Boolean) as string[];
    return insightKeyTerms.filter((group) => {
      const matchesDocument = targetDocuments.includes(group.document);
      const query = searchTerm.toLowerCase();
      const haystack = `${group.document} ${group.terms.map((term) => `${term.label} ${term.value}`).join(" ")}`.toLowerCase();
      return matchesDocument && (!query || haystack.includes(query));
    });
  }, [selectedDocument, searchTerm, activeDocumentLabel]);

  const openDetail = (item: DraftInsightItem) => {
    setSelectedInsight(item);
    setDetailOpen(true);
  };

  const handleOpenSource = (href?: string) => {
    router.push(href ?? "/documents/demo-rental");
  };

  const handleAskAi = () => {
    router.push("/chat");
  };

  const handleCopyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Insight copied.");
    } catch {
      toast.info("Clipboard unavailable", "Copy the summary manually from the detail panel.");
    }
  };

  const handleGenerateReport = () => {
    toast.info("Report generation is available in the full workflow.", "This is a mock export experience.");
  };

  const handleOpenAttentionItem = (href?: string) => {
    if (!href) {
      return;
    }

    const match = insightDataItems.find((entry) => entry.href === href);
    if (match) {
      openDetail(match);
      return;
    }

    router.push(href);
  };

  const shouldShowAttention = activeFilter === "All" || activeFilter === "Attention";
  const shouldShowDates = activeFilter === "All" || activeFilter === "Dates";
  const shouldShowObligations = activeFilter === "All" || activeFilter === "Obligations";
  const shouldShowKeyTerms = activeFilter === "All" || activeFilter === "Key Terms";
  const shouldShowDocuments = activeFilter === "All" || activeFilter === "Documents";

  return (
    <AppShell>
      <PageContainer
        maxWidth="full"
        className="px-3 sm:px-6"
        title="See what matters."
        description="A clear view of important clauses, dates, obligations, and areas worth reviewing across your documents."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={handleAskAi} rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Ask AI
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsExportOpen(true)} leftIcon={<Download className="h-3.5 w-3.5" />}>
              Export Report
            </Button>
          </div>
        }
      >
        <div className="rounded-[26px] border border-white/[0.06] bg-[#090A10]/70 p-3 sm:p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="w-full max-w-xs">
                <label className="mb-1 block text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Document</label>
                <select
                  value={selectedDocument}
                  onChange={(event) => setSelectedDocument(event.target.value)}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#0F1015] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-violet-500/50"
                >
                  {insightDocumentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full xl:max-w-md">
              <label className="mb-1 block text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Search insights</label>
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search insights..."
                leftIcon={<Search className="h-3.5 w-3.5" />}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {insightFilterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  activeFilter === filter
                    ? "border-violet-500/40 bg-violet-500/10 text-violet-200"
                    : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <InsightStats {...insightSummaryStats} />

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          {(shouldShowAttention || shouldShowDates || shouldShowObligations || shouldShowKeyTerms || shouldShowDocuments) && (
            <AiOverview summary={insightSummaryText} tags={insightOverviewTags} onAskAi={handleAskAi} />
          )}
          <InsightBreakdown
            clausesAnalyzed={24}
            important={9}
            standard={12}
            review={3}
            datesIdentified={16}
            obligations={21}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {shouldShowDates ? <ImportantDates items={filteredDates} onOpenItem={handleOpenSource} /> : null}
          {shouldShowObligations ? (
            <Obligations
              myObligations={obligationGroups.myObligations as Array<{ title: string; document: string; description?: string; source?: string; status?: "Active" | "Review" | "Upcoming" }>}
              otherParty={obligationGroups.otherParty as Array<{ title: string; document: string; description?: string; source?: string; status?: "Active" | "Review" | "Upcoming" }>}
            />
          ) : null}
        </div>

        {shouldShowAttention ? (
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <AttentionItems items={filteredAttention} onOpenItem={handleOpenAttentionItem} />
            <RecentActivity activities={insightActivity} />
          </div>
        ) : null}

        {shouldShowKeyTerms ? <KeyTerms groups={filteredKeyTerms} /> : null}

        {shouldShowDocuments ? (
          <DocumentSummaries
            items={filteredDocumentSummaries}
            onOpenDocument={handleOpenSource}
            onAskAi={handleAskAi}
          />
        ) : null}

        {activeFilter === "All" && (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <AttentionItems items={filteredAttention} onOpenItem={handleOpenAttentionItem} />
            <RecentActivity activities={insightActivity} />
          </div>
        )}
      </PageContainer>

      <InsightDetailDialog
        item={selectedInsight ? {
          id: selectedInsight.id,
          title: selectedInsight.title,
          category: selectedInsight.category,
          document: selectedInsight.document,
          page: selectedInsight.page,
          section: selectedInsight.section,
          summary: selectedInsight.summary,
          whyItMatters: selectedInsight.whyItMatters,
          href: selectedInsight.href,
        } : null}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onOpenSource={handleOpenSource}
        onAskAi={handleAskAi}
        onCopy={handleCopyText}
      />

      <ExportReportDialog
        open={isExportOpen}
        onOpenChange={setIsExportOpen}
        onGenerate={handleGenerateReport}
        onViewDemo={() => router.push("/reports/demo-rental")}
      />
    </AppShell>
  );
}

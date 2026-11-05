"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import {
  AiObservations,
  ClauseBreakdown,
  DocumentOverview,
  ExecutiveSummary,
  ReportAskAI,
  ReportAttention,
  ReportDates,
  ReportExportDialog,
  ReportFooter,
  ReportHeader,
  ReportKeyTerms,
  ReportObligations,
  ReportTOC,
  SourceCoverage,
} from "@/components/reports";
import { toast } from "@/components/ui/toast";
import { demoRentalReport } from "@/lib/mock-report";

export default function DemoRentalReportPage() {
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handlePrint = () => {
    toast.info("Print-ready reports will be available in the full workflow.");
  };

  return (
    <AppShell>
      <PageContainer maxWidth="wide" className="px-3 sm:px-5 xl:px-6 pb-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
          <div className="space-y-6">
            <ReportHeader
              metadata={demoRentalReport.reportMetadata}
              onExport={() => setShowExportDialog(true)}
              onPrint={handlePrint}
            />

            <ExecutiveSummary summary={demoRentalReport.executiveSummary} />
            <DocumentOverview overview={demoRentalReport.documentOverview} />
            <ReportDates items={demoRentalReport.importantDates} />
            <ReportObligations
              myObligations={demoRentalReport.obligations.myObligations}
              otherParty={demoRentalReport.obligations.otherParty}
            />
            <ReportAttention items={demoRentalReport.attentionItems} />
            <ClauseBreakdown data={demoRentalReport.clauseBreakdown} />
            <ReportKeyTerms items={demoRentalReport.keyTerms} />
            <AiObservations items={demoRentalReport.aiObservations} />
            <SourceCoverage coverage={demoRentalReport.sourceCoverage} />
            <ReportAskAI />
            <ReportFooter metadata={demoRentalReport.reportMetadata} />
          </div>

          <ReportTOC />
        </div>
      </PageContainer>

      <ReportExportDialog open={showExportDialog} onOpenChange={setShowExportDialog} />
    </AppShell>
  );
}

import React from "react";
import { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import {
  WelcomeHeader,
  SummaryMetrics,
  ContinueCard,
  RecentDocuments,
  AttentionItems,
  UpcomingDates,
  AIAssistantCTA,
} from "@/components/dashboard";
import {
  mockDashboardStats,
  mockContinueDocument,
  mockRecentDocuments,
  mockAttentionItems,
  mockUpcomingDates,
} from "@/lib/mock-dashboard";

export const metadata: Metadata = {
  title: "Dashboard — AI Vakil Legal Intelligence",
  description:
    "Review legal agreements, track notice deadlines, identify clauses that may require review, and query your contracts with AI Vakil.",
};

export default function DashboardPage() {
  return (
    <AppShell>
      <PageContainer maxWidth="wide" className="space-y-6 sm:space-y-8">
        {/* Section B: Welcome Header */}
        <WelcomeHeader userName="Riya" />

        {/* Section C: Summary Metrics (4 Cards) */}
        <SummaryMetrics stats={mockDashboardStats} />

        {/* Main Content Grid: Multi-Column on Desktop, Stacked on Mobile/Tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Desktop 7 cols): Active Document & Recent Documents */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section D: Continue Where You Left Off */}
            <ContinueCard document={mockContinueDocument} />

            {/* Section E: Recent Documents */}
            <RecentDocuments documents={mockRecentDocuments} />
          </div>

          {/* Right Column (Desktop 5 cols): Attention Items, Upcoming Dates & AI Assistant CTA */}
          <div className="lg:col-span-5 space-y-6">
            {/* Section F: Attention Items */}
            <AttentionItems items={mockAttentionItems} />

            {/* Section G: Upcoming Dates */}
            <UpcomingDates dates={mockUpcomingDates} />

            {/* Section H: AI Assistant CTA */}
            <AIAssistantCTA />
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}

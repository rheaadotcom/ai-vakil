import React from "react";
import { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import { WorkspaceView } from "@/components/document-workspace";

export const metadata: Metadata = {
  title: "Residential Rental Agreement — AI Vakil Document Workspace",
  description:
    "Explore clauses, review notice deadlines, and query your residential rental agreement with grounded source citations.",
};

export default function DemoRentalWorkspacePage() {
  return (
    <AppShell>
      <PageContainer maxWidth="wide" className="px-2 sm:px-6">
        <WorkspaceView />
      </PageContainer>
    </AppShell>
  );
}

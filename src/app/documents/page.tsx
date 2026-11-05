import React from "react";
import { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import { DocumentsView } from "@/components/documents";

export const metadata: Metadata = {
  title: "Your Documents — AI Vakil Legal Intelligence",
  description:
    "Manage, review, and explore your legal documents, covenants, and contracts with AI Vakil.",
};

export default function DocumentsPage() {
  return (
    <AppShell>
      <PageContainer maxWidth="wide">
        <DocumentsView />
      </PageContainer>
    </AppShell>
  );
}

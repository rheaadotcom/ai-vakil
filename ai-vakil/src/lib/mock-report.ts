import { Report } from "@/types";

export const mockReport: Report = {
  id: "rep-001",
  documentId: "doc-rental-001",
  documentTitle: "Residential Rental Agreement - Flat 402, Indiranagar",
  title: "AI Legal Risk & Clause Intelligence Report",
  generatedAt: "2024-10-15T14:35:00Z",
  executiveSummary:
    "AI Vakil has conducted an automated legal audit of the 12-page Residential Rental Deed for Flat 402, Indiranagar. The document is largely consistent with residential leasing standards in Bengaluru, featuring a competitive 3-month security deposit (₹60,000) and inclusive society maintenance fees. However, Clause 9.1 imposes severe unilateral financial risk via a complete deposit forfeiture during the 6-month lock-in period. Furthermore, Clause 3.4 imposes 18% compounding interest for payments made after a 5-day grace window. Negotiation of two key redlines is strongly recommended prior to final execution.",
  overallRiskScore: 42,
  overallRiskLevel: "medium",
  keyFindings: [
    "Strict 6-month lock-in with total ₹60,000 security deposit forfeiture on early exit (Clause 9.1, Page 9).",
    "High 18% compounding late payment penalty after 5-day grace window (Clause 3.4, Page 3).",
    "60-day mutual advance notice period required to terminate after lock-in period (Clause 7.1, Page 7).",
    "Favorable 3-month deposit benchmark (₹60,000), substantially below Bengaluru historical standard of 6-10 months.",
    "Mandatory ₹10,000 painting deduction upon vacating, without condition assessment.",
    "Society maintenance charges are included in the ₹20,000 monthly rent.",
  ],
  clauseBreakdown: [
    { category: "Rent & Security Deposit", count: 6, highRiskCount: 1 },
    { category: "Duration & Renewal", count: 2, highRiskCount: 0 },
    { category: "Termination & Notice", count: 3, highRiskCount: 1 },
    { category: "Early Termination & Penalties", count: 2, highRiskCount: 2 },
    { category: "Maintenance & Repairs", count: 4, highRiskCount: 0 },
    { category: "Permitted Use & Subletting", count: 2, highRiskCount: 0 },
    { category: "Indemnification & Liability", count: 1, highRiskCount: 0 },
    { category: "Inspection & Entry", count: 2, highRiskCount: 0 },
    { category: "Governing Law & Dispute Resolution", count: 2, highRiskCount: 0 },
  ],
  topRisks: [
    {
      id: "risk-item-1",
      title: "Liquidated Damages Forfeiture during 6-Month Lock-in",
      description:
        "Clause 9.1 authorizes the lessor to retain all ₹60,000 deposit funds even when 60 days advance notice is provided during months 1-6.",
      severity: "critical",
      clauseReference: "Clause 9.1",
      pageNumber: 9,
      mitigationStrategy:
        "Propose adding a standard job relocation transfer exception or limiting forfeiture to 1 month rent if landlord finds replacement tenant.",
    },
    {
      id: "risk-item-2",
      title: "Asymmetric Landlord Early Exit Penalty Cap",
      description:
        "If the landlord terminates during the lock-in period, their liability is capped at ₹15,000 relocation expenses (Clause 9.3), whereas tenant risks ₹60,000.",
      severity: "high",
      clauseReference: "Clause 9.3",
      pageNumber: 9,
      mitigationStrategy:
        "Standardize mutual liquidated damages to 1 month rent for either party in case of unwarranted breach.",
    },
    {
      id: "risk-item-3",
      title: "Aggressive 18% Compounding Late Interest",
      description:
        "Interest rate significantly exceeds customary banking and contract interest guidelines.",
      severity: "medium",
      clauseReference: "Clause 3.4",
      pageNumber: 3,
      mitigationStrategy:
        "Counter-propose 10% simple annual interest with a 10-day grace period.",
    },
  ],
  recommendations: [
    "Redline Clause 9.1 to remove automatic total forfeiture of deposit; introduce job relocation carve-out.",
    "Request reduction of late fee from 18% compounding to 10% simple interest after 10-day grace.",
    "Verify that the flat inventory list (Schedule B) is physically signed by both parties at key handover.",
    "Record initial meter readings on November 1st for BESCOM electricity and water meters.",
  ],
  status: "final",
  verifierNote: "Audited using AI Vakil Indian Legal Tech Model v2.4 (Model Tenancy Framework aligned).",
};

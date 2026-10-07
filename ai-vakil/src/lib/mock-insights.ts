import { Insight } from "@/types";

export const mockInsights: Insight[] = [
  {
    id: "ins-1",
    documentId: "doc-rental-001",
    type: "risk",
    title: "Severe Early Termination Lock-in Penalty",
    description:
      "Clause 9.1 mandates unconditional forfeiture of your entire ₹60,000 security deposit if you vacate during the first 6 months, even if you serve the required 60-day notice.",
    severity: "critical",
    recommendedAction:
      "Request adding an exception for employment relocation outside Bengaluru or cap forfeiture to 1 month's rent (₹20,000) upon 60 days advance written notice.",
    clauseId: "cl-15",
    pageNumber: 9,
    impactScore: 92,
    category: "Financial Exposure",
  },
  {
    id: "ins-2",
    documentId: "doc-rental-001",
    type: "risk",
    title: "Excessive 18% Compounding Late Payment Interest",
    description:
      "Clause 3.4 imposes 18% compounding interest per annum on rent unpaid after a brief 5-day grace period. This is higher than normal civil jurisprudence norms.",
    severity: "medium",
    recommendedAction:
      "Propose replacing 18% compounding interest with 10-12% simple annual interest and extending the grace window from 5 to 10 days.",
    clauseId: "cl-4",
    pageNumber: 3,
    impactScore: 64,
    category: "Payment Terms",
  },
  {
    id: "ins-3",
    documentId: "doc-rental-001",
    type: "opportunity",
    title: "Low Security Deposit Relative to Market Benchmark",
    description:
      "The agreement asks for ₹60,000 (3 months rent). In Indiranagar, Bengaluru, landlords traditionally demand 6 to 10 months rent as deposit.",
    severity: "low",
    recommendedAction:
      "This is favorable. Retain this clause as agreed without amendment.",
    clauseId: "cl-5",
    pageNumber: 4,
    impactScore: 35,
    category: "Market Advantage",
  },
  {
    id: "ins-4",
    documentId: "doc-rental-001",
    type: "compliance",
    title: "Extended 60-Day Notice Period Requirement",
    description:
      "Clause 7.1 requires 60 days prior written notice to terminate. If you need to relocate on shorter notice, you remain liable for rent across the shortfall duration.",
    severity: "medium",
    recommendedAction:
      "If you anticipate agile job mobility, request negotiating down to a standard 30-day notice period or include a mutual buyout clause.",
    clauseId: "cl-11",
    pageNumber: 7,
    impactScore: 70,
    category: "Notice & Mobility",
  },
  {
    id: "ins-5",
    documentId: "doc-rental-001",
    type: "anomaly",
    title: "Mandatory ₹10,000 Painting Deduction on Handover",
    description:
      "Clause 11.3 specifies a fixed ₹10,000 deduction from the deposit for repainting, regardless of whether the flat was occupied for just a few months or walls remain pristine.",
    severity: "medium",
    recommendedAction:
      "Request amending so that painting fee only applies if tenancy exceeds 11 months or if visible wall discoloration exists beyond normal wear and tear.",
    clauseId: "cl-20",
    pageNumber: 11,
    impactScore: 58,
    category: "Deposit Deduction",
  },
  {
    id: "ins-6",
    documentId: "doc-rental-001",
    type: "missing_clause",
    title: "No Explicit Penalties for Landlord Delayed Repairs",
    description:
      "While the landlord is tasked with structural repairs in Clause 8.1, the agreement lacks any explicit right for the tenant to commission emergency repairs and deduct from next rent if ignored.",
    severity: "low",
    recommendedAction:
      "Add a self-help covenant enabling tenant to undertake vital repairs and offset costs against subsequent rent if landlord fails to act within 10 days.",
    clauseId: "cl-13",
    pageNumber: 8,
    impactScore: 48,
    category: "Tenant Protection",
  },
];

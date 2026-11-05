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

export type InsightFilter = "All" | "Attention" | "Dates" | "Obligations" | "Key Terms" | "Documents";

export interface DraftInsightItem {
  id: string;
  title: string;
  category: string;
  document: string;
  documentId: string;
  page: number;
  section: string;
  summary: string;
  whyItMatters: string;
  sourceText: string;
  kind: "attention" | "date" | "obligation" | "key-term" | "document";
  tags?: string[];
  status?: "Upcoming" | "Completed" | "Attention" | "May Require Review";
  href?: string;
}

export const insightDocumentOptions = [
  { value: "all", label: "All Documents" },
  { value: "doc-rental-001", label: "Residential Rental Agreement" },
  { value: "doc-emp-002", label: "Employment Agreement" },
  { value: "doc-nda-003", label: "Mutual Non-Disclosure Agreement" },
  { value: "doc-serv-004", label: "Freelance Service Agreement" },
];

export const insightFilterOptions: InsightFilter[] = ["All", "Attention", "Dates", "Obligations", "Key Terms", "Documents"];

export const insightSummaryStats = {
  documentsAnalyzed: 12,
  importantClauses: 48,
  upcomingDates: 16,
  obligations: 21,
};

export const insightOverviewTags = ["Termination", "Payment", "Renewal", "Liability"];

export const insightSummaryText =
  "Across your analyzed documents, several items may deserve closer attention. The most significant themes include termination provisions, payment obligations, renewal timelines, and liability limitations.";

export const insightDates = [
  {
    id: "date-rental-start",
    date: "12 Jan 2026",
    event: "Agreement Start",
    document: "Residential Rental Agreement",
    status: "Completed",
    href: "/documents/demo-rental?page=1&source=agreement-start",
  },
  {
    id: "date-rental-end",
    date: "12 Oct 2026",
    event: "Agreement End",
    document: "Residential Rental Agreement",
    status: "Upcoming",
    href: "/documents/demo-rental?page=7&source=termination",
  },
  {
    id: "date-rental-notice",
    date: "11 Dec 2026",
    event: "Notice Deadline",
    document: "Residential Rental Agreement",
    status: "Attention",
    href: "/documents/demo-rental?page=7&source=notice-requirement",
  },
  {
    id: "date-employment-renewal",
    date: "05 Nov 2026",
    event: "Renewal Notice",
    document: "Employment Agreement",
    status: "Upcoming",
    href: "/documents/demo-rental?page=12&source=renewal",
  },
];

export const obligationGroups = {
  myObligations: [
    {
      title: "Pay monthly rent",
      document: "Residential Rental Agreement",
      description: "₹20,000 / month",
      source: "Page 4 · Section 4.1",
      status: "Active",
    },
    {
      title: "Provide required notice",
      document: "Residential Rental Agreement",
      description: "60 days",
      source: "Page 7 · Section 7.2",
      status: "Upcoming",
    },
    {
      title: "Protect confidential information",
      document: "Mutual Non-Disclosure Agreement",
      description: "Use only for the approved project purpose.",
      source: "Page 3 · Section 3.1",
      status: "Active",
    },
    {
      title: "Submit invoices after milestones",
      document: "Freelance Service Agreement",
      description: "Invoices due within 10 working days after acceptance.",
      source: "Page 5 · Section 5.3",
      status: "Review",
    },
  ],
  otherParty: [
    {
      title: "Return eligible security deposit",
      document: "Residential Rental Agreement",
      description: "Subject to deductions for outstanding dues or damage.",
      source: "Page 9 · Section 9.1",
      status: "Review",
    },
    {
      title: "Maintain structural components",
      document: "Residential Rental Agreement",
      description: "Repairs and common-area maintenance remain with the landlord.",
      source: "Page 6 · Section 6.3",
      status: "Active",
    },
    {
      title: "Protect confidential information",
      document: "Mutual Non-Disclosure Agreement",
      description: "Covering all non-public information disclosed in the engagement.",
      source: "Page 4 · Section 4.2",
      status: "Active",
    },
    {
      title: "Pay accepted milestones",
      document: "Freelance Service Agreement",
      description: "Within 10 days of invoice approval.",
      source: "Page 7 · Section 7.1",
      status: "Upcoming",
    },
  ],
};

export const insightAttentionItems = [
  {
    id: "attention-early-termination",
    title: "Early Termination",
    summary: "60-day written notice requirement.",
    document: "Residential Rental Agreement",
    page: 7,
    status: "May Require Review",
    href: "/documents/demo-rental?page=7&source=early-termination",
  },
  {
    id: "attention-security-deposit",
    title: "Security Deposit",
    summary: "Refund is subject to deductions for outstanding dues and damage.",
    document: "Residential Rental Agreement",
    page: 9,
    status: "May Require Review",
    href: "/documents/demo-rental?page=9&source=security-deposit",
  },
  {
    id: "attention-liability-cap",
    title: "Liability Limitation",
    summary: "Liability is capped at fees paid under the applicable statement of work.",
    document: "Freelance Service Agreement",
    page: 7,
    status: "May Require Review",
    href: "/documents/demo-rental?page=7&source=liability-cap",
  },
  {
    id: "attention-non-solicitation",
    title: "Non-Solicitation",
    summary: "Post-employment restriction applies for 12 months.",
    document: "Employment Agreement",
    page: 8,
    status: "May Require Review",
    href: "/documents/demo-rental?page=8&source=non-solicitation",
  },
];

export const insightKeyTerms = [
  {
    document: "Residential Rental Agreement",
    terms: [
      { label: "Monthly Rent", value: "₹20,000" },
      { label: "Security Deposit", value: "₹60,000" },
      { label: "Term", value: "11 months" },
      { label: "Notice", value: "60 days" },
    ],
  },
  {
    document: "Employment Agreement",
    terms: [
      { label: "Renewal", value: "12 months" },
      { label: "Notice", value: "30 days" },
      { label: "Non-Solicitation", value: "12 months" },
      { label: "Termination", value: "For cause" },
    ],
  },
  {
    document: "Freelance Service Agreement",
    terms: [
      { label: "Payment Window", value: "10 days" },
      { label: "Liability Cap", value: "Fees Paid" },
      { label: "Dispute Process", value: "Negotiation → Mediation" },
      { label: "Deliverables", value: "Milestone-based" },
    ],
  },
];

export const documentSummaryItems = [
  {
    id: "doc-summary-rental",
    name: "Residential Rental Agreement",
    type: "Rental Agreement · PDF",
    status: "Analyzed",
    summary: "An 11-month residential rental agreement covering rent, security deposit, maintenance responsibilities, termination notice, and dispute provisions.",
    href: "/documents/demo-rental",
    askAiHref: "/chat",
  },
  {
    id: "doc-summary-emp",
    name: "Employment Agreement",
    type: "Employment Contract · PDF",
    status: "Analyzed",
    summary: "A standard employment agreement with renewal, notice, and post-employment restrictions that may warrant closer review.",
    href: "/documents/demo-rental",
    askAiHref: "/chat",
  },
  {
    id: "doc-summary-nda",
    name: "Mutual Non-Disclosure Agreement",
    type: "NDA · DOCX",
    status: "Analyzed",
    summary: "The agreement sets out confidentiality obligations, permitted uses, and treatment of protected information across the engagement period.",
    href: "/documents/demo-rental",
    askAiHref: "/chat",
  },
  {
    id: "doc-summary-service",
    name: "Freelance Service Agreement",
    type: "Independent Services Agreement · PDF",
    status: "Analyzed",
    summary: "This document covers milestone payments, scope management, confidentiality, and liability limits for service delivery.",
    href: "/documents/demo-rental",
    askAiHref: "/chat",
  },
];

export const insightActivity = [
  { time: "Today", label: "Residential Rental Agreement analyzed" },
  { time: "Today", label: "3 clauses flagged for closer review" },
  { time: "Yesterday", label: "Employment Agreement analyzed" },
  { time: "2 days ago", label: "Important dates identified" },
];

export const insightDataItems: DraftInsightItem[] = [
  {
    id: "early-termination",
    title: "Early Termination",
    category: "Termination",
    document: "Residential Rental Agreement",
    documentId: "doc-rental-001",
    page: 7,
    section: "Section 7.1",
    summary: "Based on the uploaded document, this provision describes the process for ending the agreement before its scheduled end date.",
    whyItMatters: "This may affect the timing and financial consequences of ending the agreement early.",
    sourceText: "The terminating party shall provide sixty (60) days' prior written notice and comply with the applicable financial obligations set out in this Agreement.",
    kind: "attention",
    status: "May Require Review",
    href: "/documents/demo-rental?page=7&source=early-termination",
  },
  {
    id: "notice-requirement",
    title: "Notice Requirement",
    category: "Termination",
    document: "Residential Rental Agreement",
    documentId: "doc-rental-001",
    page: 7,
    section: "Section 7.2",
    summary: "A formal notice period applies before the agreement can be ended early.",
    whyItMatters: "This affects planning and timing when one party may need to end the arrangement.",
    sourceText: "The terminating party shall provide sixty (60) days' written notice unless otherwise agreed in writing.",
    kind: "attention",
    status: "May Require Review",
    href: "/documents/demo-rental?page=7&source=notice-requirement",
  },
  {
    id: "security-deposit",
    title: "Security Deposit",
    category: "Payment",
    document: "Residential Rental Agreement",
    documentId: "doc-rental-001",
    page: 9,
    section: "Section 9.1",
    summary: "This clause covers the refundable deposit and potential deductions at the end of the tenancy.",
    whyItMatters: "The deposit clause has a direct impact on exit costs and cash flow.",
    sourceText: "The Tenant shall pay an interest-free refundable security deposit ... to be returned upon cessation of the tenancy subject to deductions for outstanding dues and damage.",
    kind: "attention",
    status: "May Require Review",
    href: "/documents/demo-rental?page=9&source=security-deposit",
  },
  {
    id: "liability-cap",
    title: "Liability Limitation",
    category: "Liability",
    document: "Freelance Service Agreement",
    documentId: "doc-serv-004",
    page: 7,
    section: "Section 7.1",
    summary: "This clause limits exposure based on fees paid under the agreement.",
    whyItMatters: "The cap may materially affect risk allocation in the relationship.",
    sourceText: "Liability is capped at fees paid under the applicable statement of work.",
    kind: "attention",
    status: "May Require Review",
    href: "/documents/demo-rental?page=7&source=liability-cap",
  },
  {
    id: "renewal-notice",
    title: "Renewal Notice",
    category: "Renewal",
    document: "Employment Agreement",
    documentId: "doc-emp-002",
    page: 12,
    section: "Section 12.2",
    summary: "The agreement requires advance notice to trigger a renewal review.",
    whyItMatters: "This helps determine how long the relationship may continue before a review event occurs.",
    sourceText: "Renewal notice must be served not less than 30 days before the end of the term.",
    kind: "date",
    status: "Upcoming",
    href: "/documents/demo-rental?page=12&source=renewal-notice",
  },
  {
    id: "payment-terms",
    title: "Monthly Rent",
    category: "Payment",
    document: "Residential Rental Agreement",
    documentId: "doc-rental-001",
    page: 4,
    section: "Section 4.1",
    summary: "Rent is payable each month in advance by direct bank transfer.",
    whyItMatters: "This is the recurring payment obligation at the center of the tenancy relationship.",
    sourceText: "The Tenant shall pay a monthly rent of ₹20,000, due on or before the 5th day of each month by direct bank transfer.",
    kind: "key-term",
    href: "/documents/demo-rental?page=4&source=monthly-rent",
  },
  {
    id: "security-deposit-term",
    title: "Security Deposit",
    category: "Payment",
    document: "Residential Rental Agreement",
    documentId: "doc-rental-001",
    page: 9,
    section: "Section 9.1",
    summary: "A refundable security deposit is held to cover unpaid dues and damage.",
    whyItMatters: "This is a material cash-flow and exit-cost issue in the tenancy arrangement.",
    sourceText: "The Tenant shall pay an interest-free refundable security deposit of ₹60,000...",
    kind: "key-term",
    href: "/documents/demo-rental?page=9&source=security-deposit",
  },
  {
    id: "notice-period-obligation",
    title: "Provide required notice",
    category: "Termination",
    document: "Residential Rental Agreement",
    documentId: "doc-rental-001",
    page: 7,
    section: "Section 7.2",
    summary: "This obligation requires written notice before early termination.",
    whyItMatters: "It creates a timeline requirement that may affect exit planning.",
    sourceText: "The terminating party shall provide sixty (60) days' written notice unless otherwise agreed in writing.",
    kind: "obligation",
    href: "/documents/demo-rental?page=7&source=notice-requirement",
  },
];

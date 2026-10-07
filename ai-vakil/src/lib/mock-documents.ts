export interface MockDocument {
  id: string;
  name: string;
  type: string;
  fileType: "PDF" | "DOCX";
  pages: number;
  status: "Analyzed" | "Processing" | "Needs Review";
  updatedAt: string;
  createdAt: string;
  favorite: boolean;
  size: string;
  lastViewedPage?: number;
  lastViewedSection?: string;
  summary?: string;
  clausesCount?: number;
  attentionCount?: number;
}

export interface DocumentStatsData {
  total: number;
  analyzed: number;
  processing: number;
  needsReview: number;
}

export const initialMockDocuments: MockDocument[] = [
  {
    id: "doc-rental-001",
    name: "Residential Rental Agreement",
    type: "Lease Deed · Indiranagar",
    fileType: "PDF",
    pages: 12,
    status: "Analyzed",
    updatedAt: "Updated 2 hours ago",
    createdAt: "2024-10-15",
    favorite: true,
    size: "2.4 MB",
    lastViewedPage: 7,
    lastViewedSection: "Termination",
    summary:
      "11-month residential lease deed for Flat 402, Silver Oak Residency, Bengaluru. Specifies monthly rental consideration and early termination lock-in conditions.",
    clausesCount: 24,
    attentionCount: 3,
  },
  {
    id: "doc-emp-002",
    name: "Employment Agreement",
    type: "Executive Employment Contract",
    fileType: "PDF",
    pages: 18,
    status: "Analyzed",
    updatedAt: "Updated yesterday",
    createdAt: "2024-10-14",
    favorite: false,
    size: "3.1 MB",
    clausesCount: 32,
    attentionCount: 2,
    summary:
      "Comprehensive employment contract covering compensation, intellectual property assignment, non-compete provisions, and confidentiality obligations.",
  },
  {
    id: "doc-nda-003",
    name: "Mutual Non-Disclosure Agreement",
    type: "Bilateral Confidentiality",
    fileType: "PDF",
    pages: 8,
    status: "Analyzed",
    updatedAt: "Updated 3 days ago",
    createdAt: "2024-10-12",
    favorite: true,
    size: "1.2 MB",
    clausesCount: 16,
    attentionCount: 0,
    summary:
      "Standard bilateral non-disclosure agreement for mutual evaluation of proprietary technology and prospective partnership discussions.",
  },
  {
    id: "doc-serv-004",
    name: "Freelance Service Agreement",
    type: "Master Services Contract",
    fileType: "DOCX",
    pages: 10,
    status: "Analyzed",
    updatedAt: "Updated 4 days ago",
    createdAt: "2024-10-10",
    favorite: false,
    size: "840 KB",
    clausesCount: 19,
    attentionCount: 1,
    summary:
      "Independent contractor agreement defining project deliverables, payment milestones, IP transfer upon payment, and limitation of liability.",
  },
  {
    id: "doc-dev-005",
    name: "Software Development Agreement",
    type: "Engineering Statement of Work",
    fileType: "PDF",
    pages: 24,
    status: "Processing",
    updatedAt: "Updated just now",
    createdAt: "2024-10-16",
    favorite: false,
    size: "4.5 MB",
    summary:
      "Custom engineering agreement detailing acceptance criteria, sprint schedules, warranty periods, and code escrow terms.",
  },
  {
    id: "doc-offer-006",
    name: "Offer Letter",
    type: "Appointment Letter",
    fileType: "PDF",
    pages: 5,
    status: "Needs Review",
    updatedAt: "Updated 5 days ago",
    createdAt: "2024-10-09",
    favorite: false,
    size: "920 KB",
    clausesCount: 12,
    attentionCount: 2,
    summary:
      "Formal appointment offer letter with compensation breakdown, probationary period clauses, and background verification stipulations.",
  },
  {
    id: "doc-vend-007",
    name: "Vendor Agreement",
    type: "Procurement Deed",
    fileType: "PDF",
    pages: 16,
    status: "Analyzed",
    updatedAt: "Updated 1 week ago",
    createdAt: "2024-10-05",
    favorite: false,
    size: "2.8 MB",
    clausesCount: 28,
    attentionCount: 1,
    summary:
      "Vendor supply agreement outlining service level agreements (SLAs), indemnity, audit rights, and quarterly reconciliation timelines.",
  },
  {
    id: "doc-cons-008",
    name: "Consulting Agreement",
    type: "Strategic Advisory Deed",
    fileType: "DOCX",
    pages: 11,
    status: "Needs Review",
    updatedAt: "Updated 2 weeks ago",
    createdAt: "2024-09-28",
    favorite: false,
    size: "1.1 MB",
    clausesCount: 20,
    attentionCount: 3,
    summary:
      "Advisory contract containing equity compensation vesting schedules, non-solicitation clauses, and conflict of interest covenants.",
  },
  {
    id: "doc-comm-009",
    name: "Commercial Lease Agreement",
    type: "Office Space Lease · Koramangala",
    fileType: "PDF",
    pages: 22,
    status: "Analyzed",
    updatedAt: "Updated 2 weeks ago",
    createdAt: "2024-09-24",
    favorite: true,
    size: "3.4 MB",
    clausesCount: 35,
    attentionCount: 2,
    summary:
      "Commercial tenancy agreement for 3,000 sq ft office premises including maintenance charges, power backup tariffs, and signage rights.",
  },
  {
    id: "doc-tm-010",
    name: "Trademark Licensing Agreement",
    type: "Intellectual Property License",
    fileType: "PDF",
    pages: 14,
    status: "Analyzed",
    updatedAt: "Updated 3 weeks ago",
    createdAt: "2024-09-18",
    favorite: false,
    size: "1.9 MB",
    clausesCount: 22,
    attentionCount: 0,
    summary:
      "Non-exclusive trademark licensing deed granting regional distribution rights subject to brand usage compliance guidelines.",
  },
  {
    id: "doc-dpa-011",
    name: "Data Processing Addendum (DPA)",
    type: "Privacy & Compliance Exhibit",
    fileType: "DOCX",
    pages: 9,
    status: "Analyzed",
    updatedAt: "Updated 3 weeks ago",
    createdAt: "2024-09-15",
    favorite: false,
    size: "780 KB",
    clausesCount: 15,
    attentionCount: 1,
    summary:
      "Addendum regulating data controller and processor roles under Indian Digital Personal Data Protection Act (DPDPA) and GDPR.",
  },
  {
    id: "doc-msa-012",
    name: "Master Services Agreement (MSA)",
    type: "Enterprise Umbrella Deed",
    fileType: "PDF",
    pages: 29,
    status: "Processing",
    updatedAt: "Updated 1 month ago",
    createdAt: "2024-09-02",
    favorite: false,
    size: "5.2 MB",
    summary:
      "Framework master services contract establishing standard terms, liability caps, warranties, and multi-year governing schedules.",
  },
];

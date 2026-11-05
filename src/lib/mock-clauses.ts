export type ClauseStatus = "Standard" | "Important" | "May Require Review";
export type ClauseCategory =
  | "Payment"
  | "Termination"
  | "Liability"
  | "Confidentiality"
  | "Renewal"
  | "Dispute Resolution";

export interface MockClause {
  id: string;
  title: string;
  category: ClauseCategory;
  status: ClauseStatus;
  documentId: string;
  documentName: string;
  page: number;
  section: string;
  clauseNumber?: string;
  originalText: string;
  simpleLanguage: string;
  whyItMatters: string;
  updatedAt: string;
}

export const clauseCategories = [
  "All",
  "Payment",
  "Termination",
  "Liability",
  "Confidentiality",
  "Renewal",
  "Dispute Resolution",
];

export const clauseStatusOptions = ["All", "Standard", "Important", "May Require Review"];

export const clauseSummaryStats = {
  totalClauses: 24,
  totalDocuments: 8,
  categories: 7,
  reviewClauses: 3,
};

export const mockClauses: MockClause[] = [
  {
    id: "early-termination",
    title: "Early Termination",
    category: "Termination",
    status: "May Require Review",
    documentId: "doc-rental-001",
    documentName: "Residential Rental Agreement",
    page: 7,
    section: "Section 7.1",
    clauseNumber: "Clause 7.1",
    originalText:
      "In the event either party wishes to terminate this Agreement before the expiry of the agreed term, the terminating party shall provide sixty (60) days' prior written notice and comply with the applicable financial obligations set out in this Agreement.",
    simpleLanguage:
      "The agreement explains what happens if either party wants to end the agreement before the agreed end date.",
    whyItMatters:
      "This provision may affect the timing and financial consequences of ending the agreement early.",
    updatedAt: "2026-10-08T09:15:00Z",
  },
  {
    id: "notice-requirement",
    title: "Notice Requirement",
    category: "Termination",
    status: "Important",
    documentId: "doc-rental-001",
    documentName: "Residential Rental Agreement",
    page: 7,
    section: "Section 7.2",
    clauseNumber: "Clause 7.2",
    originalText:
      "The terminating party shall provide sixty (60) days' written notice unless otherwise agreed in writing.",
    simpleLanguage:
      "The contract requires written notice before ending the rental agreement early, unless both sides agree otherwise.",
    whyItMatters:
      "This notice period can materially affect how quickly a party can leave the arrangement and whether a deadline has already been missed.",
    updatedAt: "2026-10-08T09:20:00Z",
  },
  {
    id: "security-deposit",
    title: "Security Deposit",
    category: "Payment",
    status: "May Require Review",
    documentId: "doc-rental-001",
    documentName: "Residential Rental Agreement",
    page: 9,
    section: "Section 9.1",
    clauseNumber: "Clause 9.1",
    originalText:
      "The Tenant shall pay an interest-free refundable security deposit of ₹60,000 as a deposit towards performance under the Agreement, to be returned upon cessation of the tenancy subject to deductions for outstanding dues and damage.",
    simpleLanguage:
      "The tenant pays a refundable deposit to secure the lease, and it may be adjusted for unpaid charges or damage at the end.",
    whyItMatters:
      "The deposit clause is relevant because it affects cash flow, risk allocation, and the final exit calculation.",
    updatedAt: "2026-10-08T09:45:00Z",
  },
  {
    id: "monthly-rent",
    title: "Monthly Rent",
    category: "Payment",
    status: "Standard",
    documentId: "doc-rental-001",
    documentName: "Residential Rental Agreement",
    page: 4,
    section: "Section 4.1",
    clauseNumber: "Clause 4.1",
    originalText:
      "The Tenant shall pay a monthly rent of ₹20,000, due on or before the 5th day of each month by direct bank transfer to the account designated by the Landlord.",
    simpleLanguage:
      "Rent is due each month in advance and is payable through a designated bank account.",
    whyItMatters:
      "This clause sets the recurring payment obligation and is central to the tenant's ongoing financial commitments.",
    updatedAt: "2026-10-08T08:50:00Z",
  },
  {
    id: "maintenance-responsibility",
    title: "Maintenance Responsibility",
    category: "Payment",
    status: "Standard",
    documentId: "doc-rental-001",
    documentName: "Residential Rental Agreement",
    page: 6,
    section: "Section 6.3",
    clauseNumber: "Clause 6.3",
    originalText:
      "The Tenant shall maintain the premises in a clean and habitable condition and shall be responsible for routine upkeep, while structural repairs shall be borne by the Landlord.",
    simpleLanguage:
      "The tenant keeps the property in good condition for day-to-day living, while structural issues stay with the landlord.",
    whyItMatters:
      "This clause explains who handles maintenance and helps allocate operational responsibility during the term.",
    updatedAt: "2026-10-08T08:30:00Z",
  },
  {
    id: "nda-confidentiality",
    title: "Confidentiality",
    category: "Confidentiality",
    status: "Important",
    documentId: "doc-nda-003",
    documentName: "Mutual Non-Disclosure Agreement",
    page: 3,
    section: "Section 3.1",
    clauseNumber: "Clause 3.1",
    originalText:
      "Each party shall protect the other party's confidential information and use it solely for the purpose of the engagement and not for any unrelated commercial purpose.",
    simpleLanguage:
      "The agreement says each side must keep sensitive information private and only use it for the approved project.",
    whyItMatters:
      "This clause protects trade secrets and prevents misuse of proprietary information during business discussions.",
    updatedAt: "2026-10-06T15:30:00Z",
  },
  {
    id: "confidential-information",
    title: "Confidential Information",
    category: "Confidentiality",
    status: "Standard",
    documentId: "doc-nda-003",
    documentName: "Mutual Non-Disclosure Agreement",
    page: 4,
    section: "Section 4.2",
    clauseNumber: "Clause 4.2",
    originalText:
      "Confidential information includes any non-public information disclosed in writing, orally, or by demonstration, whether identified as confidential at the time of disclosure or reasonably understood to be confidential.",
    simpleLanguage:
      "The agreement defines what counts as confidential information and covers information shared in different formats.",
    whyItMatters:
      "This provision ensures the parties do not miss items that are sensitive even if they were not labelled as such.",
    updatedAt: "2026-10-06T15:45:00Z",
  },
  {
    id: "non-solicitation",
    title: "Non-Solicitation",
    category: "Confidentiality",
    status: "May Require Review",
    documentId: "doc-emp-002",
    documentName: "Employment Agreement",
    page: 8,
    section: "Section 8.4",
    clauseNumber: "Clause 8.4",
    originalText:
      "The Employee shall not solicit the Company's clients or employees for a period of twelve months after termination of employment, except as expressly permitted in writing by the Company.",
    simpleLanguage:
      "The worker cannot reach out to company customers or staff for a year after leaving the role without approval.",
    whyItMatters:
      "This may limit future employment opportunities and create practical restrictions after the job ends.",
    updatedAt: "2026-10-05T11:20:00Z",
  },
  {
    id: "termination-by-employer",
    title: "Termination by Employer",
    category: "Termination",
    status: "Important",
    documentId: "doc-emp-002",
    documentName: "Employment Agreement",
    page: 12,
    section: "Section 12.1",
    clauseNumber: "Clause 12.1",
    originalText:
      "The Company may terminate the Employee's employment for cause upon written notice, subject to any applicable notice period and obligations under the applicable labour law.",
    simpleLanguage:
      "The employer can end the role for cause, but the process and notice still have to follow the agreed terms and relevant legal requirements.",
    whyItMatters:
      "This clause is important because it determines how and when an employment relationship can end and whether procedural safeguards apply.",
    updatedAt: "2026-10-05T11:50:00Z",
  },
  {
    id: "payment-terms",
    title: "Payment Terms",
    category: "Payment",
    status: "Important",
    documentId: "doc-serv-004",
    documentName: "Freelance Service Agreement",
    page: 5,
    section: "Section 5.1",
    clauseNumber: "Clause 5.1",
    originalText:
      "Payment is due within ten (10) days of milestone acceptance and receipt of an invoice issued by the Service Provider.",
    simpleLanguage:
      "The contractor gets paid after the work is accepted and the invoice is submitted, within a short payment window.",
    whyItMatters:
      "This clause affects cash flow certainty and speeds up the time between delivery and payment.",
    updatedAt: "2026-10-04T10:15:00Z",
  },
  {
    id: "liability-limitation",
    title: "Liability Limitation",
    category: "Liability",
    status: "May Require Review",
    documentId: "doc-serv-004",
    documentName: "Freelance Service Agreement",
    page: 7,
    section: "Section 7.2",
    clauseNumber: "Clause 7.2",
    originalText:
      "The aggregate liability of either party under this Agreement shall not exceed the fees paid under the applicable statement of work and shall exclude consequential, incidental, and indirect damages.",
    simpleLanguage:
      "The total legal liability is capped at the fees already paid, and some kinds of losses are excluded.",
    whyItMatters:
      "This clause may limit recovery in the event of a dispute and is therefore important to review carefully.",
    updatedAt: "2026-10-04T10:35:00Z",
  },
  {
    id: "dispute-resolution",
    title: "Dispute Resolution",
    category: "Dispute Resolution",
    status: "Standard",
    documentId: "doc-serv-004",
    documentName: "Freelance Service Agreement",
    page: 9,
    section: "Section 9.1",
    clauseNumber: "Clause 9.1",
    originalText:
      "Any dispute arising under this Agreement shall first be referred to good-faith negotiation, failing which the parties may attempt mediation before any litigation proceedings are commenced.",
    simpleLanguage:
      "The parties must try to settle the issue first before resorting to litigation, with mediation as a staged process.",
    whyItMatters:
      "This clause influences the practical time and cost of resolving a conflict and reduces immediate legal escalation.",
    updatedAt: "2026-10-04T10:55:00Z",
  },
  {
    id: "renewal-provision",
    title: "Renewal Provision",
    category: "Renewal",
    status: "Standard",
    documentId: "doc-emp-002",
    documentName: "Employment Agreement",
    page: 10,
    section: "Section 10.2",
    clauseNumber: "Clause 10.2",
    originalText:
      "Unless earlier terminated in accordance with this Agreement, the employment relationship shall renew automatically for successive twelve-month periods unless either party provides not less than thirty (30) days' written notice of non-renewal.",
    simpleLanguage:
      "The agreement continues on a rolling basis unless either side gives notice that they do not want to renew it.",
    whyItMatters:
      "This clause impacts continuity of service and planning for the end of the engagement.",
    updatedAt: "2026-10-05T11:35:00Z",
  },
];

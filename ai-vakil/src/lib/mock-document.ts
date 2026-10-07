import { Document, Obligation, ImportantDate } from "@/types";

export interface WorkspaceSection {
  id: string;
  name: string;
  page: number;
  iconName: string;
  clauseCount?: number;
}

export interface WorkspaceAttentionArea {
  id: string;
  title: string;
  page: number;
  clauseRef: string;
  description: string;
  status: "May Require Review";
  details?: string;
}

export interface WorkspacePageData {
  pageNumber: number;
  headerTitle: string;
  sectionTitle: string;
  paragraphs: {
    id: string;
    sectionNumber?: string;
    heading?: string;
    text: string;
    isHighlighted?: boolean;
    highlightLabel?: string;
    clauseId?: string;
  }[];
  footerText: string;
}

export const mockImportantDates: ImportantDate[] = [
  {
    id: "date-start",
    documentId: "doc-rental-001",
    title: "Agreement Start",
    date: "12 Jan 2026",
    type: "effective",
    description: "Tenancy officially begins; physical possession handed over to the Tenant.",
    clauseReference: "Section 2.1 (Page 2)",
    isCritical: true,
  },
  {
    id: "date-notice",
    documentId: "doc-rental-001",
    title: "Notice Deadline",
    date: "12 Oct 2026",
    type: "renewal_notice",
    noticePeriodDays: 60,
    description: "Mandatory 60-day written notice required prior to lease expiration to terminate or renew.",
    clauseReference: "Section 7.2 (Page 7)",
    isCritical: true,
  },
  {
    id: "date-end",
    documentId: "doc-rental-001",
    title: "Agreement End",
    date: "11 Dec 2026",
    type: "expiration",
    description: "Conclusion of the 11-month tenancy term unless renewed by mutual written deed.",
    clauseReference: "Section 2.2 (Page 2)",
    isCritical: false,
  },
];

export const mockObligations: Obligation[] = [
  // Tenant obligations (My Obligations)
  {
    id: "ob-rent",
    documentId: "doc-rental-001",
    party: "My Obligations",
    description: "Pay monthly rent of ₹20,000 on or before the 5th calendar day of each month.",
    dueDate: "Recurring (5th of each month)",
    recurrence: "monthly",
    status: "in_progress",
    clauseId: "sec-4.1",
    consequenceOfBreach: "Late payment penalty after grace period.",
    priority: "high",
  },
  {
    id: "ob-maintain",
    documentId: "doc-rental-001",
    party: "My Obligations",
    description: "Maintain the premises according to the agreement in clean condition.",
    dueDate: "Throughout tenancy",
    recurrence: "monthly",
    status: "in_progress",
    clauseId: "sec-5.2",
    consequenceOfBreach: "Deduction for damages beyond normal wear and tear.",
    priority: "medium",
  },
  {
    id: "ob-notice-tenant",
    documentId: "doc-rental-001",
    party: "My Obligations",
    description: "Provide 60 days written notice before early termination of the agreement.",
    dueDate: "Prior to exit",
    recurrence: "one-time",
    status: "pending",
    clauseId: "sec-7.2",
    consequenceOfBreach: "Forfeiture or compensation for deficient notice duration.",
    priority: "high",
  },
  // Landlord obligations (Other Party)
  {
    id: "ob-property-resp",
    documentId: "doc-rental-001",
    party: "Other Party",
    description: "Maintain agreed property responsibilities including structural repairs and waterproofing.",
    dueDate: "Upon notification",
    recurrence: "one-time",
    status: "in_progress",
    clauseId: "sec-6.1",
    consequenceOfBreach: "Tenant may deduct verified emergency repair costs.",
    priority: "medium",
  },
  {
    id: "ob-deposit-return",
    documentId: "doc-rental-001",
    party: "Other Party",
    description: "Return eligible security deposit according to the agreement within 14 banking days.",
    dueDate: "Within 14 days of vacate",
    recurrence: "one-time",
    status: "pending",
    clauseId: "sec-9.1",
    consequenceOfBreach: "Default interest rate applied for delayed refund.",
    priority: "high",
  },
  {
    id: "ob-notice-landlord",
    documentId: "doc-rental-001",
    party: "Other Party",
    description: "Provide required notices for property inspections or non-renewal.",
    dueDate: "Prior to inspection",
    recurrence: "one-time",
    status: "pending",
    clauseId: "sec-7.1",
    consequenceOfBreach: "Unlawful entry without prior notice.",
    priority: "low",
  },
];

export const mockAttentionAreas: WorkspaceAttentionArea[] = [
  {
    id: "att-1",
    title: "Early Termination",
    page: 7,
    clauseRef: "Section 7.1",
    description:
      "Early termination may have financial or procedural consequences depending on the agreement terms.",
    status: "May Require Review",
    details:
      "Review notice requirements and potential forfeiture provisions if vacating before the 11-month term.",
  },
  {
    id: "att-2",
    title: "Security Deposit",
    page: 9,
    clauseRef: "Section 9.1",
    description:
      "Review the conditions governing deductions and return of the security deposit.",
    status: "May Require Review",
    details:
      "Clarifies the 14-day refund window following peaceful handover and conditions for repair deductions.",
  },
  {
    id: "att-3",
    title: "Notice Requirement",
    page: 7,
    clauseRef: "Section 7.2",
    description:
      "The agreement refers to a 60-day written notice requirement.",
    status: "May Require Review",
    details:
      "Both parties are bound by a mutual 60-day advance notice period before ending the lease deed.",
  },
];

export const mockWorkspaceSections: WorkspaceSection[] = [
  { id: "sec-overview", name: "Overview", page: 1, iconName: "FileText", clauseCount: 2 },
  { id: "sec-parties", name: "Parties", page: 2, iconName: "Users", clauseCount: 2 },
  { id: "sec-definitions", name: "Definitions", page: 3, iconName: "BookOpen", clauseCount: 3 },
  { id: "sec-rent", name: "Rent & Payment", page: 4, iconName: "CreditCard", clauseCount: 3 },
  { id: "sec-resp", name: "Responsibilities", page: 5, iconName: "CheckSquare", clauseCount: 3 },
  { id: "sec-maint", name: "Maintenance", page: 6, iconName: "Wrench", clauseCount: 2 },
  { id: "sec-term", name: "Termination", page: 7, iconName: "ShieldAlert", clauseCount: 3 },
  { id: "sec-dispute", name: "Dispute Resolution", page: 10, iconName: "Scale", clauseCount: 2 },
  { id: "sec-misc", name: "Miscellaneous", page: 11, iconName: "FileCheck", clauseCount: 3 },
];

export const mockDocument: Document = {
  id: "doc-rental-001",
  title: "Residential Rental Agreement",
  fileName: "Residential_Rental_Agreement_Indiranagar.pdf",
  fileSize: 2485760, // ~2.4 MB
  fileType: "pdf",
  uploadedAt: "2026-01-12T10:00:00Z",
  status: "analyzed",
  pageCount: 12,
  parties: [
    {
      name: "Alex Morgan",
      role: "Landlord / Lessor",
      identifier: "ID: IND-LM-8921",
      address: "123 Example Street, Bengaluru, Karnataka",
    },
    {
      name: "Jordan Lee",
      role: "Tenant / Lessee",
      identifier: "ID: IND-TN-4019",
      address: "123 Example Street, Bengaluru, Karnataka",
    },
  ],
  jurisdiction: "Civil Courts of Bengaluru, Karnataka",
  governingLaw: "Karnataka Rent Act & Indian Contract Act, 1872",
  effectiveDate: "2026-01-12",
  expirationDate: "2026-12-11",
  duration: "11 months",
  summary:
    "This agreement is an 11-month residential rental agreement with a monthly rent of ₹20,000 and a security deposit of ₹60,000. The termination section requires written notice and contains provisions relevant to early exit.",
  riskScore: 35,
  riskLevel: "medium",
  tags: ["Residential Lease", "11 Months", "Bengaluru", "Notice Requirement"],
  category: "Residential Rental Agreement",
  clauseCount: 24,
  obligationCount: 6,
  financialTerms: {
    monthlyRent: 20000,
    securityDeposit: 60000,
    currency: "INR (₹)",
    noticePeriodDays: 60,
  },
};

export const mockDocumentPages: Record<number, WorkspacePageData> = {
  1: {
    pageNumber: 1,
    headerTitle: "RESIDENTIAL RENTAL AGREEMENT",
    sectionTitle: "PREAMBLE & RECITALS",
    paragraphs: [
      {
        id: "p1-1",
        sectionNumber: "1.1",
        heading: "Execution & Effective Date",
        text: "This Residential Rental Agreement (hereinafter referred to as the 'Agreement') is executed and made effective as of the 12th day of January, 2026 (the 'Effective Date'), by and between the Landlord and the Tenant named herein.",
      },
      {
        id: "p1-2",
        sectionNumber: "1.2",
        heading: "Background Recitals",
        text: "WHEREAS the Landlord is the lawful absolute owner in possession of the residential property situated at 123 Example Street, Bengaluru, Karnataka; and WHEREAS the Tenant has approached the Landlord to take on lease the said property for residential dwelling purposes only for an initial term of 11 (eleven) months.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 1 of 12",
  },
  2: {
    pageNumber: 2,
    headerTitle: "PARTIES & DEMISED PREMISES",
    sectionTitle: "SECTION 2: IDENTIFICATION OF PARTIES & TERM",
    paragraphs: [
      {
        id: "p2-1",
        sectionNumber: "2.1",
        heading: "Parties to Agreement",
        text: "LANDLORD: Alex Morgan, residing at 123 Example Street, Bengaluru, Karnataka (hereinafter 'Lessor', which expression shall include legal heirs, successors, and assigns).\n\nTENANT: Jordan Lee, residing at 123 Example Street, Bengaluru, Karnataka (hereinafter 'Lessee', which expression shall include permissible occupants and legal representatives).",
      },
      {
        id: "p2-2",
        sectionNumber: "2.2",
        heading: "Tenancy Term & Validity",
        text: "The tenancy shall commence on 12 January 2026 (Commencement Date) and shall endure for a fixed duration of eleven (11) English calendar months, concluding on 11 December 2026 (Expiration Date), unless renewed by mutual written deed or terminated earlier in accordance with the provisions herein.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 2 of 12",
  },
  3: {
    pageNumber: 3,
    headerTitle: "DEFINITIONS & INTERPRETATION",
    sectionTitle: "SECTION 3: DEFINED TERMS",
    paragraphs: [
      {
        id: "p3-1",
        sectionNumber: "3.1",
        heading: "Demised Premises",
        text: "'Demised Premises' shall mean the entire residential apartment situated on the 4th Floor of 123 Example Street, Bengaluru, including one designated parking space and electrical fittings specified in Schedule A.",
      },
      {
        id: "p3-2",
        sectionNumber: "3.2",
        heading: "Rent & Deposit",
        text: "'Monthly Rent' shall denote the agreed sum of ₹20,000 payable monthly in advance. 'Security Deposit' signifies the sum of ₹60,000 deposited as an interest-free financial guarantee.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 3 of 12",
  },
  4: {
    pageNumber: 4,
    headerTitle: "RENT & SECURITY DEPOSIT",
    sectionTitle: "SECTION 4: FINANCIAL CONSIDERATION",
    paragraphs: [
      {
        id: "p4-1",
        sectionNumber: "4.1",
        heading: "Monthly Consideration",
        text: "The Tenant shall pay a monthly rental consideration of ₹20,000 (Rupees Twenty Thousand only) on or before the 5th day of each calendar month via direct electronic transfer into the designated bank account of the Landlord.",
      },
      {
        id: "p4-2",
        sectionNumber: "4.2",
        heading: "Security Deposit Consideration",
        text: "The Tenant has deposited with the Landlord an interest-free refundable security deposit of ₹60,000 (Rupees Sixty Thousand only). The Landlord acknowledges receipt of this amount upon execution of this deed.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 4 of 12",
  },
  5: {
    pageNumber: 5,
    headerTitle: "TENANT RESPONSIBILITIES",
    sectionTitle: "SECTION 5: PERMITTED OCCUPANCY & OBLIGATIONS",
    paragraphs: [
      {
        id: "p5-1",
        sectionNumber: "5.1",
        heading: "Residential Use Exclusivity",
        text: "The Tenant covenants to use the premises strictly for residential dwelling purposes and shall not permit commercial activities, sub-leasing, or assignment of tenancy to any third parties.",
      },
      {
        id: "p5-2",
        sectionNumber: "5.2",
        heading: "Care of Premises & Utilities",
        text: "The Tenant shall bear routine utility expenses including electricity and water, and maintain the premises in good, tenantable condition, ordinary wear and tear excepted.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 5 of 12",
  },
  6: {
    pageNumber: 6,
    headerTitle: "MAINTENANCE & REPAIRS",
    sectionTitle: "SECTION 6: STRUCTURAL MAINTENANCE",
    paragraphs: [
      {
        id: "p6-1",
        sectionNumber: "6.1",
        heading: "Structural Repairs Responsibility",
        text: "The Landlord shall be responsible for all structural repairs, external seepage, major plumbing, and conduit electrical faults not attributable to Tenant negligence.",
      },
      {
        id: "p6-2",
        sectionNumber: "6.2",
        heading: "Notification Window",
        text: "The Tenant shall notify the Landlord in writing of any required structural repairs, and the Landlord shall attend to the same within a reasonable period not exceeding 14 days.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 6 of 12",
  },
  7: {
    pageNumber: 7,
    headerTitle: "TERMINATION & NOTICE REQUIREMENTS",
    sectionTitle: "SECTION 7: TERMINATION",
    paragraphs: [
      {
        id: "p7-1",
        sectionNumber: "7.1",
        heading: "Early Termination",
        text: "Either party may terminate this Agreement before the expiry of the term by providing written notice in accordance with the notice requirements set out in this Agreement.",
        clauseId: "sec-7.1",
      },
      {
        id: "p7-2",
        sectionNumber: "7.2",
        heading: "Notice Requirement",
        text: "The terminating party shall provide sixty (60) days' written notice unless otherwise agreed in writing by both parties.",
        isHighlighted: true,
        highlightLabel: "Clause 7.2 · Cited in AI Insights & Questions",
        clauseId: "sec-7.2",
      },
      {
        id: "p7-3",
        sectionNumber: "7.3",
        heading: "Early Exit",
        text: "Where the Tenant vacates the premises before the expiry of the agreed term, the financial consequences, if any, shall be subject to the applicable provisions of this Agreement.",
        clauseId: "sec-7.3",
      },
    ],
    footerText: "Residential Rental Agreement · Page 7 of 12",
  },
  8: {
    pageNumber: 8,
    headerTitle: "INSPECTION & ENTRY",
    sectionTitle: "SECTION 8: RIGHT OF INSPECTION",
    paragraphs: [
      {
        id: "p8-1",
        sectionNumber: "8.1",
        heading: "Inspection by Appointment",
        text: "The Landlord or authorized agents may inspect the premises during reasonable daylight hours with not less than 24 hours prior notice to the Tenant.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 8 of 12",
  },
  9: {
    pageNumber: 9,
    headerTitle: "SECURITY DEPOSIT RETURN",
    sectionTitle: "SECTION 9: REFUND & DEDUCTIONS",
    paragraphs: [
      {
        id: "p9-1",
        sectionNumber: "9.1",
        heading: "Return of Security Deposit",
        text: "The Landlord shall refund the security deposit of ₹60,000 within 14 banking days from the date of peaceful physical handover of the premises, subject to permissible deductions for unpaid utility dues or verified damages beyond ordinary wear and tear.",
        clauseId: "sec-9.1",
      },
      {
        id: "p9-2",
        sectionNumber: "9.2",
        heading: "Dispute over Deductions",
        text: "Any itemized deductions from the security deposit must be supported by photographic evidence and repair receipts furnished to the Tenant prior to adjustment.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 9 of 12",
  },
  10: {
    pageNumber: 10,
    headerTitle: "DISPUTE RESOLUTION",
    sectionTitle: "SECTION 10: DISPUTE RESOLUTION & GOVERNING LAW",
    paragraphs: [
      {
        id: "p10-1",
        sectionNumber: "10.1",
        heading: "Governing Law & Jurisdiction",
        text: "This Agreement shall be governed by and construed in accordance with the laws of India. The courts situated in Bengaluru, Karnataka shall have exclusive jurisdiction over disputes arising hereunder.",
      },
      {
        id: "p10-2",
        sectionNumber: "10.2",
        heading: "Amicable Settlement",
        text: "The parties agree to attempt good-faith mediation for a period of 15 days before initiating legal proceedings before the competent civil forum.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 10 of 12",
  },
  11: {
    pageNumber: 11,
    headerTitle: "MISCELLANEOUS & EXECUTION",
    sectionTitle: "SECTION 11: MISCELLANEOUS COVENANTS & SIGNATURES",
    paragraphs: [
      {
        id: "p11-1",
        sectionNumber: "11.1",
        heading: "Entire Agreement & Amendments",
        text: "This document constitutes the entire understanding between the parties with respect to the demised premises and supersedes prior discussions. Any modification must be made in writing and duly signed by both parties.",
      },
      {
        id: "p11-2",
        sectionNumber: "11.2",
        heading: "Signatures of Parties",
        text: "IN WITNESS WHEREOF, the Landlord (Alex Morgan) and the Tenant (Jordan Lee) have set their respective hands and seals on this 12th day of January, 2026, in the presence of the undersigned witnesses.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 11 of 12",
  },
  12: {
    pageNumber: 12,
    headerTitle: "SCHEDULES & INVENTORY",
    sectionTitle: "SCHEDULE A & B: FIXTURES AND APPLIANCES",
    paragraphs: [
      {
        id: "p12-1",
        sectionNumber: "Schedule A",
        heading: "Inventory of Property Fittings",
        text: "Schedule of fittings: 3 Ceiling Fans, 1 Geyser (bathroom), Modular Kitchen Cabinets, 1 Reserved Car Parking Slot No. 402.",
      },
      {
        id: "p12-2",
        sectionNumber: "Schedule B",
        heading: "Condition Certificate",
        text: "Signed joint inspection report confirming premises received in clean, painted, and undamaged condition on 12 January 2026.",
      },
    ],
    footerText: "Residential Rental Agreement · Page 12 of 12",
  },
};

export const mockExplainClauseData = {
  sectionNumber: "Section 7.2",
  clauseTitle: "Notice Requirement",
  page: 7,
  originalText:
    "The terminating party shall provide sixty (60) days' written notice unless otherwise agreed in writing by both parties.",
  simpleLanguage:
    "The agreement asks the party ending the agreement to give written notice 60 days in advance.",
  whyItMatters:
    "This timing may affect when you can leave the agreement and should be checked against the other termination provisions.",
  sourcePageCitation: "Page 7 · Section 7.2",
};

export const mockSearchIndex: Record<
  string,
  { page: number; section: string; snippet: string }[]
> = {
  rent: [
    {
      page: 4,
      section: "Section 4.1",
      snippet: "Tenant shall pay monthly rental consideration of ₹20,000 on or before the 5th...",
    },
    {
      page: 3,
      section: "Section 3.2",
      snippet: "'Monthly Rent' shall denote the agreed sum of ₹20,000 payable monthly in advance...",
    },
  ],
  termination: [
    {
      page: 7,
      section: "Section 7.1",
      snippet: "Either party may terminate this Agreement before expiry of term by providing written notice...",
    },
    {
      page: 7,
      section: "Section 7.2",
      snippet: "The terminating party shall provide sixty (60) days' written notice...",
    },
    {
      page: 7,
      section: "Section 7.3",
      snippet: "Where the Tenant vacates before expiry, financial consequences shall be subject to provisions...",
    },
  ],
  deposit: [
    {
      page: 4,
      section: "Section 4.2",
      snippet: "Interest-free refundable security deposit of ₹60,000 acknowledges receipt upon execution...",
    },
    {
      page: 9,
      section: "Section 9.1",
      snippet: "Landlord shall refund the security deposit of ₹60,000 within 14 banking days...",
    },
  ],
  notice: [
    {
      page: 7,
      section: "Section 7.2",
      snippet: "The terminating party shall provide sixty (60) days' written notice unless otherwise agreed...",
    },
    {
      page: 8,
      section: "Section 8.1",
      snippet: "Landlord may inspect premises with not less than 24 hours prior notice...",
    },
  ],
  maintenance: [
    {
      page: 6,
      section: "Section 6.1",
      snippet: "Landlord shall be responsible for all structural repairs, external seepage, major plumbing...",
    },
    {
      page: 5,
      section: "Section 5.2",
      snippet: "Tenant shall maintain premises in good, tenantable condition...",
    },
  ],
};

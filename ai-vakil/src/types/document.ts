export type DocumentStatus = "uploaded" | "processing" | "analyzed" | "error";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type DocumentCategory =
  | "Residential Rental Agreement"
  | "Commercial Contract"
  | "Employment Agreement"
  | "Non-Disclosure (NDA)"
  | "Vendor & Master Services"
  | "Intellectual Property"
  | "Real Estate & Lease"
  | "Compliance & Regulatory";

export interface DocumentParty {
  name: string;
  role: "Landlord / Lessor" | "Tenant / Lessee" | "Disclosing Party" | "Receiving Party" | "Client" | "Service Provider" | "Other";
  identifier?: string;
  address?: string;
}

export interface ImportantDate {
  id: string;
  documentId: string;
  title: string;
  date: string;
  type:
    | "effective"
    | "expiration"
    | "renewal_notice"
    | "payment_due"
    | "compliance_audit"
    | "milestone";
  noticePeriodDays?: number;
  description: string;
  clauseReference?: string;
  isCritical?: boolean;
}

export interface Obligation {
  id: string;
  documentId: string;
  party: string;
  description: string;
  dueDate?: string;
  recurrence?: "one-time" | "monthly" | "quarterly" | "annual";
  status: "pending" | "in_progress" | "completed" | "overdue";
  clauseId?: string;
  consequenceOfBreach?: string;
  priority: "low" | "medium" | "high";
}

export interface Document {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  fileType: "pdf" | "docx";
  uploadedAt: string;
  status: DocumentStatus;
  pageCount: number;
  parties: DocumentParty[];
  jurisdiction?: string;
  governingLaw?: string;
  effectiveDate?: string;
  expirationDate?: string;
  duration?: string;
  summary: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  tags: string[];
  category: DocumentCategory;
  clauseCount: number;
  obligationCount: number;
  financialTerms?: {
    monthlyRent?: number;
    securityDeposit?: number;
    currency: string;
    escalationPercent?: number;
    noticePeriodDays?: number;
  };
}

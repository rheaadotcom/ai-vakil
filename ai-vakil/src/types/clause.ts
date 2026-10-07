import { RiskLevel } from "./document";

export type ClauseCategory =
  | "Rent & Security Deposit"
  | "Duration & Renewal"
  | "Termination & Notice"
  | "Early Termination & Penalties"
  | "Maintenance & Repairs"
  | "Permitted Use & Subletting"
  | "Indemnification & Liability"
  | "Inspection & Entry"
  | "Governing Law & Dispute Resolution"
  | "Boilerplate & Miscellaneous";

export interface Clause {
  id: string;
  documentId: string;
  sectionNumber: string; // e.g. "Clause 7.1" or "§ 9"
  title: string;
  text: string;
  page: number;
  category: ClauseCategory;
  riskLevel: RiskLevel;
  explanation: string;
  standardDeviation?: string;
  suggestedRevision?: string;
  keyPoints?: string[];
  isFlagged?: boolean;
}

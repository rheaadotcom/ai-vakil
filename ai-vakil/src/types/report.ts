import { RiskLevel } from "./document";
import { ClauseCategory } from "./clause";

export interface ReportClauseBreakdown {
  category: ClauseCategory;
  count: number;
  highRiskCount: number;
}

export interface ReportRiskItem {
  id: string;
  title: string;
  description: string;
  severity: RiskLevel;
  clauseReference: string;
  pageNumber: number;
  mitigationStrategy: string;
}

export interface Report {
  id: string;
  documentId: string;
  documentTitle: string;
  title: string;
  generatedAt: string;
  executiveSummary: string;
  overallRiskScore: number; // 0 - 100
  overallRiskLevel: RiskLevel;
  keyFindings: string[];
  clauseBreakdown: ReportClauseBreakdown[];
  topRisks: ReportRiskItem[];
  recommendations: string[];
  status: "draft" | "final";
  verifierNote?: string;
}

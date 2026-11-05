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

export interface ReportSource {
  documentId: string;
  documentName: string;
  page: number;
  section: string;
  sourceText: string;
}

export interface ReportMetadata {
  documentId: string;
  documentTitle: string;
  documentType: string;
  format: string;
  pages: number;
  clausesAnalyzed: number;
  analysisDate: string;
  status: string;
}

export interface ExecutiveSummaryData {
  paragraphs: string[];
  tags: string[];
}

export interface DocumentOverviewData {
  document: string;
  documentType: string;
  term: string;
  startDate: string;
  endDate: string;
  monthlyRent: string;
  securityDeposit: string;
  noticePeriod: string;
  pages: string;
  clauses: string;
}

export interface ReportDateItem {
  date: string;
  event: string;
  href: string;
  source: ReportSource;
}

export interface ReportObligation {
  title: string;
  value?: string;
  description?: string;
  source: ReportSource;
}

export interface ReportAttentionItem {
  id: string;
  title: string;
  page: number;
  section: string;
  description: string;
  status: "May Require Review" | "Important" | "Standard";
  href: string;
  source: ReportSource;
}

export interface ReportClauseCategory {
  category: string;
  count: number;
}

export interface ReportClauseSummary {
  total: number;
  important: number;
  standard: number;
  mayRequireReview: number;
  categories: ReportClauseCategory[];
}

export interface ReportKeyTerm {
  label: string;
  value: string;
  source?: ReportSource;
}

export interface ReportObservation {
  text: string;
  source?: ReportSource;
}

export interface SourceCoverageData {
  clausesAnalyzed: number;
  pagesReviewed: number;
  datesIdentified: number;
  obligationsIdentified: number;
  note: string;
  source: ReportSource;
}

export interface DemoReportData {
  reportMetadata: ReportMetadata;
  executiveSummary: ExecutiveSummaryData;
  documentOverview: DocumentOverviewData;
  importantDates: ReportDateItem[];
  obligations: {
    myObligations: ReportObligation[];
    otherParty: ReportObligation[];
  };
  attentionItems: ReportAttentionItem[];
  clauseBreakdown: ReportClauseSummary;
  keyTerms: ReportKeyTerm[];
  aiObservations: ReportObservation[];
  sourceCoverage: SourceCoverageData;
}

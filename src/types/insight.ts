import { RiskLevel } from "./document";

export type InsightType = "risk" | "opportunity" | "anomaly" | "compliance" | "missing_clause";

export interface Insight {
  id: string;
  documentId: string;
  type: InsightType;
  title: string;
  description: string;
  severity: RiskLevel;
  recommendedAction: string;
  clauseId?: string;
  pageNumber?: number;
  impactScore?: number; // 1 - 100
  category?: string;
}

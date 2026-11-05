import React from "react";
import { motion } from "framer-motion";
import { MockClause } from "@/lib/mock-clauses";
import { ClauseCard } from "./clause-card";

export interface ClauseListProps {
  clauses: MockClause[];
  selectedClauseId: string | null;
  savedClauseIds: string[];
  onSelectClause: (clauseId: string) => void;
  onToggleSave: (clauseId: string) => void;
}

export function ClauseList({ clauses, selectedClauseId, savedClauseIds, onSelectClause, onToggleSave }: ClauseListProps) {
  return (
    <div className="space-y-3 overflow-y-auto pr-1">
      {clauses.map((clause, index) => (
        <motion.div key={clause.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }}>
          <ClauseCard
            clause={clause}
            isSelected={selectedClauseId === clause.id}
            isSaved={savedClauseIds.includes(clause.id)}
            onSelect={onSelectClause}
            onToggleSave={onToggleSave}
          />
        </motion.div>
      ))}
    </div>
  );
}

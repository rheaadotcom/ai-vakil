"use client";

import React from "react";
import { motion } from "framer-motion";
import { MockDocument } from "@/lib/mock-documents";
import { DocumentCard } from "./document-card";

export interface DocumentGridProps {
  documents: MockDocument[];
  onToggleFavorite: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export function DocumentGrid({
  documents,
  onToggleFavorite,
  onRename,
  onDelete,
  className,
}: DocumentGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${
        className || ""
      }`}
    >
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
        >
          <DocumentCard
            document={doc}
            onToggleFavorite={onToggleFavorite}
            onRename={onRename}
            onDelete={onDelete}
            className="h-full"
          />
        </motion.div>
      ))}
    </div>
  );
}

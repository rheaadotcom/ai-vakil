"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  X,
  FileText,
  CornerDownLeft,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AIQuestionBarProps {
  onNavigateToPage: (page: number, section?: string) => void;
  className?: string;
}

interface SourceCitationItem {
  page: number;
  section: string;
}

interface QAItem {
  question: string;
  answer: string;
  sources: SourceCitationItem[];
}

export function AIQuestionBar({ onNavigateToPage, className }: AIQuestionBarProps) {
  const [questionInput, setQuestionInput] = useState("");
  const [activeQA, setActiveQA] = useState<QAItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const suggestedQuestions = [
    "Can I terminate this agreement before 11 months?",
    "What is the notice period?",
    "When does the agreement end?",
    "What happens to the security deposit?",
  ];

  const mockAnswers: Record<string, QAItem> = {
    "can i terminate this agreement before 11 months?": {
      question: "Can I terminate this agreement before 11 months?",
      answer:
        "Based on the uploaded agreement, early termination is addressed in Section 7. The agreement refers to written notice and states that the terminating party should provide 60 days' notice unless otherwise agreed in writing. The financial consequences of leaving before the agreed term depend on the provisions of the agreement.",
      sources: [
        { page: 7, section: "Section 7.1" },
        { page: 7, section: "Section 7.2" },
        { page: 7, section: "Section 7.3" },
      ],
    },
    "what is the notice period?": {
      question: "What is the notice period?",
      answer:
        "Under Section 7.2 of the agreement, either terminating party is required to provide not less than sixty (60) days' written notice to the other party prior to ending the tenancy.",
      sources: [{ page: 7, section: "Section 7.2" }],
    },
    "when does the agreement end?": {
      question: "When does the agreement end?",
      answer:
        "According to Section 2.2, the 11-month tenancy commences on 12 January 2026 and concludes on 11 December 2026, unless renewed by separate mutual written agreement.",
      sources: [{ page: 2, section: "Section 2.2" }],
    },
    "what happens to the security deposit?": {
      question: "What happens to the security deposit?",
      answer:
        "Under Section 4.2 and Section 9.1, the interest-free refundable security deposit of ₹60,000 is to be returned within 14 banking days from peaceful physical handover, subject to permissible adjustments for utility arrears or physical damage beyond ordinary wear and tear.",
      sources: [
        { page: 4, section: "Section 4.2" },
        { page: 9, section: "Section 9.1" },
      ],
    },
  };

  const handleAsk = (queryText: string) => {
    if (!queryText.trim()) return;

    const normalized = queryText.toLowerCase().trim();
    let matched = mockAnswers[normalized];

    if (!matched) {
      // Find closest match or provide neutral grounded response
      const matchedKey = Object.keys(mockAnswers).find((k) =>
        normalized.includes("terminate") || normalized.includes("early")
          ? k.includes("terminate")
          : normalized.includes("notice")
          ? k.includes("notice")
          : normalized.includes("deposit")
          ? k.includes("deposit")
          : normalized.includes("end") || normalized.includes("expire")
          ? k.includes("end")
          : false
      );

      if (matchedKey) {
        matched = {
          ...mockAnswers[matchedKey],
          question: queryText,
        };
      } else {
        matched = {
          question: queryText,
          answer:
            "Based on the uploaded agreement, provisions regarding covenants and obligations are detailed across Sections 1 through 11. Termination and notice requirements are located primarily in Section 7 (Page 7).",
          sources: [
            { page: 7, section: "Section 7.1" },
            { page: 7, section: "Section 7.2" },
          ],
        };
      }
    }

    setActiveQA(matched);
    setIsExpanded(true);
    setQuestionInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(questionInput);
  };

  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#0E0E13]/95 backdrop-blur-xl shadow-2xl p-3 sm:p-4 space-y-3 ${
        className || ""
      }`}
    >
      {/* Active AI Response Card (Expandable/Dismissible) */}
      {activeQA && isExpanded && (
        <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/30 space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-violet-300">
              <Sparkles className="h-4 w-4 text-violet-400 shrink-0" />
              <span className="text-xs font-semibold">
                &ldquo;{activeQA.question}&rdquo;
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]"
                title="Collapse answer"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveQA(null)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]"
                title="Dismiss answer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-200 leading-relaxed pl-6">
            {activeQA.answer}
          </p>

          {/* Source Citations Row */}
          <div className="flex items-center gap-2 flex-wrap pl-6 pt-1 text-[11px]">
            <span className="text-zinc-400 font-medium">Sources:</span>
            {activeQA.sources.map((src, i) => (
              <button
                key={`${src.page}-${src.section}-${i}`}
                type="button"
                onClick={() => onNavigateToPage(src.page, src.section)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 border border-violet-500/30 transition-colors font-mono text-[10.5px]"
              >
                <FileText className="h-3 w-3 text-violet-400" />
                <span>
                  Page {src.page} · {src.section}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Questions Chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-zinc-400 font-medium mr-1 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-violet-400" />
          <span>Suggested:</span>
        </span>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleAsk(q)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-violet-500/15 text-zinc-300 hover:text-violet-200 border border-white/[0.06] hover:border-violet-500/30 transition-all text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Ask Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder="Ask AI Vakil about this agreement (e.g. notice period, deposit deductions, early termination)..."
            className="w-full h-10 px-3.5 pr-10 rounded-xl bg-black/40 border border-white/[0.08] focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 text-xs text-zinc-100 placeholder:text-zinc-500 transition-all outline-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hidden sm:block pointer-events-none">
            <CornerDownLeft className="h-3.5 w-3.5" />
          </span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!questionInput.trim()}
          rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          className="h-10 text-xs px-3.5"
        >
          Ask
        </Button>
      </form>
    </div>
  );
}

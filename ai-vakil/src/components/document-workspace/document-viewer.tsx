"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Stamp, ShieldAlert } from "lucide-react";
import { mockDocumentPages, WorkspacePageData } from "@/lib/mock-document";

export interface DocumentViewerProps {
  currentPage: number;
  zoomLevel: number;
  highlightClauseId?: string;
  onClauseClick?: (clauseId: string) => void;
  className?: string;
}

export function DocumentViewer({
  currentPage,
  zoomLevel,
  highlightClauseId = "sec-7.2",
  onClauseClick,
  className,
}: DocumentViewerProps) {
  const pageData: WorkspacePageData = mockDocumentPages[currentPage] || {
    pageNumber: currentPage,
    headerTitle: "RESIDENTIAL RENTAL AGREEMENT",
    sectionTitle: `SECTION ${currentPage}: GENERAL COVENANTS`,
    paragraphs: [
      {
        id: `p${currentPage}-1`,
        sectionNumber: `${currentPage}.1`,
        heading: "Standard Operating Covenant",
        text: "The parties agree to abide by all applicable municipal laws, society regulations, and statutory codes in force within Bengaluru, Karnataka throughout the subsistence of this tenancy deed.",
      },
      {
        id: `p${currentPage}-2`,
        sectionNumber: `${currentPage}.2`,
        heading: "Notice & Delivery Terms",
        text: "Any notice, demand, or official communication under this agreement shall be served in writing via registered post or digital delivery to the addresses stated in Section 2.",
      },
    ],
    footerText: `Residential Rental Agreement · Page ${currentPage} of 12`,
  };

  const scale = zoomLevel / 100;

  return (
    <div
      className={`relative w-full h-full overflow-auto p-3 sm:p-6 flex justify-center bg-[#08080A]/60 rounded-2xl border border-white/[0.06] custom-scrollbar ${
        className || ""
      }`}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          transition: "transform 0.15s ease-out",
        }}
        className="w-full max-w-[700px] shrink-0 my-2"
      >
        {/* Realistic Legal Document Paper Page */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#FAF9F6] text-[#1A1A1A] font-serif rounded-sm shadow-2xl shadow-black/80 border border-amber-950/15 p-8 sm:p-14 min-h-[920px] flex flex-col justify-between select-text"
        >
          {/* Subtle paper texture watermark / official seal stamp on Page 1 & 11 */}
          {(currentPage === 1 || currentPage === 11) && (
            <div className="absolute top-8 right-8 border-2 border-emerald-900/30 rounded-lg p-2 text-center rotate-3 opacity-60 pointer-events-none font-sans">
              <Stamp className="h-6 w-6 text-emerald-800/60 mx-auto mb-0.5" />
              <span className="text-[9px] uppercase tracking-widest text-emerald-900 font-bold block">
                STAMP DUTY PAID
              </span>
              <span className="text-[8px] text-emerald-800/80 font-mono">
                KARNATAKA e-STAMP
              </span>
            </div>
          )}

          {/* Top Document Header */}
          <div className="border-b border-zinc-300/80 pb-4 mb-6">
            <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-widest text-zinc-500 font-semibold mb-2">
              <span>GOVERNMENT OF KARNATAKA LEASE REGISTRY</span>
              <span>REF: BLR/2026/8921</span>
            </div>
            <h2 className="text-center text-lg sm:text-xl font-bold tracking-tight text-zinc-900 uppercase font-serif">
              {pageData.headerTitle}
            </h2>
            <p className="text-center text-xs italic text-zinc-600 mt-1">
              Between Alex Morgan (Lessor) and Jordan Lee (Lessee)
            </p>
          </div>

          {/* Document Body */}
          <div className="flex-1 space-y-6">
            {/* Section Banner */}
            <div className="text-center pb-2">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-800 border-b-2 border-zinc-800 inline-block pb-0.5 font-sans">
                {pageData.sectionTitle}
              </h3>
            </div>

            {/* Paragraphs and Clauses */}
            <div className="space-y-5 text-sm sm:text-[15px] leading-relaxed text-zinc-800">
              {pageData.paragraphs.map((item) => {
                const isItemHighlighted =
                  item.isHighlighted || item.clauseId === highlightClauseId;

                return (
                  <div
                    key={item.id}
                    id={item.clauseId}
                    className={`relative rounded-lg transition-all p-3 -mx-3 ${
                      isItemHighlighted
                        ? "bg-amber-100/70 border-l-4 border-amber-500 shadow-sm"
                        : "hover:bg-zinc-100/50"
                    }`}
                  >
                    {/* Clause Cited Banner / Tooltip if highlighted */}
                    {isItemHighlighted && (
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-violet-600 text-white font-sans text-[10px] font-semibold tracking-wide uppercase">
                          <Sparkles className="h-2.5 w-2.5" />
                          AI Vakil Citation
                        </span>
                        <span className="font-sans text-[11px] text-amber-800 font-semibold">
                          {item.highlightLabel || "Referenced in AI Insights"}
                        </span>
                      </div>
                    )}

                    {/* Section Number & Heading */}
                    {item.heading && (
                      <h4 className="font-bold text-zinc-900 mb-1 flex items-center gap-2">
                        {item.sectionNumber && (
                          <span className="font-sans text-xs text-zinc-500 font-semibold">
                            {item.sectionNumber}
                          </span>
                        )}
                        <span>{item.heading}</span>
                      </h4>
                    )}

                    {/* Paragraph Text with specific highlight for sixty days notice on Page 7 */}
                    <p className="text-justify whitespace-pre-line leading-relaxed">
                      {currentPage === 7 && item.sectionNumber === "7.2" ? (
                        <span>
                          The terminating party shall provide{" "}
                          <mark
                            onClick={() => onClauseClick?.("sec-7.2")}
                            className="bg-amber-300/80 text-zinc-900 font-semibold px-1 py-0.5 rounded cursor-pointer hover:bg-amber-400 transition-colors"
                            title="Click to view AI Analysis for this clause"
                          >
                            sixty (60) days&apos; written notice
                          </mark>{" "}
                          unless otherwise agreed in writing by both parties.
                        </span>
                      ) : (
                        item.text
                      )}
                    </p>

                    {/* Interactive quick action on highlighted clause */}
                    {isItemHighlighted && (
                      <div className="mt-2.5 pt-2 border-t border-amber-300/60 flex items-center justify-between text-xs font-sans">
                        <span className="text-[11px] text-amber-900 flex items-center gap-1">
                          <ShieldAlert className="h-3 w-3 text-amber-600" />
                          Status: May Require Review
                        </span>
                        <button
                          type="button"
                          onClick={() => onClauseClick?.(item.clauseId || "sec-7.2")}
                          className="text-[11px] font-semibold text-violet-700 hover:text-violet-900 hover:underline"
                        >
                          Explain This Clause →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Signature Block on Page 11 */}
            {currentPage === 11 && (
              <div className="pt-10 mt-10 border-t border-zinc-400 font-sans grid grid-cols-2 gap-8 text-xs text-zinc-800">
                <div className="space-y-12">
                  <p className="font-semibold uppercase tracking-wider">
                    LESSOR / LANDLORD:
                  </p>
                  <div>
                    <div className="border-b border-zinc-400 w-40 pb-1 font-serif italic text-zinc-700">
                      Alex Morgan
                    </div>
                    <p className="mt-1 font-semibold">Alex Morgan</p>
                    <p className="text-[11px] text-zinc-500">Date: 12 Jan 2026</p>
                  </div>
                </div>

                <div className="space-y-12">
                  <p className="font-semibold uppercase tracking-wider">
                    LESSEE / TENANT:
                  </p>
                  <div>
                    <div className="border-b border-zinc-400 w-40 pb-1 font-serif italic text-zinc-700">
                      Jordan Lee
                    </div>
                    <p className="mt-1 font-semibold">Jordan Lee</p>
                    <p className="text-[11px] text-zinc-500">Date: 12 Jan 2026</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Document Footer */}
          <div className="pt-6 mt-6 border-t border-zinc-300/80 flex items-center justify-between font-sans text-[11px] text-zinc-500">
            <span className="truncate">{pageData.footerText}</span>
            <span className="font-mono">Page {currentPage} of 12</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

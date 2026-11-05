"use client";

import React from "react";
import {
  FileText,
  Users,
  BookOpen,
  CreditCard,
  CheckSquare,
  Wrench,
  ShieldAlert,
  Scale,
  FileCheck,
  ChevronRight,
  Layers,
} from "lucide-react";
import { mockWorkspaceSections, WorkspaceSection } from "@/lib/mock-document";

export interface DocumentNavigationProps {
  activeSectionId: string;
  activePage: number;
  onSelectSection: (section: WorkspaceSection) => void;
  className?: string;
}

export function DocumentNavigation({
  activeSectionId,
  activePage,
  onSelectSection,
  className,
}: DocumentNavigationProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    FileText,
    Users,
    BookOpen,
    CreditCard,
    CheckSquare,
    Wrench,
    ShieldAlert,
    Scale,
    FileCheck,
  };

  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#0D0D11]/90 backdrop-blur-xl p-4 flex flex-col h-full ${
        className || ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-violet-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Document Index
          </h2>
        </div>
        <span className="text-[11px] text-zinc-500 font-mono">
          9 sections
        </span>
      </div>

      {/* Sections List */}
      <nav className="space-y-1 overflow-y-auto flex-1 pr-1 custom-scrollbar">
        {mockWorkspaceSections.map((section) => {
          const Icon = iconMap[section.iconName] || FileText;
          const isActive =
            activeSectionId === section.id || activePage === section.page;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelectSection(section)}
              className={`w-full text-left flex items-center justify-between p-2.5 rounded-xl text-xs transition-all group select-none ${
                isActive
                  ? "bg-violet-600/15 text-violet-200 border border-violet-500/30 font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                    isActive
                      ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                      : "bg-white/[0.02] border-white/[0.06] text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="truncate">{section.name}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-violet-500/30 text-violet-200"
                      : "bg-white/[0.04] text-zinc-500 group-hover:text-zinc-400"
                  }`}
                >
                  p.{section.page}
                </span>
                <ChevronRight
                  className={`h-3 w-3 transition-transform ${
                    isActive
                      ? "text-violet-400 translate-x-0.5"
                      : "text-zinc-600 group-hover:text-zinc-400"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer hint */}
      <div className="pt-3 mt-2 border-t border-white/[0.06] text-[11px] text-zinc-500 flex items-center justify-between">
        <span>Click to jump to page</span>
        <span className="font-mono text-[10px]">12 Pages total</span>
      </div>
    </div>
  );
}

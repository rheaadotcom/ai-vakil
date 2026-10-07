"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Download,
  MoreVertical,
  Star,
  FileText,
  FileCheck2,
  Clock,
  Sparkles,
  Info,
  Trash2,
  Edit2,
  Check,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from "@/components/ui/dropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { Document } from "@/types";

export interface WorkspaceHeaderProps {
  document: Document;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenDetails: () => void;
  onOpenDelete: () => void;
  onOpenRename: () => void;
  className?: string;
}

export function WorkspaceHeader({
  document: doc,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onOpenDelete,
  onOpenRename,
  className,
}: WorkspaceHeaderProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyShareLink = () => {
    setCopied(true);
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Demo Link Copied", "Workspace link copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportReport = () => {
    toast.info(
      "Report Workspace",
      "Report export and full report workspace will be available in Phase 4C."
    );
  };

  const handleExportDocument = () => {
    toast.info(
      "Export Document",
      "Original document download will be available in the full document workflow."
    );
  };

  const handleGenerateReport = () => {
    toast.info(
      "Generate Report",
      "Report generation workspace coming soon in Phase 4C."
    );
  };

  return (
    <div className={`space-y-3 ${className || ""}`}>
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        {/* Left: Back Link & Document Title */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link
            href="/documents"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors py-1 px-2 rounded-lg hover:bg-white/[0.06]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Documents</span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight">
                  {doc.title}
                </h1>
                <Badge
                  variant="primary"
                  size="sm"
                  className="text-[10px] uppercase font-mono tracking-wider font-semibold py-0.2 px-2"
                >
                  PDF · {doc.pageCount} pages
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Right-Side Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={onToggleFavorite}
            className={`p-2 rounded-xl border transition-all ${
              isFavorite
                ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                : "bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06]"
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Mark as favorite"}
          >
            <Star className={`h-4 w-4 ${isFavorite ? "fill-amber-400" : ""}`} />
          </button>

          {/* Share Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShareOpen(true)}
            leftIcon={<Share2 className="h-3.5 w-3.5" />}
            className="text-xs h-8"
          >
            Share
          </Button>

          {/* Export Dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="h-3.5 w-3.5" />}
                className="text-xs h-8"
              >
                Export
              </Button>
            </DropdownTrigger>
            <DropdownContent align="right" className="w-48">
              <DropdownItem onClick={handleExportReport}>
                <FileCheck2 className="h-3.5 w-3.5 text-violet-400" />
                <span>Export AI Report</span>
              </DropdownItem>
              <DropdownItem onClick={handleExportDocument}>
                <Download className="h-3.5 w-3.5 text-zinc-400" />
                <span>Export Document (PDF)</span>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>

          {/* More Actions Menu */}
          <Dropdown>
            <DropdownTrigger>
              <button
                type="button"
                className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
                aria-label="More options"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownTrigger>
            <DropdownContent align="right" className="w-48">
              <DropdownItem onClick={onOpenDetails}>
                <Info className="h-3.5 w-3.5 text-zinc-400" />
                <span>Document Details</span>
              </DropdownItem>
              <DropdownItem onClick={onOpenRename}>
                <Edit2 className="h-3.5 w-3.5 text-zinc-400" />
                <span>Rename Document</span>
              </DropdownItem>
              <DropdownItem onClick={onToggleFavorite}>
                <Star
                  className={`h-3.5 w-3.5 ${
                    isFavorite ? "fill-amber-400 text-amber-400" : "text-zinc-400"
                  }`}
                />
                <span>{isFavorite ? "Unfavorite" : "Favorite"}</span>
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem destructive onClick={onOpenDelete}>
                <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                <span>Delete Document</span>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>

      {/* Sub-Header Metadata & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 font-medium text-zinc-300">
            <FileText className="h-3.5 w-3.5 text-violet-400" />
            {doc.pageCount} pages
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5 font-medium text-zinc-300">
            <FileCheck2 className="h-3.5 w-3.5 text-emerald-400" />
            {doc.clauseCount} clauses extracted
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="h-3.5 w-3.5 text-zinc-500" />
            Analyzed today
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full text-[11px] font-medium border border-emerald-400/20">
            Ground Truth Citations Active
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleGenerateReport}
            leftIcon={<Sparkles className="h-3.5 w-3.5" />}
            className="text-xs h-7.5"
          >
            Generate Report
          </Button>
          <Button
            variant="subtle"
            size="sm"
            onClick={() => setShareOpen(true)}
            leftIcon={<Share2 className="h-3 w-3 text-zinc-400" />}
            className="text-xs h-7.5"
          >
            Share
          </Button>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-violet-400" />
              <span>Share Document</span>
            </DialogTitle>
            <DialogDescription>
              Document sharing will be available in the full workflow. You can copy this preview link to test the workspace.
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-300 truncate font-mono">
              https://aivakil.com/documents/demo-rental
            </span>
            <Button
              variant="outline"
              size="xs"
              onClick={handleCopyShareLink}
              leftIcon={copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            >
              {copied ? "Copied" : "Copy Link"}
            </Button>
          </div>

          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setShareOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCopyShareLink}>
              Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

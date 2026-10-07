"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Star,
  MoreVertical,
  ExternalLink,
  Edit2,
  Download,
  Trash2,
  FileCode,
  ShieldAlert,
  Clock,
  Layers,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { MockDocument } from "@/lib/mock-documents";

export interface DocumentCardProps {
  document: MockDocument;
  onToggleFavorite: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export function DocumentCard({
  document: doc,
  onToggleFavorite,
  onRename,
  onDelete,
  className,
}: DocumentCardProps) {
  const router = useRouter();
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState(doc.name);

  const isDemoDoc =
    doc.id === "doc-rental-001" ||
    doc.name.toLowerCase().includes("residential rental");

  const handleOpenDocument = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isDemoDoc) {
      router.push("/documents/demo-rental");
    } else {
      toast.info(
        "Workspace Preview Coming Soon",
        `Full legal workspace for "${doc.name}" will be available in Phase 4B.`
      );
    }
  };

  const handleDownload = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    toast.info(
      "Download Available Soon",
      "Download is available in the full document workflow."
    );
  };

  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedName.trim()) {
      onRename(doc.id, editedName.trim());
      setRenameDialogOpen(false);
      toast.success("Document Renamed", `Updated title to "${editedName.trim()}".`);
    }
  };

  const handleConfirmDelete = () => {
    onDelete(doc.id);
    setDeleteDialogOpen(false);
    toast.success("Document Removed", `"${doc.name}" was removed from your library.`);
  };

  return (
    <>
      <Card
        onClick={handleOpenDocument}
        className={`group relative p-5 flex flex-col justify-between transition-all duration-300 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-600/10 cursor-pointer bg-[#0D0D11]/90 backdrop-blur-xl border-white/[0.08] ${
          className || ""
        }`}
      >
        {/* Top Glow on hover */}
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Header: Icon, Type Badge, Star & Menu */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all ${
                  doc.fileType === "PDF"
                    ? "bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover:scale-105"
                    : "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:scale-105"
                }`}
              >
                {doc.fileType === "PDF" ? (
                  <FileText className="h-5 w-5" />
                ) : (
                  <FileCode className="h-5 w-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge
                    variant={doc.fileType === "PDF" ? "destructive" : "primary"}
                    size="sm"
                    className="text-[10px] uppercase font-mono tracking-wider font-semibold py-0.5 px-2"
                  >
                    {doc.fileType}
                  </Badge>
                  <span className="text-xs text-zinc-400 font-medium">
                    {doc.pages} {doc.pages === 1 ? "page" : "pages"}
                  </span>
                  <span className="text-zinc-600 text-xs">·</span>
                  <span className="text-xs text-zinc-500 font-mono">
                    {doc.size}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate max-w-[200px] mt-0.5">
                  {doc.type}
                </p>
              </div>
            </div>

            {/* Favorite & Actions dropdown */}
            <div
              className="flex items-center gap-1 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(doc.id);
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  doc.favorite
                    ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06]"
                }`}
                aria-label={
                  doc.favorite
                    ? `Remove ${doc.name} from favorites`
                    : `Mark ${doc.name} as favorite`
                }
              >
                <Star
                  className={`h-4 w-4 ${
                    doc.favorite ? "fill-amber-400" : ""
                  }`}
                />
              </button>

              <Dropdown>
                <DropdownTrigger>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
                    aria-label={`Actions for ${doc.name}`}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownTrigger>
                <DropdownContent align="right" className="w-44">
                  <DropdownItem onClick={handleOpenDocument}>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Open Document</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => onToggleFavorite(doc.id)}>
                    <Star
                      className={`h-3.5 w-3.5 ${
                        doc.favorite
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-400"
                      }`}
                    />
                    <span>
                      {doc.favorite ? "Unfavorite" : "Favorite"}
                    </span>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setEditedName(doc.name);
                      setRenameDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Rename</span>
                  </DropdownItem>
                  <DropdownItem onClick={handleDownload}>
                    <Download className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Download</span>
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem
                    destructive
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                    <span>Delete</span>
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>
            </div>
          </div>

          {/* Document Title */}
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 group-hover:text-violet-300 transition-colors line-clamp-1 mb-2">
            {doc.name}
          </h3>

          {/* Document Summary snippet if available */}
          {doc.summary && (
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
              {doc.summary}
            </p>
          )}
        </div>

        {/* Footer: Metadata & Status */}
        <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
          {/* Clauses and Attention counts */}
          <div className="flex items-center justify-between text-xs text-zinc-400 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              {doc.clausesCount !== undefined && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-zinc-400">
                  <Layers className="h-3 w-3 text-zinc-500" />
                  {doc.clausesCount} clauses
                </span>
              )}

              {doc.attentionCount !== undefined && doc.attentionCount > 0 && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                  <ShieldAlert className="h-3 w-3" />
                  {doc.attentionCount} {doc.attentionCount === 1 ? "item" : "items"} to review
                </span>
              )}
            </div>

            {/* Last viewed section badge if present */}
            {doc.lastViewedSection && (
              <span className="text-[10px] text-zinc-500 font-mono">
                p.{doc.lastViewedPage} ({doc.lastViewedSection})
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <StatusBadge status={doc.status} size="sm" />
            <div className="flex items-center gap-1 text-[11px] text-zinc-500">
              <Clock className="h-3 w-3" />
              <span>{doc.updatedAt}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent maxWidth="max-w-md">
          <form onSubmit={handleSaveRename}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-violet-400" />
                <span>Rename Document</span>
              </DialogTitle>
              <DialogDescription>
                Update the display title for this legal agreement in your library.
              </DialogDescription>
            </DialogHeader>

            <div className="py-2">
              <label
                htmlFor={`rename-${doc.id}`}
                className="block text-xs font-medium text-zinc-300 mb-1.5"
              >
                Document Title
              </label>
              <Input
                id={`rename-${doc.id}`}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                autoFocus
                placeholder="Enter document title..."
                className="text-sm"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRenameDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!editedName.trim()}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-rose-400">
              <Trash2 className="h-4 w-4" />
              <span>Delete Document</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove &quot;
              <span className="text-zinc-200 font-medium">{doc.name}</span>&quot;
              from your library? This action will remove the local mock record.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleConfirmDelete}
            >
              Delete Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

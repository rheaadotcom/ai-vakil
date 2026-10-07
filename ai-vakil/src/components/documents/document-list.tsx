"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  FileCode,
  Star,
  MoreVertical,
  ExternalLink,
  Edit2,
  Download,
  Trash2,
  Clock,
  ShieldAlert,
} from "lucide-react";
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

export interface DocumentListProps {
  documents: MockDocument[];
  onToggleFavorite: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export function DocumentList({
  documents,
  onToggleFavorite,
  onRename,
  onDelete,
  className,
}: DocumentListProps) {
  const router = useRouter();
  const [activeDocForRename, setActiveDocForRename] = useState<MockDocument | null>(null);
  const [activeDocForDelete, setActiveDocForDelete] = useState<MockDocument | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const handleOpenDoc = (doc: MockDocument, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isDemoDoc =
      doc.id === "doc-rental-001" ||
      doc.name.toLowerCase().includes("residential rental");

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

  const handleStartRename = (doc: MockDocument, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveDocForRename(doc);
    setRenameValue(doc.name);
  };

  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeDocForRename && renameValue.trim()) {
      onRename(activeDocForRename.id, renameValue.trim());
      toast.success(
        "Document Renamed",
        `Updated title to "${renameValue.trim()}".`
      );
      setActiveDocForRename(null);
    }
  };

  const handleConfirmDelete = () => {
    if (activeDocForDelete) {
      onDelete(activeDocForDelete.id);
      toast.success(
        "Document Removed",
        `"${activeDocForDelete.name}" was removed from your library.`
      );
      setActiveDocForDelete(null);
    }
  };

  return (
    <>
      <div
        className={`w-full rounded-2xl border border-white/[0.08] bg-[#0D0D11]/90 backdrop-blur-xl overflow-hidden ${
          className || ""
        }`}
      >
        {/* Table Header (visible on md+) */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3.5 bg-white/[0.02] border-b border-white/[0.06] text-xs font-semibold text-zinc-400">
          <div className="col-span-5 lg:col-span-4">Document</div>
          <div className="col-span-2 lg:col-span-2">Format & Size</div>
          <div className="col-span-2 lg:col-span-2">Status</div>
          <div className="hidden lg:block lg:col-span-2">Updated</div>
          <div className="col-span-3 lg:col-span-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/[0.04]">
          {documents.map((doc, index) => {
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.25) }}
                onClick={(e) => handleOpenDoc(doc, e)}
                className="group p-4 sm:px-6 hover:bg-white/[0.025] transition-colors cursor-pointer flex flex-col md:grid md:grid-cols-12 md:items-center gap-3 sm:gap-4"
              >
                {/* Column: Document info */}
                <div className="md:col-span-5 lg:col-span-4 flex items-center gap-3 min-w-0">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      doc.fileType === "PDF"
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    }`}
                  >
                    {doc.fileType === "PDF" ? (
                      <FileText className="h-4.5 w-4.5" />
                    ) : (
                      <FileCode className="h-4.5 w-4.5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-100 group-hover:text-violet-300 transition-colors truncate">
                        {doc.name}
                      </h4>
                      {doc.attentionCount !== undefined && doc.attentionCount > 0 && (
                        <span className="hidden sm:inline-flex shrink-0 items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">
                          <ShieldAlert className="h-2.5 w-2.5" />
                          {doc.attentionCount} review
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {doc.type}
                    </p>
                  </div>
                </div>

                {/* Column: Format & Pages */}
                <div className="md:col-span-2 lg:col-span-2 flex items-center gap-2 text-xs text-zinc-400">
                  <Badge
                    variant={doc.fileType === "PDF" ? "destructive" : "primary"}
                    size="sm"
                    className="text-[10px] uppercase font-mono tracking-wider font-semibold py-0.2 px-1.5"
                  >
                    {doc.fileType}
                  </Badge>
                  <span className="text-zinc-300 font-medium">
                    {doc.pages}p
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-500 font-mono text-[11px]">
                    {doc.size}
                  </span>
                </div>

                {/* Column: Status */}
                <div className="md:col-span-2 lg:col-span-2 flex items-center">
                  <StatusBadge status={doc.status} size="sm" />
                </div>

                {/* Column: Updated (lg+) */}
                <div className="hidden lg:flex lg:col-span-2 items-center gap-1.5 text-xs text-zinc-400">
                  <Clock className="h-3 w-3 text-zinc-500 shrink-0" />
                  <span className="truncate">{doc.updatedAt}</span>
                </div>

                {/* Column: Actions & Favorite */}
                <div
                  className="md:col-span-3 lg:col-span-2 flex items-center justify-between md:justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.04]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Mobile-only updated timestamp */}
                  <div className="flex lg:hidden items-center gap-1 text-[11px] text-zinc-500">
                    <Clock className="h-3 w-3" />
                    <span>{doc.updatedAt}</span>
                  </div>

                  <div className="flex items-center gap-1">
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
                        <DropdownItem onClick={() => handleOpenDoc(doc)}>
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
                        <DropdownItem onClick={() => handleStartRename(doc)}>
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
                          onClick={() => setActiveDocForDelete(doc)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                          <span>Delete</span>
                        </DropdownItem>
                      </DropdownContent>
                    </Dropdown>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog
        open={Boolean(activeDocForRename)}
        onOpenChange={(open) => !open && setActiveDocForRename(null)}
      >
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
                htmlFor="rename-list-input"
                className="block text-xs font-medium text-zinc-300 mb-1.5"
              >
                Document Title
              </label>
              <Input
                id="rename-list-input"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
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
                onClick={() => setActiveDocForRename(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!renameValue.trim()}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(activeDocForDelete)}
        onOpenChange={(open) => !open && setActiveDocForDelete(null)}
      >
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-rose-400">
              <Trash2 className="h-4 w-4" />
              <span>Delete Document</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove &quot;
              <span className="text-zinc-200 font-medium">
                {activeDocForDelete?.name}
              </span>
              &quot; from your library? This action will remove the local mock record.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setActiveDocForDelete(null)}
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

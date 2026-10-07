"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { MobileNavigation } from "./mobile-navigation";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { ToastProvider, toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, CheckCircle2, Loader2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface UploadModalContextType {
  openUploadModal: () => void;
  closeUploadModal: () => void;
}

export const UploadModalContext = React.createContext<UploadModalContextType>({
  openUploadModal: () => {},
  closeUploadModal: () => {},
});

export function useUploadModal() {
  return React.useContext(UploadModalContext);
}

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadStage, setUploadStage] = useState<
    "idle" | "processing" | "analyzing" | "completed"
  >("idle");
  const [fileName, setFileName] = useState("Residential_Rental_Agreement.pdf");

  const handleOpenUpload = () => {
    setUploadStage("idle");
    setUploadModalOpen(true);
  };

  const handleCloseUpload = () => {
    setUploadModalOpen(false);
    setTimeout(() => setUploadStage("idle"), 200);
  };

  const handleStartMockUpload = (customName?: string) => {
    if (customName) setFileName(customName);
    setUploadStage("processing");

    // Stage 1: Processing text
    setTimeout(() => {
      setUploadStage("analyzing");

      // Stage 2: AI analyzing & chunking
      setTimeout(() => {
        setUploadStage("completed");
        toast.success(
          "Document Analyzed Successfully",
          "Residential Rental Agreement is ready for legal inspection."
        );
      }, 900);
    }, 800);
  };

  return (
    <ToastProvider>
      <UploadModalContext.Provider
        value={{
          openUploadModal: handleOpenUpload,
          closeUploadModal: handleCloseUpload,
        }}
      >
        <div className="relative min-h-screen bg-[#070707] text-[#F8F7FB] flex flex-col antialiased selection:bg-violet-500/30 selection:text-white">
          {/* Ambient lighting mesh */}
          <AmbientBackground />

          <div className="flex h-screen overflow-hidden">
            {/* Desktop Fixed Sidebar */}
            <div className="hidden lg:flex shrink-0">
              <Sidebar onUploadClick={handleOpenUpload} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              {/* Top Navigation */}
              <TopBar
                onMenuToggle={() => setMobileNavOpen(true)}
                onUploadClick={handleOpenUpload}
              />

              {/* Scrollable Viewport */}
              <main className="flex-1 pb-16">{children}</main>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <MobileNavigation
            open={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
            onUploadClick={handleOpenUpload}
          />

          {/* Upload Document Interactive Mock Modal */}
          <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
            <DialogContent maxWidth="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-zinc-100">
                  <UploadCloud className="h-5 w-5 text-violet-400" />
                  <span>Upload Legal Document</span>
                </DialogTitle>
                <DialogDescription>
                  Upload your contract, lease deed, or commercial agreement for automated AI analysis.
                </DialogDescription>
              </DialogHeader>

              {uploadStage === "idle" && (
                <div
                  onClick={() => handleStartMockUpload("Residential_Rental_Agreement.pdf")}
                  className="border-2 border-dashed border-white/10 hover:border-violet-500/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white/[0.015] hover:bg-violet-500/[0.03] transition-all cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-200 mb-1">
                    Drop your PDF or DOCX file here
                  </p>
                  <p className="text-[11px] text-zinc-500 mb-3">
                    Supports Indian legal agreements up to 50 MB
                  </p>
                  <span className="text-[11px] font-medium text-violet-400 group-hover:underline">
                    Click to browse files or try demo agreement
                  </span>
                </div>
              )}

              {uploadStage === "processing" && (
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-4">
                  <div className="h-12 w-12 mx-auto rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-zinc-200">
                      Processing Document...
                    </h4>
                    <p className="text-[11px] text-zinc-400 truncate max-w-xs mx-auto">
                      Extracting text, sections, and page coordinates for {fileName}
                    </p>
                  </div>
                  <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-violet-500 h-1.5 rounded-full w-1/2 transition-all duration-500" />
                  </div>
                </div>
              )}

              {uploadStage === "analyzing" && (
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-4">
                  <div className="h-12 w-12 mx-auto rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Sparkles className="h-6 w-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-zinc-200">
                      AI Analyzing Clauses...
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Identifying covenants, financial terms, and compliance obligations
                    </p>
                  </div>
                  <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-1.5 rounded-full w-5/6 transition-all duration-500" />
                  </div>
                </div>
              )}

              {uploadStage === "completed" && (
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4">
                  <div className="h-12 w-12 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-emerald-300">
                      Analysis Completed!
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      24 clauses extracted and categorized across 12 pages.
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter>
                {uploadStage === "idle" && (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleCloseUpload}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartMockUpload("Residential_Rental_Agreement.pdf")}
                    >
                      Select File
                    </Button>
                  </>
                )}
                {uploadStage === "completed" && (
                  <>
                    <Button variant="ghost" size="sm" onClick={handleCloseUpload}>
                      Close
                    </Button>
                    <Link href="/documents/demo-rental" onClick={handleCloseUpload}>
                      <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                        Open in Workspace
                      </Button>
                    </Link>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </UploadModalContext.Provider>
    </ToastProvider>
  );
}

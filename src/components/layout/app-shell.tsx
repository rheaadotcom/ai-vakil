"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { MobileNavigation } from "./mobile-navigation";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { ToastProvider } from "@/components/ui/toast";
import { UploadDocumentModal } from "@/components/documents/upload-document-modal";

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

  const handleOpenUpload = () => setUploadModalOpen(true);
  const handleCloseUpload = () => setUploadModalOpen(false);

  return (
    <ToastProvider>
      <UploadModalContext.Provider
        value={{
          openUploadModal: handleOpenUpload,
          closeUploadModal: handleCloseUpload,
        }}
      >
        <div className="relative flex min-h-screen flex-col bg-[#070707] text-[#F8F7FB] antialiased selection:bg-violet-500/30 selection:text-white">
          <AmbientBackground />

          <div className="flex h-screen overflow-hidden">
            <div className="hidden shrink-0 lg:flex">
              <Sidebar onUploadClick={handleOpenUpload} />
            </div>

            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
              <TopBar
                onMenuToggle={() => setMobileNavOpen(true)}
                onUploadClick={handleOpenUpload}
              />
              <main className="flex-1 pb-16">{children}</main>
            </div>
          </div>

          <MobileNavigation
            open={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
            onUploadClick={handleOpenUpload}
          />
        </div>

        <UploadDocumentModal
          open={uploadModalOpen}
          onOpenChange={setUploadModalOpen}
        />
      </UploadModalContext.Provider>
    </ToastProvider>
  );
}

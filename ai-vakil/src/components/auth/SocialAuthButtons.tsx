"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function SocialAuthButtons() {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedProvider, setSelectedProvider] = React.useState<"Google" | "GitHub">("Google");

  const handleSocialClick = (provider: "Google" | "GitHub") => {
    setSelectedProvider(provider);
    setShowModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {/* Google Button */}
        <button
          type="button"
          onClick={() => handleSocialClick("Google")}
          className="flex items-center justify-center gap-2.5 h-11 px-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-200 hover:text-white text-xs font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          aria-label="Continue with Google"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* GitHub Button */}
        <button
          type="button"
          onClick={() => handleSocialClick("GitHub")}
          className="flex items-center justify-center gap-2.5 h-11 px-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-200 hover:text-white text-xs font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          aria-label="Continue with GitHub"
        >
          <svg
            className="h-4 w-4 fill-current text-zinc-200"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>

      {/* Prototype Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <div className="h-10 w-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <DialogTitle>Social Authentication</DialogTitle>
            <DialogDescription>
              Social authentication will be connected in the next version.
            </DialogDescription>
          </DialogHeader>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 leading-relaxed">
            <span className="font-semibold text-zinc-100">{selectedProvider} Single Sign-On</span> is scheduled for the upcoming milestone alongside Supabase OAuth configuration. For this prototype, please sign in with your email address.
          </div>

          <DialogFooter>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowModal(false)}
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

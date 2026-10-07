"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AuthInput } from "./AuthInput";
import { Button } from "@/components/ui/button";
import { KeyRound, Mail, AlertCircle } from "lucide-react";

export interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultEmail?: string;
}

export function ForgotPasswordModal({
  open,
  onOpenChange,
  defaultEmail = "",
}: ForgotPasswordModalProps) {
  const [email, setEmail] = React.useState(defaultEmail);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  // Sync default email if provided
  React.useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail);
    }
  }, [defaultEmail]);

  // Reset internal state when dialog closes
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSubmitted(false);
        setError(null);
        setIsSubmitting(false);
      }, 200);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email address is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // Simulate brief network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-md">
        <DialogHeader>
          <div className="h-10 w-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-2">
            <KeyRound className="h-5 w-5" />
          </div>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Enter your email and we&apos;ll send you a password reset link.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="space-y-4 py-2">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-violet-500/10 border border-violet-500/25 text-left">
              <AlertCircle className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-zinc-100">
                  Prototype Notice
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Password reset is available when authentication is connected.
                </p>
                <p className="text-[11px] text-zinc-400 pt-1">
                  Target address: <span className="text-violet-300 font-mono">{email}</span>
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <AuthInput
              label="Email address"
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              error={error || undefined}
              leftIcon={<Mail className="h-4 w-4 text-zinc-400" />}
              autoComplete="email"
              autoFocus
              required
            />

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

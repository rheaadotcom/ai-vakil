"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

export interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordModal({
  open,
  onOpenChange,
}: ForgotPasswordModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-md">
        <DialogHeader>
          <div className="h-10 w-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-2">
            <KeyRound className="h-5 w-5" />
          </div>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Password reset is not enabled yet. No email has been sent.
          </DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { SecurityState } from "@/types/settings";
import { ArrowUpRight, KeyRound, Lock, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";

export interface SecuritySettingsProps {
  security: SecurityState;
  onRequestExport: () => void;
  onClearActivity: () => void;
  onDeleteAccount: () => void;
}

export function SecuritySettings({ security, onRequestExport, onClearActivity, onDeleteAccount }: SecuritySettingsProps) {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [twoFactorOpen, setTwoFactorOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0B0C10]/80 p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-zinc-100">Security</h2>
        <p className="text-xs text-zinc-400">Manage access controls for this demo workspace.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div>
            <p className="text-sm font-medium text-zinc-200">Password</p>
            <p className="text-xs text-zinc-400">{security.passwordStatus}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setPasswordOpen(true)} leftIcon={<KeyRound className="h-3.5 w-3.5" />}>
            Change password
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div>
            <p className="text-sm font-medium text-zinc-200">Two-factor authentication</p>
            <p className="text-xs text-zinc-400">
              {security.twoFactorEnabled ? "Authentication is enabled in demo mode." : "Not enabled in this demo."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={security.twoFactorEnabled ? "success" : "outline"} size="sm">
              {security.twoFactorEnabled ? "Enabled" : "Disabled"}
            </Badge>
            <Button variant="outline" size="sm" onClick={() => setTwoFactorOpen(true)} leftIcon={<ShieldCheck className="h-3.5 w-3.5" />}>
              Manage 2FA
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-zinc-200">Active sessions</p>
            <Badge variant="secondary" size="sm">{security.activeSessions.length} devices</Badge>
          </div>
          <div className="space-y-2">
            {security.activeSessions.map((session) => (
              <div key={`${session.device}-${session.location}`} className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.04] bg-[#0D0D12]/80 p-2.5">
                <div>
                  <p className="text-xs font-medium text-zinc-200">{session.device}</p>
                  <p className="text-[11px] text-zinc-400">{session.location}</p>
                </div>
                <span className="text-[11px] text-zinc-500">{session.lastSeen}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div>
            <p className="text-sm font-medium text-zinc-200">Data export</p>
            <p className="text-xs text-zinc-400">{security.exportStatus}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onRequestExport} leftIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
            Export data
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div>
            <p className="text-sm font-medium text-zinc-200">Activity log</p>
            <p className="text-xs text-zinc-400">{security.clearActivityStatus}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClearActivity} leftIcon={<Lock className="h-3.5 w-3.5" />}>
            Clear activity
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
          <div>
            <p className="text-sm font-medium text-rose-200">Delete account</p>
            <p className="text-xs text-rose-300/80">This is a demo-only destructive action.</p>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)} leftIcon={<Trash2 className="h-3.5 w-3.5" />}>
            Delete account
          </Button>
        </div>
      </div>

      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>Backend authentication is not connected yet. This action is demo-only.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input type="password" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm new password" />
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row">
            <Button variant="outline" onClick={() => setPasswordOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setPasswordOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={twoFactorOpen} onOpenChange={setTwoFactorOpen}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle>Two-factor authentication</DialogTitle>
            <DialogDescription>Available in the full workflow. This is a demo-only configuration.</DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-dashed border-white/[0.08] bg-[#0D0D12] p-4 text-sm text-zinc-300">
            Use an authenticator app to secure this workspace when the backend is connected.
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row">
            <Button variant="outline" onClick={() => setTwoFactorOpen(false)}>Close</Button>
            <Button variant="primary" onClick={() => setTwoFactorOpen(false)}>Enable 2FA</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-rose-200">Delete account</DialogTitle>
            <DialogDescription>Demo-only action. No real account deletion occurs in this prototype.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-zinc-300">Type <span className="font-semibold text-white">DELETE</span> to continue.</p>
            <Input value={deleteInput} onChange={(event) => setDeleteInput(event.target.value)} placeholder="DELETE" />
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" disabled={deleteInput !== "DELETE"} onClick={() => { setDeleteOpen(false); setDeleteInput(""); onDeleteAccount(); }}>
              Delete account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

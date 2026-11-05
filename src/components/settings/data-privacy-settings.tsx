import { Button } from "@/components/ui/button";

export function DataPrivacySettings({
  onExportData,
  onClearActivity,
}: {
  onExportData: () => void;
  onClearActivity: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0B0C10]/80 p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-zinc-100">Data & Privacy</h2>
        <p className="text-xs text-zinc-400">Review the demo-only handling of your legal work and activity.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div>
            <p className="text-sm font-medium text-zinc-200">Client data</p>
            <p className="text-xs text-zinc-400">Demo-only behavior. Backend data handling is not connected yet.</p>
          </div>
          <Button variant="outline" size="sm" onClick={onExportData}>Export records</Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div>
            <p className="text-sm font-medium text-zinc-200">Activity history</p>
            <p className="text-xs text-zinc-400">Clear the local demo trail without affecting any real backend records.</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClearActivity}>Clear activity</Button>
        </div>
      </div>
    </div>
  );
}

import type { NotificationPreferences } from "@/types/settings";

export interface NotificationSettingsProps {
  settings: NotificationPreferences;
  onToggle: (key: keyof NotificationPreferences, value: boolean) => void;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
        checked ? "border-violet-500/50 bg-violet-500/25" : "border-white/[0.12] bg-white/[0.04]",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-4 w-4 rounded-full bg-white transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}

export function NotificationSettings({ settings, onToggle }: NotificationSettingsProps) {
  const rows: Array<{ key: keyof NotificationPreferences; label: string; description: string }> = [
    { key: "documentUpdates", label: "Document updates", description: "Alerts when legal documents are changed or analyzed." },
    { key: "clauseAlerts", label: "Clause alerts", description: "Notifies you when new risks or changes are detected." },
    { key: "deadlineReminders", label: "Deadline reminders", description: "Prompt reminders for key dates and obligations." },
    { key: "weeklyDigest", label: "Weekly digest", description: "A summary of high-priority legal insights for the week." },
    { key: "marketingEmails", label: "Product updates", description: "Demo-only updates for the AI Vakil product experience." },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0B0C10]/80 p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-zinc-100">Notifications</h2>
        <p className="text-xs text-zinc-400">Control how the workspace surfaces important legal updates.</p>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div>
              <p className="text-sm font-medium text-zinc-200">{row.label}</p>
              <p className="text-xs text-zinc-400">{row.description}</p>
            </div>
            <Toggle checked={settings[row.key]} onChange={(checked) => onToggle(row.key, checked)} />
          </div>
        ))}
      </div>
    </div>
  );
}

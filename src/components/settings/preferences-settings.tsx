import { Button } from "@/components/ui/button";
import type { Preferences } from "@/types/settings";

export interface PreferencesSettingsProps {
  preferences: Preferences;
  onChange: (next: Preferences) => void;
  onReset: () => void;
}

const selectClassName =
  "w-full rounded-xl border border-white/[0.08] bg-[#0D0D12] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-violet-500/50";

export function PreferencesSettings({ preferences, onChange, onReset }: PreferencesSettingsProps) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0B0C10]/80 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-zinc-100">Preferences</h2>
          <p className="text-xs text-zinc-400">Tune the workspace behavior for your demo workflow.</p>
        </div>
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset Preferences
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-xs text-zinc-300">
          <span>Theme</span>
          <select
            className={selectClassName}
            value={preferences.theme}
            onChange={(event) => onChange({ ...preferences, theme: event.target.value as Preferences["theme"] })}
          >
            <option value="Dark">Dark</option>
            <option value="Light">Light</option>
            <option value="System">System</option>
          </select>
        </label>

        <label className="space-y-2 text-xs text-zinc-300">
          <span>Language</span>
          <select
            className={selectClassName}
            value={preferences.language}
            onChange={(event) => onChange({ ...preferences, language: event.target.value as Preferences["language"] })}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
          </select>
        </label>

        <label className="space-y-2 text-xs text-zinc-300">
          <span>Date format</span>
          <select
            className={selectClassName}
            value={preferences.dateFormat}
            onChange={(event) => onChange({ ...preferences, dateFormat: event.target.value as Preferences["dateFormat"] })}
          >
            <option value="DD MMM YYYY">DD MMM YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="MMM DD, YYYY">MMM DD, YYYY</option>
          </select>
        </label>

        <label className="space-y-2 text-xs text-zinc-300">
          <span>Default landing page</span>
          <select
            className={selectClassName}
            value={preferences.defaultLandingPage}
            onChange={(event) => onChange({ ...preferences, defaultLandingPage: event.target.value as Preferences["defaultLandingPage"] })}
          >
            <option value="Dashboard">Dashboard</option>
            <option value="Documents">Documents</option>
            <option value="Chat">Chat</option>
            <option value="Clauses">Clauses</option>
            <option value="Insights">Insights</option>
          </select>
        </label>

        <label className="space-y-2 text-xs text-zinc-300 md:col-span-2">
          <span>Response style</span>
          <select
            className={selectClassName}
            value={preferences.responseStyle}
            onChange={(event) => onChange({ ...preferences, responseStyle: event.target.value as Preferences["responseStyle"] })}
          >
            <option value="Balanced">Balanced</option>
            <option value="Conservative">Conservative</option>
            <option value="Detailed">Detailed</option>
          </select>
        </label>
      </div>
    </div>
  );
}

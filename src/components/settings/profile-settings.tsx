import { Input } from "@/components/ui/input";
import type { ProfileSettings } from "@/types/settings";

export interface ProfileSettingsProps {
  profile: ProfileSettings;
  onChange: (next: ProfileSettings) => void;
}

export function ProfileSettings({ profile, onChange }: ProfileSettingsProps) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0B0C10]/80 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-zinc-100">Profile</h2>
          <p className="text-xs text-zinc-400">Your workspace identity and account details.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-xs text-zinc-300">
          <span>Full name</span>
          <Input
            value={profile.name}
            onChange={(event) => onChange({ ...profile, name: event.target.value })}
          />
        </label>
        <label className="space-y-2 text-xs text-zinc-300">
          <span>Role</span>
          <Input
            value={profile.role}
            onChange={(event) => onChange({ ...profile, role: event.target.value })}
          />
        </label>
        <label className="space-y-2 text-xs text-zinc-300 md:col-span-2">
          <span>Email</span>
          <Input
            type="email"
            value={profile.email}
            onChange={(event) => onChange({ ...profile, email: event.target.value })}
          />
        </label>
        <label className="space-y-2 text-xs text-zinc-300">
          <span>Phone</span>
          <Input
            value={profile.phone}
            onChange={(event) => onChange({ ...profile, phone: event.target.value })}
          />
        </label>
        <label className="space-y-2 text-xs text-zinc-300">
          <span>Timezone</span>
          <Input
            value={profile.timezone}
            onChange={(event) => onChange({ ...profile, timezone: event.target.value })}
          />
        </label>
        <label className="space-y-2 text-xs text-zinc-300 md:col-span-2">
          <span>Law firm</span>
          <Input
            value={profile.lawFirm}
            onChange={(event) => onChange({ ...profile, lawFirm: event.target.value })}
          />
        </label>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import type { SettingsSection } from "@/lib/mock-settings";

const navigationItems: Array<{ id: SettingsSection; label: string }> = [
  { id: "profile", label: "Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "notifications", label: "Notifications" },
  { id: "ai", label: "AI Preferences" },
  { id: "documents", label: "Documents" },
  { id: "security", label: "Security" },
  { id: "privacy", label: "Data & Privacy" },
];

export interface SettingsNavigationProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

export function SettingsNavigation({ activeSection, onSectionChange }: SettingsNavigationProps) {
  return (
    <nav aria-label="Settings sections" className="w-full">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "shrink-0 rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
              activeSection === item.id
                ? "border-violet-500/30 bg-violet-500/10 text-violet-200"
                : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.12] hover:text-zinc-200"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Save } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import {
  AIPreferencesSettings,
  DataPrivacySettings,
  DocumentSettings,
  NotificationSettings,
  PreferencesSettings,
  ProfileSettings,
  SecuritySettings,
  SettingsNavigation,
  ResetPreferencesDialog,
} from "@/components/settings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { defaultSettings } from "@/lib/mock-settings";
import type { SettingsSection } from "@/lib/mock-settings";
import type { SettingsState } from "@/types/settings";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const updateProfile = (profile: SettingsState["profileSettings"]) => {
    setSettings((prev) => ({ ...prev, profileSettings: profile }));
  };

  const updatePreferences = (preferences: SettingsState["preferences"]) => {
    setSettings((prev) => ({ ...prev, preferences }));
  };

  const updateNotificationSettings = (key: keyof SettingsState["notificationSettings"], value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [key]: value,
      },
    }));
  };

  const updateAIPreferences = (key: keyof SettingsState["aiPreferences"], value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      aiPreferences: {
        ...prev.aiPreferences,
        [key]: value,
      },
    }));
  };

  const updateDocumentPreferences = (key: keyof SettingsState["documentPreferences"], value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      documentPreferences: {
        ...prev.documentPreferences,
        [key]: value,
      },
    }));
  };

  const resetPreferences = () => {
    setSettings((prev) => ({
      ...prev,
      preferences: defaultSettings.preferences,
      notificationSettings: defaultSettings.notificationSettings,
      aiPreferences: defaultSettings.aiPreferences,
      documentPreferences: defaultSettings.documentPreferences,
    }));
    toast.success("Preferences reset.");
  };

  const handleSaveChanges = () => {
    toast.success("Settings saved locally.", "Demo-only settings were updated in the current UI state.");
  };

  const handleExportData = () => {
    toast.info("Export is available in the full workflow.", "This prototype only shows a mock export interaction.");
  };

  const handleClearActivity = () => {
    toast.info("Demo activity cleared.", "This refreshes the current local activity view only.");
  };

  const handleDeleteAccount = () => {
    toast.warning("Account deletion is not connected yet.", "Backend authentication is not connected yet.");
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings profile={settings.profileSettings} onChange={updateProfile} />;
      case "preferences":
        return (
          <PreferencesSettings
            preferences={settings.preferences}
            onChange={updatePreferences}
            onReset={() => setResetDialogOpen(true)}
          />
        );
      case "notifications":
        return <NotificationSettings settings={settings.notificationSettings} onToggle={updateNotificationSettings} />;
      case "ai":
        return <AIPreferencesSettings settings={settings.aiPreferences} onToggle={updateAIPreferences} />;
      case "documents":
        return <DocumentSettings settings={settings.documentPreferences} onToggle={updateDocumentPreferences} />;
      case "security":
        return (
          <SecuritySettings
            security={settings.securityState}
            onRequestExport={handleExportData}
            onClearActivity={handleClearActivity}
            onDeleteAccount={handleDeleteAccount}
          />
        );
      case "privacy":
        return <DataPrivacySettings onExportData={handleExportData} onClearActivity={handleClearActivity} />;
      default:
        return null;
    }
  };

  return (
    <AppShell>
      <PageContainer
        maxWidth="wide"
        title="Workspace settings"
        description="Manage your profile, AI preferences, review defaults, security, and privacy settings for this demo workspace."
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              {settings.planUsage.plan}
            </Badge>
            <Button variant="primary" size="sm" leftIcon={<Save className="h-3.5 w-3.5" />} onClick={handleSaveChanges}>
              Save changes
            </Button>
          </div>
        }
      >
        <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="rounded-[26px] border border-white/[0.08] bg-[#0B0C10]/80 p-3 sm:p-4">
            <div className="mb-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Workspace</p>
              <p className="mt-1 text-sm font-semibold text-zinc-200">Account settings</p>
            </div>
            <SettingsNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-4"
            >
              {renderSectionContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </PageContainer>

      <ResetPreferencesDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        onConfirm={resetPreferences}
      />
    </AppShell>
  );
}

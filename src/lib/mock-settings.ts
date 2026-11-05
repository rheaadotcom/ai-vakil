import type {
  AIPreferences,
  DocumentPreferences,
  NotificationPreferences,
  PlanUsage,
  Preferences,
  ProfileSettings,
  SecurityState,
  SettingsState,
  Theme,
} from "@/types/settings";

export const profileSettings: ProfileSettings = {
  name: "Aarav Shah",
  email: "aarav@aivakil.ai",
  phone: "+91 98765 43210",
  timezone: "Asia/Kolkata",
  lawFirm: "Shah & Co. Legal",
  role: "Senior Counsel",
};

export const planUsage: PlanUsage = {
  plan: "Professional",
  seatLimit: 5,
  usedSeats: 4,
  storageLimit: "20 GB",
  storageUsed: "12.4 GB",
  storagePercent: 62,
};

export const preferences: Preferences = {
  theme: "Dark" as Theme,
  language: "English",
  dateFormat: "DD MMM YYYY",
  defaultLandingPage: "Dashboard",
  responseStyle: "Balanced",
};

export const notificationSettings: NotificationPreferences = {
  documentUpdates: true,
  clauseAlerts: true,
  deadlineReminders: true,
  weeklyDigest: false,
  marketingEmails: false,
};

export const aiPreferences: AIPreferences = {
  citations: true,
  suggestedQuestions: true,
  explainClauses: true,
  responseStyle: "Balanced",
};

export const documentPreferences: DocumentPreferences = {
  defaultLandingPage: "Dashboard",
  sourceHighlighting: true,
  clauseComparison: true,
  autoSaveDrafts: true,
};

export const securityState: SecurityState = {
  passwordStatus: "Available in the full workflow.",
  twoFactorEnabled: true,
  activeSessions: [
    { device: "MacBook Pro", location: "Bengaluru, IN", lastSeen: "2 mins ago" },
    { device: "iPhone 15", location: "Mumbai, IN", lastSeen: "1 hour ago" },
    { device: "Windows Laptop", location: "New Delhi, IN", lastSeen: "Yesterday" },
  ],
  exportStatus: "Demo-only behavior.",
  clearActivityStatus: "Demo-only behavior.",
};

export const defaultSettings: SettingsState = {
  profileSettings,
  planUsage,
  preferences,
  notificationSettings,
  aiPreferences,
  documentPreferences,
  securityState,
};

export const settingsSections = [
  { id: "profile", label: "Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "notifications", label: "Notifications" },
  { id: "ai", label: "AI Preferences" },
  { id: "documents", label: "Documents" },
  { id: "security", label: "Security" },
  { id: "privacy", label: "Data & Privacy" },
] as const;

export type SettingsSection = (typeof settingsSections)[number]["id"];

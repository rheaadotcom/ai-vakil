export type Theme = "Dark" | "Light" | "System";
export type ResponseStyle = "Balanced" | "Conservative" | "Detailed";
export type DateFormat = "DD MMM YYYY" | "YYYY-MM-DD" | "MMM DD, YYYY";
export type DefaultView = "Dashboard" | "Documents" | "Chat" | "Clauses" | "Insights";
export type Language = "English" | "Hindi" | "Tamil";

export interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
  timezone: string;
  lawFirm: string;
  role: string;
}

export interface PlanUsage {
  plan: string;
  seatLimit: number;
  usedSeats: number;
  storageLimit: string;
  storageUsed: string;
  storagePercent: number;
}

export interface Preferences {
  theme: Theme;
  language: Language;
  dateFormat: DateFormat;
  defaultLandingPage: DefaultView;
  responseStyle: ResponseStyle;
}

export interface NotificationPreferences {
  documentUpdates: boolean;
  clauseAlerts: boolean;
  deadlineReminders: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

export interface AIPreferences {
  citations: boolean;
  suggestedQuestions: boolean;
  explainClauses: boolean;
  responseStyle: ResponseStyle;
}

export interface DocumentPreferences {
  defaultLandingPage: DefaultView;
  sourceHighlighting: boolean;
  clauseComparison: boolean;
  autoSaveDrafts: boolean;
}

export interface SecurityState {
  passwordStatus: string;
  twoFactorEnabled: boolean;
  activeSessions: Array<{
    device: string;
    location: string;
    lastSeen: string;
  }>;
  exportStatus: string;
  clearActivityStatus: string;
}

export interface SettingsState {
  profileSettings: ProfileSettings;
  planUsage: PlanUsage;
  preferences: Preferences;
  notificationSettings: NotificationPreferences;
  aiPreferences: AIPreferences;
  documentPreferences: DocumentPreferences;
  securityState: SecurityState;
}

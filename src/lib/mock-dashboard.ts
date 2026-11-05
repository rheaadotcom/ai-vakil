export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  initials: string;
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  context: string;
  iconName: "FileText" | "MessageSquare" | "FileCheck" | "Calendar";
  trend?: string;
}

export interface ContinueDocument {
  id: string;
  title: string;
  fileType: "PDF" | "DOCX";
  pageCount: number;
  lastViewed: string;
  status: "Analyzed" | "Processing" | "Needs Review";
  href: string;
  pageNumber: number;
  previewSnippet: string;
  riskScore: number;
}

export interface RecentDocItem {
  id: string;
  title: string;
  type: string;
  pages: number;
  lastAnalyzed: string;
  status: "Analyzed" | "Processing" | "Needs Review";
  href: string;
  fileFormat: "PDF" | "DOCX";
}

export interface AttentionItem {
  id: string;
  title: string;
  description: string;
  source: string;
  pageNumber: number;
  status: "May Require Review";
  clauseRef: string;
  href: string;
}

export interface UpcomingDateItem {
  id: string;
  date: string;
  dayMonth: string;
  year: string;
  title: string;
  description: string;
  source: string;
  clauseRef: string;
  pageNumber: number;
  href: string;
  isCritical?: boolean;
}

export interface SuggestedQuestion {
  id: string;
  question: string;
  category: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
  type: "document" | "date" | "insight";
  documentName?: string;
  href: string;
}

export const mockUserProfile: UserProfile = {
  name: "Riya Bhardwaj",
  email: "demo@aivakil.com",
  role: "General Counsel & Legal Lead",
  initials: "RB",
};

export const mockDashboardStats: StatItem[] = [
  {
    id: "stat-docs",
    number: "12",
    label: "Documents",
    context: "+2 added this month",
    iconName: "FileText",
  },
  {
    id: "stat-qa",
    number: "48",
    label: "Questions Asked",
    context: "14 today across 3 docs",
    iconName: "MessageSquare",
  },
  {
    id: "stat-clauses",
    number: "27",
    label: "Important Clauses",
    context: "4 flagged for review",
    iconName: "FileCheck",
  },
  {
    id: "stat-dates",
    number: "08",
    label: "Upcoming Dates",
    context: "Next: 12 Oct 2026",
    iconName: "Calendar",
  },
];

export const mockContinueDocument: ContinueDocument = {
  id: "doc-rental-001",
  title: "Residential Rental Agreement",
  fileType: "PDF",
  pageCount: 12,
  lastViewed: "Termination — Page 7",
  status: "Analyzed",
  href: "/documents/demo-rental?page=7",
  pageNumber: 7,
  previewSnippet:
    "Clause 7.2: Termination by Notice — Either party may terminate this tenancy by serving 60 (sixty) days prior written notice. If lessee vacates prior to the 6-month lock-in expiry, security deposit shall be forfeit.",
  riskScore: 42,
};

export const mockRecentDocuments: RecentDocItem[] = [
  {
    id: "rec-1",
    title: "Residential Rental Agreement",
    type: "Lease Deed · Indiranagar",
    pages: 12,
    lastAnalyzed: "Today, 10:45 AM",
    status: "Analyzed",
    href: "/documents/demo-rental",
    fileFormat: "PDF",
  },
  {
    id: "rec-2",
    title: "Employment Agreement",
    type: "Full-Time Employment Contract",
    pages: 18,
    lastAnalyzed: "Yesterday, 4:20 PM",
    status: "Analyzed",
    href: "/documents/demo-rental",
    fileFormat: "PDF",
  },
  {
    id: "rec-3",
    title: "Non-Disclosure Agreement",
    type: "Mutual Commercial NDA",
    pages: 6,
    lastAnalyzed: "3 days ago",
    status: "Needs Review",
    href: "/documents/demo-rental",
    fileFormat: "DOCX",
  },
  {
    id: "rec-4",
    title: "Freelance Service Agreement",
    type: "Master Services Contract",
    pages: 9,
    lastAnalyzed: "Just now",
    status: "Processing",
    href: "/documents/demo-rental",
    fileFormat: "PDF",
  },
];

export const mockAttentionItems: AttentionItem[] = [
  {
    id: "att-1",
    title: "Early Termination",
    description:
      "The agreement contains provisions concerning termination before the stated end date.",
    source: "Page 7",
    clauseRef: "Clause 7.2",
    pageNumber: 7,
    status: "May Require Review",
    href: "/documents/demo-rental?page=7",
  },
  {
    id: "att-2",
    title: "Security Deposit",
    description:
      "The agreement specifies conditions relating to the ₹60,000 security deposit.",
    source: "Page 9",
    clauseRef: "Clause 9.1",
    pageNumber: 9,
    status: "May Require Review",
    href: "/documents/demo-rental?page=9",
  },
  {
    id: "att-3",
    title: "Notice Requirement",
    description:
      "A 60-day written notice requirement appears in the termination provisions.",
    source: "Page 7",
    clauseRef: "Clause 7.1",
    pageNumber: 7,
    status: "May Require Review",
    href: "/documents/demo-rental?page=7",
  },
];

export const mockUpcomingDates: UpcomingDateItem[] = [
  {
    id: "date-1",
    date: "12 Oct 2026",
    dayMonth: "12 Oct",
    year: "2026",
    title: "Notice Deadline",
    description: "60-day written notice window opens to terminate or renew lease.",
    source: "Page 7",
    clauseRef: "Clause 7.2",
    pageNumber: 7,
    href: "/documents/demo-rental?page=7",
    isCritical: true,
  },
  {
    id: "date-2",
    date: "11 Dec 2026",
    dayMonth: "11 Dec",
    year: "2026",
    title: "Agreement End",
    description: "11-month lease tenure concludes. Key handover & inspection required.",
    source: "Page 2",
    clauseRef: "Clause 2.2",
    pageNumber: 2,
    href: "/documents/demo-rental?page=2",
    isCritical: false,
  },
];

export const mockSuggestedQuestions: SuggestedQuestion[] = [
  {
    id: "q-1",
    question: "Can I terminate my rental agreement early?",
    category: "Termination",
  },
  {
    id: "q-2",
    question: "What happens to my security deposit?",
    category: "Financials",
  },
  {
    id: "q-3",
    question: "When does my agreement end?",
    category: "Timeline",
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Document analysis completed",
    description: "Residential Rental Agreement has been analyzed across 24 clauses.",
    documentName: "Residential Rental Agreement",
    timestamp: "12m ago",
    unread: true,
    type: "document",
    href: "/documents/demo-rental",
  },
  {
    id: "notif-2",
    title: "Upcoming date",
    description: "Notice deadline in 7 days (12 Oct 2026) for Flat 402 lease.",
    documentName: "Residential Rental Agreement",
    timestamp: "1h ago",
    unread: true,
    type: "date",
    href: "/documents/demo-rental?page=7",
  },
  {
    id: "notif-3",
    title: "AI insight available",
    description: "3 areas may require review including early termination and deposit.",
    documentName: "Residential Rental Agreement",
    timestamp: "3h ago",
    unread: false,
    type: "insight",
    href: "/insights",
  },
];

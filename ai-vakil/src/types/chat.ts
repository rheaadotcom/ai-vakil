export interface Citation {
  id: string;
  documentId: string;
  documentTitle: string;
  page: number;
  clauseNumber?: string;
  quote: string;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  documentId?: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  citations?: Citation[];
  suggestedFollowUps?: string[];
  isStreaming?: boolean;
}

export interface ChatThread {
  id: string;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

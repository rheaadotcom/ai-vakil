export interface Citation {
  id: string;
  documentId: string;
  documentTitle: string;
  page: number;
  clauseNumber?: string;
  quote: string;
  snippet?: string;
}

export interface ChatSource {
  document_id: string;
  page: number;
  section: string;
  chunk_id: string;
  source_text: string;
}

export interface MockChatResponse {
  id: string;
  keywords: string[];
  answer: string;
  sources: ChatSource[];
  followUps?: string[];
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
  documentId?: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

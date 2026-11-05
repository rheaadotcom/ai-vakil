import { ChatThread, MockChatResponse } from "@/types";
import { initialMockDocuments } from "./mock-documents";

export const chatDocumentOptions = initialMockDocuments.slice(0, 4);

export const mockChatResponses: Record<string, MockChatResponse> = {
  notice: {
    id: "notice-period",
    keywords: ["notice", "period"],
    answer:
      "Based on the Residential Rental Agreement, the notice requirement is 60 days of written notice unless otherwise agreed in writing.",
    sources: [
      {
        document_id: "doc-rental-001",
        page: 7,
        section: "Section 7.2",
        chunk_id: "termination-notice-clause",
        source_text:
          "The terminating party shall provide sixty (60) days' written notice unless otherwise agreed in writing.",
      },
    ],
    followUps: ["Can I terminate before 11 months?", "What happens to the deposit?"],
  },
  end: {
    id: "agreement-end",
    keywords: ["end", "expiry", "when does", "agreement end"],
    answer:
      "The agreement begins on 12 January 2026 and has an 11-month term, ending on 11 December 2026.",
    sources: [
      {
        document_id: "doc-rental-001",
        page: 1,
        section: "Agreement Term",
        chunk_id: "agreement-term",
        source_text:
          "This Agreement shall commence on 12 January 2026 and continue for a term of eleven (11) months, expiring on 11 December 2026.",
      },
    ],
    followUps: ["What is the notice period?", "What are my obligations?"],
  },
  deposit: {
    id: "security-deposit",
    keywords: ["deposit", "security"],
    answer: "The agreement lists a security deposit of ₹60,000.",
    sources: [
      {
        document_id: "doc-rental-001",
        page: 4,
        section: "Rent & Payment",
        chunk_id: "security-deposit",
        source_text:
          "The Tenant shall pay a refundable security deposit of ₹60,000 as a deposit towards performance under the Agreement.",
      },
    ],
    followUps: ["What happens if I terminate early?", "What are my payment obligations?"],
  },
  terminate: {
    id: "early-termination",
    keywords: ["terminate", "termination", "early"],
    answer:
      "The agreement addresses early termination in Section 7. It refers to written notice and states that the terminating party should provide 60 days' notice unless otherwise agreed in writing. The agreement also indicates that financial consequences of leaving before the agreed term depend on the applicable provisions.",
    sources: [
      {
        document_id: "doc-rental-001",
        page: 7,
        section: "Section 7.1",
        chunk_id: "termination-overview",
        source_text:
          "Early termination shall be governed by the written notice procedure and any applicable financial consequences under this Agreement.",
      },
      {
        document_id: "doc-rental-001",
        page: 7,
        section: "Section 7.2",
        chunk_id: "termination-notice",
        source_text:
          "The terminating party shall provide sixty (60) days' written notice unless otherwise agreed in writing.",
      },
      {
        document_id: "doc-rental-001",
        page: 7,
        section: "Section 7.3",
        chunk_id: "termination-consequences",
        source_text:
          "Any departure before the agreed term may trigger contractual consequences as set out in the applicable provisions of this Agreement.",
      },
    ],
    followUps: ["Can I terminate before 11 months?", "Show me the relevant clause."],
  },
  summary: {
    id: "document-summary",
    keywords: ["summary", "summarize"],
    answer:
      "This is an 11-month residential rental agreement with ₹20,000 monthly rent, a ₹60,000 security deposit, a 60-day notice requirement, and defined start and end dates. The document also includes maintenance, termination, and dispute provisions that may require review.",
    sources: [
      {
        document_id: "doc-rental-001",
        page: 1,
        section: "Agreement Term",
        chunk_id: "summary-start",
        source_text:
          "This is an 11-month residential tenancy commencing 12 January 2026 and concluding 11 December 2026.",
      },
      {
        document_id: "doc-rental-001",
        page: 4,
        section: "Rent & Payment",
        chunk_id: "summary-rent",
        source_text:
          "Monthly rent is ₹20,000 and the deposit amount is ₹60,000.",
      },
      {
        document_id: "doc-rental-001",
        page: 7,
        section: "Termination",
        chunk_id: "summary-termination",
        source_text:
          "The agreement requires 60 days of written notice for termination unless otherwise agreed in writing.",
      },
    ],
    followUps: ["What are my obligations?", "What happens to the deposit?"],
  },
  obligations: {
    id: "obligations",
    keywords: ["obligation", "responsibilities", "obligations"],
    answer:
      "The agreement sets out several obligations, including paying rent by the 5th of each month, maintaining the premises, and providing 60 days' written notice before early termination. It also places responsibilities on the landlord regarding repairs and deposit return terms.",
    sources: [
      {
        document_id: "doc-rental-001",
        page: 4,
        section: "Rent & Payment",
        chunk_id: "obligation-rent",
        source_text:
          "The Tenant shall pay rent of ₹20,000 by the 5th day of each month.",
      },
      {
        document_id: "doc-rental-001",
        page: 6,
        section: "Maintenance",
        chunk_id: "obligation-maintenance",
        source_text:
          "The Tenant shall maintain the premises in a clean and habitable condition according to the Agreement.",
      },
      {
        document_id: "doc-rental-001",
        page: 7,
        section: "Section 7.2",
        chunk_id: "obligation-notice",
        source_text:
          "Any termination or exit requires sixty (60) days' written notice unless otherwise agreed in writing.",
      },
    ],
    followUps: ["What happens to the security deposit?", "Can I terminate before 11 months?"],
  },
  unknown: {
    id: "unknown-question",
    keywords: [],
    answer:
      "I couldn't find enough information in the selected document to answer that confidently.",
    sources: [
      {
        document_id: "doc-rental-001",
        page: 7,
        section: "Section 7.2",
        chunk_id: "unknown-suggestion",
        source_text:
          "The document covers rent, notice periods, termination, security deposit, dates, and obligations. Try asking about one of those topics.",
      },
    ],
    followUps: [
      "What is the notice period?",
      "When does the agreement end?",
      "What is the security deposit?",
      "What are my obligations?",
    ],
  },
};

export function getMockChatResponse(question: string, selectedDocumentId?: string): MockChatResponse {
  const normalized = question.toLowerCase();

  for (const response of Object.values(mockChatResponses)) {
    if (response.keywords.some((keyword) => normalized.includes(keyword))) {
      return {
        ...response,
        sources: response.sources.map((source) => ({
          ...source,
          document_id: selectedDocumentId || source.document_id,
        })),
      };
    }
  }

  return mockChatResponses.unknown;
}

export const mockChatConversations: ChatThread[] = [
  {
    id: "chat-rental-termination",
    documentId: "doc-rental-001",
    title: "Rental agreement termination",
    createdAt: "2026-10-08T09:30:00Z",
    updatedAt: "2026-10-08T09:30:00Z",
    messages: [
      {
        id: "chat-rental-user-1",
        role: "user",
        content: "Can I terminate this agreement before 11 months?",
        timestamp: "2026-10-08T09:30:00Z",
      },
      {
        id: "chat-rental-assistant-1",
        role: "assistant",
        content:
          "Based on the Residential Rental Agreement, the contract includes a 60-day written notice requirement and may have financial consequences for early termination before the agreed term. The agreement appears to require closer review if you plan to exit before 11 months.",
        timestamp: "2026-10-08T09:31:00Z",
        citations: [
          {
            id: "citation-rental-termination-1",
            documentId: "doc-rental-001",
            documentTitle: "Residential Rental Agreement",
            page: 7,
            clauseNumber: "Section 7.2",
            quote:
              "The terminating party shall provide sixty (60) days' written notice unless otherwise agreed in writing.",
            snippet: "Termination notice requirement",
          },
          {
            id: "citation-rental-termination-2",
            documentId: "doc-rental-001",
            documentTitle: "Residential Rental Agreement",
            page: 7,
            clauseNumber: "Section 7.3",
            quote:
              "Early termination may trigger financial or procedural consequences depending on the applicable provisions.",
            snippet: "Consequences of early exit",
          },
        ],
        suggestedFollowUps: [
          "What happens to the deposit?",
          "What is the notice period?",
          "Show me the relevant clause.",
        ],
      },
    ],
  },
  {
    id: "chat-security-deposit",
    documentId: "doc-rental-001",
    title: "Security deposit question",
    createdAt: "2026-10-08T08:10:00Z",
    updatedAt: "2026-10-08T08:10:00Z",
    messages: [
      {
        id: "chat-security-user-1",
        role: "user",
        content: "What is the security deposit?",
        timestamp: "2026-10-08T08:10:00Z",
      },
      {
        id: "chat-security-assistant-1",
        role: "assistant",
        content: "The agreement lists a security deposit of ₹60,000.",
        timestamp: "2026-10-08T08:11:00Z",
        citations: [
          {
            id: "citation-security-1",
            documentId: "doc-rental-001",
            documentTitle: "Residential Rental Agreement",
            page: 4,
            clauseNumber: "Rent & Payment",
            quote: "The Tenant shall pay a refundable security deposit of ₹60,000.",
            snippet: "Security deposit amount",
          },
        ],
        suggestedFollowUps: ["What happens if I terminate early?", "What are my obligations?"],
      },
    ],
  },
  {
    id: "chat-employment-notice",
    documentId: "doc-emp-002",
    title: "Employment notice period",
    createdAt: "2026-10-07T14:00:00Z",
    updatedAt: "2026-10-07T14:00:00Z",
    messages: [
      {
        id: "chat-employment-user-1",
        role: "user",
        content: "What is my notice period?",
        timestamp: "2026-10-07T14:00:00Z",
      },
      {
        id: "chat-employment-assistant-1",
        role: "assistant",
        content:
          "The agreement indicates a notice period tied to the employment terms and may require review of the termination clause.",
        timestamp: "2026-10-07T14:02:00Z",
        citations: [
          {
            id: "citation-employment-1",
            documentId: "doc-emp-002",
            documentTitle: "Employment Agreement",
            page: 11,
            clauseNumber: "Termination",
            quote: "Notice shall be provided in writing in accordance with the employment schedule set out in this Agreement.",
            snippet: "Employment notice requirement",
          },
        ],
      },
    ],
  },
  {
    id: "chat-nda-confidentiality",
    documentId: "doc-nda-003",
    title: "NDA confidentiality clause",
    createdAt: "2026-10-05T18:45:00Z",
    updatedAt: "2026-10-05T18:45:00Z",
    messages: [
      {
        id: "chat-nda-user-1",
        role: "user",
        content: "Explain the confidentiality clause.",
        timestamp: "2026-10-05T18:45:00Z",
      },
      {
        id: "chat-nda-assistant-1",
        role: "assistant",
        content:
          "The NDA sets out obligations around handling confidential information and restricts disclosure beyond the approved purpose of the engagement.",
        timestamp: "2026-10-05T18:47:00Z",
        citations: [
          {
            id: "citation-nda-1",
            documentId: "doc-nda-003",
            documentTitle: "Mutual Non-Disclosure Agreement",
            page: 3,
            clauseNumber: "Confidentiality",
            quote: "Each party shall protect the other party's confidential information and use it only for the purpose of the engagement.",
            snippet: "Confidentiality obligations",
          },
        ],
      },
    ],
  },
  {
    id: "chat-freelance-payment",
    documentId: "doc-serv-004",
    title: "Freelance payment terms",
    createdAt: "2026-10-03T10:20:00Z",
    updatedAt: "2026-10-03T10:20:00Z",
    messages: [
      {
        id: "chat-freelance-user-1",
        role: "user",
        content: "When am I paid?",
        timestamp: "2026-10-03T10:20:00Z",
      },
      {
        id: "chat-freelance-assistant-1",
        role: "assistant",
        content:
          "The agreement connects payment milestones to deliverables and indicates that invoicing runs after milestone acceptance.",
        timestamp: "2026-10-03T10:22:00Z",
        citations: [
          {
            id: "citation-freelance-1",
            documentId: "doc-serv-004",
            documentTitle: "Freelance Service Agreement",
            page: 5,
            clauseNumber: "Payment",
            quote: "Payment is due following milestone acceptance and submission of the corresponding invoice.",
            snippet: "Milestone payment terms",
          },
        ],
      },
    ],
  },
];

export function buildEmptyConversation(documentId?: string): ChatThread {
  return {
    id: `chat-${Date.now()}`,
    documentId,
    title: "New conversation",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [],
  };
}

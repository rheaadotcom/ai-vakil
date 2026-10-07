import { ChatMessage } from "@/types";

export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    role: "assistant",
    timestamp: "2024-10-15T14:32:00Z",
    content:
      "Hello Ananya! I have analyzed the **Residential Rental Agreement** for **Flat 402, Indiranagar** (12 pages, 24 clauses).\n\nKey takeaways:\n- **Monthly Rent**: ₹20,000 due on or before the 5th.\n- **Security Deposit**: ₹60,000 (equivalent to 3 months).\n- **Notice Period**: 60 days advance written notice.\n- ⚠️ **Critical Risk Alert**: There is a 6-month lock-in clause on Page 9 that forfeits your entire deposit if you vacate early.\n\nWhat would you like me to clarify or draft an amendment for?",
    suggestedFollowUps: [
      "Can the landlord evict me without 60 days notice?",
      "What happens if I need to relocate within 6 months?",
      "Who pays for building maintenance and repairs?",
      "Draft an amendment to reduce the notice period to 30 days",
    ],
  },
  {
    id: "msg-2",
    role: "user",
    timestamp: "2024-10-15T14:33:15Z",
    content: "What are my obligations if I want to terminate the lease early?",
  },
  {
    id: "msg-3",
    role: "assistant",
    timestamp: "2024-10-15T14:33:22Z",
    content:
      "Based on the agreement, early termination entails two distinct mechanisms depending on when you decide to vacate:\n\n### 1. During the First 6 Months (Lock-in Period)\nUnder **Clause 9.1 (Page 9)**, you are bound by a mandatory 6-month lock-in period. If you vacate within this window:\n> *\"...the entire security deposit of ₹60,000/- shall stand forfeited immediately to the Landlord as liquidated damages, notwithstanding the serving of any 60-day notice.\"*\n\n### 2. After 6 Months (General Termination)\nUnder **Clause 7.1 (Page 7)**, you must give **not less than 60 days prior written notice**. If you vacate without giving the full 60 days notice, you are obligated to compensate the landlord for the shortfall in rent.\n\n**Recommendation:** If you foresee possible job transfer or relocation, negotiate an exception clause to Clause 9.1 before signing.",
    citations: [
      {
        id: "cit-1",
        documentId: "doc-rental-001",
        documentTitle: "Indiranagar Flat 402 Lease Agreement",
        page: 9,
        clauseNumber: "Clause 9.1",
        quote:
          "In the event the Tenant terminates the tenancy or vacates the Demised Premises prior to the completion of the Lock-in Period, the entire security deposit of ₹60,000/- shall stand forfeited immediately...",
        snippet: "Lock-in Period & Early Termination Forfeiture",
      },
      {
        id: "cit-2",
        documentId: "doc-rental-001",
        documentTitle: "Indiranagar Flat 402 Lease Agreement",
        page: 7,
        clauseNumber: "Clause 7.1",
        quote:
          "Either party may terminate this Agreement by serving upon the other party not less than 60 (sixty) days prior written notice expressing such intention.",
        snippet: "Termination by Notice (60-Day Mutual Requirement)",
      },
    ],
    suggestedFollowUps: [
      "Can I get my deposit back if the landlord breaks the lock-in?",
      "Draft a redline counter-proposal for Clause 9.1",
      "Is an 18% late fee legally enforceable in Karnataka?",
    ],
  },
];

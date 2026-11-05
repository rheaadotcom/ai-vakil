"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageContainer } from "@/components/layout/page-container";
import {
  ChatHeader,
  ChatInput,
  ChatMessage,
  ConversationSidebar,
  DocumentContext,
  SuggestedPrompts,
  TypingIndicator,
} from "@/components/chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  buildEmptyConversation,
  chatDocumentOptions,
  getMockChatResponse,
  mockChatConversations,
} from "@/lib/mock-chat";
import { ChatMessage as ChatMessageType, ChatThread } from "@/types";

const documentScopeOptions = [
  { id: "all", name: "All Documents", pages: 0 },
  ...chatDocumentOptions.map((document) => ({ id: document.id, name: document.name, pages: document.pages })),
];

export default function ChatPage() {
  const [conversations, setConversations] = React.useState<ChatThread[]>(mockChatConversations);
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(
    mockChatConversations[0]?.id ?? null
  );
  const [searchValue, setSearchValue] = React.useState("");
  const [documentScope, setDocumentScope] = React.useState<string>("doc-rental-001");
  const [draftMessage, setDraftMessage] = React.useState("");
  const [typingConversationId, setTypingConversationId] = React.useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = React.useState<"chat" | "sources" | "history">("chat");
  const [renameConversationId, setRenameConversationId] = React.useState<string | null>(null);
  const [renameDraft, setRenameDraft] = React.useState("");
  const [deleteConversationId, setDeleteConversationId] = React.useState<string | null>(null);

  const activeConversation = React.useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) ?? null,
    [activeConversationId, conversations]
  );

  const selectedDocumentName =
    documentScope === "all"
      ? "All Documents"
      : chatDocumentOptions.find((document) => document.id === documentScope)?.name ??
        "Residential Rental Agreement";

  const handleCreateConversation = (title = "New conversation") => {
    const createdConversation = buildEmptyConversation(
      documentScope === "all" ? undefined : documentScope
    );
    createdConversation.title = title;
    setConversations((previous) => [createdConversation, ...previous]);
    setActiveConversationId(createdConversation.id);
    setMobilePanel("chat");
  };

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setMobilePanel("chat");
  };

  const handleSubmitMessage = (question?: string) => {
    const finalQuestion = (question ?? draftMessage).trim();
    if (!finalQuestion) return;

    let conversationId = activeConversationId;
    let targetConversation = activeConversation;

    if (!conversationId || !targetConversation) {
      const createdConversation = buildEmptyConversation(
        documentScope === "all" ? undefined : documentScope
      );
      createdConversation.title = "New conversation";
      setConversations((previous) => [createdConversation, ...previous]);
      setActiveConversationId(createdConversation.id);
      conversationId = createdConversation.id;
      targetConversation = createdConversation;
    }

    const timestamp = new Date().toISOString();
    const userMessage: ChatMessageType = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: finalQuestion,
      timestamp,
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              updatedAt: timestamp,
              messages: [...conversation.messages, userMessage],
            }
          : conversation
      )
    );

    setTypingConversationId(conversationId);
    setDraftMessage("");

    window.setTimeout(() => {
      const response = getMockChatResponse(
        finalQuestion,
        documentScope === "all" ? targetConversation?.documentId : documentScope
      );

      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.answer,
        timestamp: new Date().toISOString(),
        citations: response.sources.map((source, index) => ({
          id: `${source.chunk_id}-${index}`,
          documentId: source.document_id,
          documentTitle:
            selectedDocumentName === "All Documents"
              ? "Residential Rental Agreement"
              : selectedDocumentName,
          page: source.page,
          clauseNumber: source.section,
          quote: source.source_text,
          snippet: source.section,
        })),
        suggestedFollowUps: response.followUps ?? [],
      };

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                updatedAt: new Date().toISOString(),
                messages: [...conversation.messages, assistantMessage],
              }
            : conversation
        )
      );
      setTypingConversationId(null);
    }, 850);
  };

  const handleRenameConversation = (conversationId: string) => {
    const conversation = conversations.find((item) => item.id === conversationId);
    if (!conversation) return;
    setRenameConversationId(conversationId);
    setRenameDraft(conversation.title);
  };

  const handleConfirmRename = () => {
    if (!renameConversationId || !renameDraft.trim()) return;

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === renameConversationId
          ? { ...conversation, title: renameDraft.trim(), updatedAt: new Date().toISOString() }
          : conversation
      )
    );
    setRenameConversationId(null);
    setRenameDraft("");
    toast.success("Conversation renamed.");
  };

  const handleDeleteConversation = (conversationId: string) => {
    setDeleteConversationId(conversationId);
  };

  const handleConfirmDelete = () => {
    if (!deleteConversationId) return;

    const nextConversations = conversations.filter(
      (conversation) => conversation.id !== deleteConversationId
    );
    setConversations(nextConversations);
    if (activeConversationId === deleteConversationId) {
      setActiveConversationId(nextConversations[0]?.id ?? null);
    }
    setDeleteConversationId(null);
    toast.success("Conversation deleted.");
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderMessages = () => {
    if (!activeConversation || activeConversation.messages.length === 0) {
      return (
        <div className="flex h-full flex-col justify-center px-4 py-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-violet-300/80">
              AI assistant
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-100 font-display sm:text-4xl">
              Ask your documents anything.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Understand contracts, find important dates, explore clauses, and get answers grounded in
              your documents.
            </p>
            <div className="mt-6">
              <SuggestedPrompts
                prompts={[
                  "What is the notice period?",
                  "When does the agreement end?",
                  "What happens to the security deposit?",
                  "Can I terminate the agreement early?",
                ]}
                onSelect={(prompt) => handleSubmitMessage(prompt)}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col justify-between">
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
          {activeConversation.messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLatest={index === activeConversation.messages.length - 1 && message.role === "assistant"}
            />
          ))}

          {typingConversationId === activeConversation.id && <TypingIndicator />}
        </div>
      </div>
    );
  };

  const renderDesktopShell = () => (
    <div className="grid h-[calc(100vh-11rem)] grid-cols-1 gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
      <div className="hidden xl:block">
        <ConversationSidebar
          conversations={filteredConversations}
          activeConversationId={activeConversationId}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSelectConversation={handleSelectConversation}
          onNewConversation={() => handleCreateConversation()}
          onRenameConversation={handleRenameConversation}
          onDeleteConversation={handleDeleteConversation}
        />
      </div>

      <div className="min-h-0 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0B0B10]/70 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <ChatHeader
          selectedDocumentName={selectedDocumentName}
          selectedDocumentId={documentScope}
          onDocumentChange={setDocumentScope}
          documentOptions={documentScopeOptions}
        />
        <div className="flex h-[calc(100%-120px)] flex-col">{renderMessages()}</div>
        <ChatInput
          value={draftMessage}
          onChange={setDraftMessage}
          onSubmit={() => handleSubmitMessage()}
          disabled={typingConversationId !== null}
        />
      </div>

      <div className="hidden xl:block">
        <DocumentContext
          documents={chatDocumentOptions}
          selectedDocumentId={documentScope === "all" ? chatDocumentOptions[0].id : documentScope}
          onSelectDocument={(docId) => setDocumentScope(docId)}
          scope={documentScope}
        />
      </div>
    </div>
  );

  const renderMobileShell = () => (
    <div className="xl:hidden">
      <div className="mb-3 grid grid-cols-3 gap-2 rounded-2xl border border-white/[0.08] bg-[#0B0B10]/80 p-1.5">
        {[
          { key: "chat", label: "Chat" },
          { key: "sources", label: "Sources" },
          { key: "history", label: "History" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setMobilePanel(tab.key as "chat" | "sources" | "history")}
            className={`rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
              mobilePanel === tab.key
                ? "border border-violet-500/30 bg-violet-500/20 text-violet-100"
                : "text-zinc-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mobilePanel === "history" && (
        <ConversationSidebar
          conversations={filteredConversations}
          activeConversationId={activeConversationId}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSelectConversation={handleSelectConversation}
          onNewConversation={() => handleCreateConversation()}
          onRenameConversation={handleRenameConversation}
          onDeleteConversation={handleDeleteConversation}
        />
      )}

      {mobilePanel === "sources" && (
        <DocumentContext
          documents={chatDocumentOptions}
          selectedDocumentId={documentScope === "all" ? chatDocumentOptions[0].id : documentScope}
          onSelectDocument={(docId) => {
            setDocumentScope(docId);
            setMobilePanel("chat");
          }}
          scope={documentScope}
        />
      )}

      {mobilePanel === "chat" && (
        <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0B0B10]/70 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <ChatHeader
            selectedDocumentName={selectedDocumentName}
            selectedDocumentId={documentScope}
            onDocumentChange={setDocumentScope}
            documentOptions={documentScopeOptions}
          />
          <div className="flex h-[60vh] flex-col">{renderMessages()}</div>
          <ChatInput
            value={draftMessage}
            onChange={setDraftMessage}
            onSubmit={() => handleSubmitMessage()}
            disabled={typingConversationId !== null}
          />
        </div>
      )}
    </div>
  );

  return (
    <AppShell>
      <PageContainer maxWidth="full" className="py-0 xl:py-2">
        <div className="hidden xl:block">{renderDesktopShell()}</div>
        <div className="xl:hidden">{renderMobileShell()}</div>
      </PageContainer>

      <Dialog open={Boolean(renameConversationId)} onOpenChange={(open) => !open && setRenameConversationId(null)}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle>Rename conversation</DialogTitle>
            <DialogDescription>Update the title for this local chat.</DialogDescription>
          </DialogHeader>
          <Input
            value={renameDraft}
            onChange={(event) => setRenameDraft(event.target.value)}
            placeholder="Rental agreement termination"
            className="mt-2"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRenameConversationId(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmRename} disabled={!renameDraft.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleteConversationId)} onOpenChange={(open) => !open && setDeleteConversationId(null)}>
        <DialogContent maxWidth="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete this conversation?</DialogTitle>
            <DialogDescription>This action removes the chat locally and cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteConversationId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

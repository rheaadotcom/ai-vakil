import { Button } from "@/components/ui/button";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { ChatThread } from "@/types";
import { MoreHorizontal, Pencil, Search, Trash2 } from "lucide-react";

export interface ConversationSidebarProps {
  conversations: ChatThread[];
  activeConversationId: string | null;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSelectConversation: (conversationId: string) => void;
  onNewConversation: () => void;
  onRenameConversation: (conversationId: string) => void;
  onDeleteConversation: (conversationId: string) => void;
}

function formatConversationTimestamp(isoString: string) {
  const now = Date.now();
  const diffMinutes = Math.max(1, Math.round((now - new Date(isoString).getTime()) / 60000));

  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function groupConversations(conversations: ChatThread[]) {
  const groups = {
    Today: [] as ChatThread[],
    Yesterday: [] as ChatThread[],
    "Previous 7 days": [] as ChatThread[],
  };

  const now = new Date();

  conversations.forEach((conversation) => {
    const updatedAt = new Date(conversation.updatedAt);
    const diffMs = now.getTime() - updatedAt.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) groups.Today.push(conversation);
    else if (diffDays === 1) groups.Yesterday.push(conversation);
    else if (diffDays <= 7) groups["Previous 7 days"].push(conversation);
  });

  return Object.entries(groups).filter(([, list]) => list.length > 0);
}

export function ConversationSidebar({
  conversations,
  activeConversationId,
  searchValue,
  onSearchChange,
  onSelectConversation,
  onNewConversation,
  onRenameConversation,
  onDeleteConversation,
}: ConversationSidebarProps) {
  const filteredConversations = conversations.filter((conversation) => {
    if (!searchValue.trim()) return true;
    return conversation.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const groupedConversations = groupConversations(filteredConversations);

  return (
    <aside className="flex h-full flex-col rounded-[28px] border border-white/[0.08] bg-[#0B0B10]/80 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between gap-2 px-2 pt-1">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">AI Assistant</p>
        </div>
        <Button type="button" variant="primary" size="sm" onClick={onNewConversation} className="rounded-xl px-3 py-2 text-[11px]">
          + New Conversation
        </Button>
      </div>

      <div className="mb-3 px-2">
        <Input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search conversations..."
          className="h-9 rounded-xl border-white/[0.08] bg-white/[0.02] text-xs text-zinc-100"
          aria-label="Search conversations"
        />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {groupedConversations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-3 py-6 text-center text-sm text-zinc-400">
            No conversations found
          </div>
        ) : (
          groupedConversations.map(([groupName, list]) => (
            <div key={groupName} className="space-y-2">
              <p className="px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">{groupName}</p>

              <div className="space-y-1">
                {list.map((conversation) => {
                  const isActive = conversation.id === activeConversationId;

                  return (
                    <div
                      key={conversation.id}
                      className={`flex items-center gap-2 rounded-2xl border px-2.5 py-2.5 transition-colors ${
                        isActive
                          ? "border-violet-500/30 bg-violet-500/10"
                          : "border-transparent bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.02]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectConversation(conversation.id)}
                        className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-zinc-100">{conversation.title}</p>
                          <p className="mt-1 text-[11px] text-zinc-500">{formatConversationTimestamp(conversation.updatedAt)}</p>
                        </div>
                      </button>

                      <Dropdown>
                        <DropdownTrigger className="shrink-0">
                          <button
                            type="button"
                            aria-label={`More options for ${conversation.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-400 transition-colors hover:border-violet-500/30 hover:text-violet-200"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownTrigger>
                        <DropdownContent align="right" className="w-32">
                          <DropdownItem onClick={() => onRenameConversation(conversation.id)} className="text-zinc-200">
                            <Pencil className="h-3.5 w-3.5" />
                            Rename
                          </DropdownItem>
                          <DropdownItem destructive onClick={() => onDeleteConversation(conversation.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </DropdownItem>
                        </DropdownContent>
                      </Dropdown>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-zinc-400">
        <Search className="h-3.5 w-3.5 text-zinc-500" />
        <span>Local mock conversations</span>
      </div>
    </aside>
  );
}

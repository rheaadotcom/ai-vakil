"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpenText,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type CommandItem = {
  id: string;
  label: string;
  description: string;
  section: string;
  href: string;
  icon: React.ReactNode;
};

const commandItems: CommandItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Overview of your legal workspace and next actions.",
    section: "Navigation",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    id: "documents",
    label: "Documents",
    description: "Browse and manage uploaded legal documents.",
    section: "Navigation",
    href: "/documents",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "assistant",
    label: "AI Assistant",
    description: "Ask questions about the active document or clause set.",
    section: "Navigation",
    href: "/chat",
    icon: <MessageSquareText className="h-4 w-4" />,
  },
  {
    id: "clauses",
    label: "Clauses",
    description: "Explore contract terms and clause-level insights.",
    section: "Navigation",
    href: "/clauses",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    id: "insights",
    label: "Insights",
    description: "Review summaries, obligations, and attention items.",
    section: "Navigation",
    href: "/insights",
    icon: <BookOpenText className="h-4 w-4" />,
  },
  {
    id: "settings",
    label: "Settings",
    description: "Manage preferences, notifications, and privacy controls.",
    section: "Navigation",
    href: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    id: "upload-document",
    label: "Upload Document",
    description: "Open the mock upload flow for a PDF or DOCX file.",
    section: "Actions",
    href: "/documents",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "ask-ai",
    label: "Ask AI",
    description: "Open the assistant to review the demo rental agreement.",
    section: "Actions",
    href: "/chat",
    icon: <MessageSquareText className="h-4 w-4" />,
  },
  {
    id: "open-demo-document",
    label: "Open Demo Document",
    description: "Jump directly into the demo rental agreement workspace.",
    section: "Actions",
    href: "/documents/demo-rental",
    icon: <BookOpenText className="h-4 w-4" />,
  },
  {
    id: "view-report",
    label: "View Report",
    description: "Preview the premium frontend-only legal report.",
    section: "Actions",
    href: "/reports/demo-rental",
    icon: <ArrowRight className="h-4 w-4" />,
  },
];

export function GlobalCommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (typeof key !== "string" || key.length === 0 || event.isComposing) {
        return;
      }

      const target = event.target;
      const isEditing =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.matches(
            "input:not([type='button']):not([type='submit']):not([type='reset']), textarea, select",
          ));
      const isShortcutKey =
        key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        !isEditing;

      if (isShortcutKey) {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  const filteredCommands = React.useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return commandItems;

    return commandItems.filter((item) => {
      return [item.label, item.description, item.section]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }, [query]);

  const handleSelect = (item: CommandItem) => {
    router.push(item.href);
    setOpen(false);
    setQuery("");
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = filteredCommands[activeIndex] ?? filteredCommands[0];
      if (selected) {
        handleSelect(selected);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 hidden items-center gap-2 rounded-full border border-white/10 bg-[#0D0D10]/80 px-3 py-2 text-[11px] font-medium text-zinc-300 shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:border-violet-500/40 hover:text-white md:inline-flex"
        aria-label="Open command palette"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[10px] text-zinc-200">
          K
        </span>
        <span className="tracking-[0.18em] text-[9px] uppercase text-zinc-400">
          Quick Actions
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent maxWidth="max-w-2xl" className="border-white/10 bg-[#0D0D10]/95 p-0">
          <div className="border-b border-white/[0.06] p-5">
            <DialogHeader className="mb-0">
              <DialogTitle className="text-zinc-50">Quick actions</DialogTitle>
              <DialogDescription>
                Jump to the most common legal workflows. Use arrow keys to navigate and Enter to select.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-5 pb-0">
            <Input
              aria-label="Search commands"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKeyDown}
              leftIcon={<Search className="h-4 w-4" />}
              placeholder="Search documents, navigation, and actions..."
              className="bg-[#111115]"
              autoFocus
            />
          </div>

          <div className="max-h-[360px] overflow-y-auto px-5 pb-5 pt-4">
            {filteredCommands.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center">
                <p className="text-sm font-medium text-zinc-200">No matching commands</p>
                <p className="mt-1 text-xs text-zinc-400">Try a broader keyword like “document”, “insights”, or “report”.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredCommands.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200",
                      index === activeIndex
                        ? "border-violet-500/40 bg-violet-500/[0.08] text-white"
                        : "border-white/[0.06] bg-white/[0.02] text-zinc-200 hover:border-white/[0.12] hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#111115] text-violet-300">
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-medium">{item.label}</span>
                        <span className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-zinc-400">
                          {item.section}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

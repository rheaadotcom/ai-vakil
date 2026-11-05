import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Sparkles } from "lucide-react";
import { SourceCitation } from "@/components/shared/source-citation";
import { ChatMessage as ChatMessageType } from "@/types";
import { toast } from "@/components/ui/toast";

export interface ChatMessageProps {
  message: ChatMessageType;
  isLatest?: boolean;
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

function renderMessageContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, index) => {
    if (!line.trim()) {
      return <div key={`empty-${index}`} className="h-2" />;
    }

    if (line.startsWith("### ")) {
      return (
        <h4 key={`head-${index}`} className="mt-2 text-sm font-semibold text-zinc-100">
          {renderInlineMarkdown(line.replace(/^###\s+/, ""))}
        </h4>
      );
    }

    if (line.startsWith("- ")) {
      return (
        <li key={`li-${index}`} className="ml-4 list-disc text-sm leading-relaxed text-zinc-200">
          {renderInlineMarkdown(line.replace(/^-\s+/, ""))}
        </li>
      );
    }

    if (line.startsWith("> ")) {
      return (
        <blockquote
          key={`quote-${index}`}
          className="border-l-2 border-violet-500/40 bg-violet-500/[0.04] px-3 py-2 text-sm italic text-zinc-300"
        >
          {renderInlineMarkdown(line.replace(/^>\s+/, ""))}
        </blockquote>
      );
    }

    return (
      <p key={`p-${index}`} className="text-sm leading-relaxed text-zinc-200">
        {renderInlineMarkdown(line)}
      </p>
    );
  });
}

export function ChatMessage({ message, isLatest }: ChatMessageProps) {
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast.success("Response copied.");
    } catch {
      toast.info("Clipboard unavailable", "Copy manually from the chat message.");
    }
  };

  const handleFeedback = (feedback: "helpful" | "not-helpful") => {
    toast.success(
      feedback === "helpful" ? "Thanks for your feedback." : "Feedback recorded.",
      feedback === "helpful"
        ? "Your response was marked as helpful."
        : "Your feedback has been recorded."
    );
  };

  const handleRegenerate = () => {
    toast.info("Regenerate", "A short mock regeneration is available in the prototype flow.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`w-full max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div
          className={`rounded-[22px] border px-4 py-3 shadow-xl shadow-black/20 ${
            isUser
              ? "ml-auto border-violet-500/35 bg-gradient-to-br from-violet-600/25 to-indigo-600/15"
              : "border-white/[0.08] bg-[#111318]/90"
          }`}
        >
          <div className="space-y-2">{renderMessageContent(message.content)}</div>

          {!isUser && message.citations && message.citations.length > 0 && (
            <div className="mt-4 border-t border-white/[0.06] pt-3">
              <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.15em] text-zinc-500">
                Sources
              </p>
              <div className="flex flex-wrap gap-2">
                {message.citations.map((citation) => (
                  <Link
                    key={citation.id}
                    href={`/documents/demo-rental?page=${citation.page}&source=${citation.clauseNumber?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "term"}`}
                    className="inline-flex"
                  >
                    <SourceCitation citation={citation} className="w-full" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {!isUser && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && (
          <div className="w-full max-w-[96%]">
            <div className="mb-2 flex flex-wrap gap-2">
              {message.suggestedFollowUps.slice(0, 3).map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-2.5 py-1 text-[11px] text-violet-200 transition-colors hover:border-violet-500/40 hover:bg-violet-500/[0.12]"
                  onClick={() => toast.info("Suggested prompt", suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isUser && isLatest && (
          <div className="flex items-center gap-2 self-start">
            <button
              type="button"
              aria-label="Copy response"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2 py-1 text-[11px] text-zinc-300 transition-colors hover:border-violet-500/40 hover:text-violet-200"
              onClick={handleCopy}
            >
              <Copy className="h-3.5 w-3.5" />
              Copy
            </button>
            <button
              type="button"
              aria-label="Helpful"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2 py-1 text-[11px] text-zinc-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-200"
              onClick={() => handleFeedback("helpful")}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              Helpful
            </button>
            <button
              type="button"
              aria-label="Not helpful"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2 py-1 text-[11px] text-zinc-300 transition-colors hover:border-amber-500/40 hover:text-amber-200"
              onClick={() => handleFeedback("not-helpful")}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
              Not Helpful
            </button>
            <button
              type="button"
              aria-label="Regenerate response"
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2 py-1 text-[11px] text-zinc-300 transition-colors hover:border-violet-500/40 hover:text-violet-200"
              onClick={handleRegenerate}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Regenerate
            </button>
          </div>
        )}

        {!isUser && !message.citations && (
          <div className="flex items-center gap-1.5 self-start rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-2 py-1 text-[10px] text-violet-200">
            <Sparkles className="h-3 w-3" />
            Mock answer
          </div>
        )}
      </div>
    </motion.div>
  );
}

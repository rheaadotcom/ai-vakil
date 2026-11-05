import * as React from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, ArrowUp } from "lucide-react";

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSubmit, disabled = false }: ChatInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!value.trim() || disabled) return;
      onSubmit();
    }
  };

  return (
    <div className="border-t border-white/[0.08] bg-[#0B0B10]/80 px-4 py-3 backdrop-blur-xl sm:px-5">
      <div className="rounded-2xl border border-white/[0.08] bg-[#0F1016]/90 p-2.5 shadow-2xl shadow-black/30">
        <div className="flex items-end gap-2">
          <button
            type="button"
            aria-label="Attach document"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-zinc-400 transition-colors hover:border-violet-500/40 hover:text-violet-200"
            onClick={() => window.alert("Document upload is available from the Documents page.")}
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <textarea
            ref={textareaRef}
            value={value}
            rows={1}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your documents..."
            className="max-h-[150px] min-h-[44px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            aria-label="Ask about your documents"
          />

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            leftIcon={<ArrowUp className="h-3.5 w-3.5" />}
            className="h-10 w-10 rounded-xl p-0 sm:h-11 sm:w-11"
            aria-label="Send message"
          />
        </div>
      </div>

      <p className="mt-3 text-[11px] text-zinc-500">
        AI Vakil provides document analysis for informational purposes and does not replace professional legal advice.
      </p>
    </div>
  );
}

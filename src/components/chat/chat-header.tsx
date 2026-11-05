import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export interface ChatHeaderProps {
  selectedDocumentName: string;
  selectedDocumentId: string;
  onDocumentChange: (documentId: string) => void;
  documentOptions: Array<{ id: string; name: string; pages: number }>;
}

export function ChatHeader({
  selectedDocumentName,
  selectedDocumentId,
  onDocumentChange,
  documentOptions,
}: ChatHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.08] bg-[#0B0B10]/70 px-4 py-4 backdrop-blur-xl sm:px-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-violet-300/80">
            AI Assistant
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-100 font-display">
            Ask your documents
          </h1>
        </div>
        <Badge variant="legal" size="sm" className="w-fit gap-1.5 text-[10px]">
          <Sparkles className="h-3 w-3" />
          AI analysis · Demo mode
        </Badge>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="font-medium text-zinc-300">Current:</span>
          <span className="text-zinc-100">{selectedDocumentName}</span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="chat-document-select" className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">
            Document scope
          </label>
          <select
            id="chat-document-select"
            value={selectedDocumentId}
            onChange={(event) => onDocumentChange(event.target.value)}
            className="rounded-xl border border-white/[0.08] bg-[#111218] px-3 py-2 text-xs text-zinc-100 outline-none transition-colors focus:border-violet-500/50"
            aria-label="Select document for AI analysis"
          >
            {documentOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

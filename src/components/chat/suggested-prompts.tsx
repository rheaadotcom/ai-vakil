import { Button } from "@/components/ui/button";

export interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {prompts.map((prompt) => (
        <Button
          key={prompt}
          type="button"
          variant="glass"
          size="sm"
          onClick={() => onSelect(prompt)}
          className="h-auto justify-start rounded-2xl border border-white/[0.08] bg-[#121319]/80 px-3 py-3 text-left text-xs text-zinc-200 shadow-none hover:border-violet-500/40 hover:bg-violet-500/10"
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}

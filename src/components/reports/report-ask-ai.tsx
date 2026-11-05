import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";

const prompts = [
  "Explain the termination clause.",
  "What happens to the security deposit?",
  "What are my main obligations?",
  "When does the agreement end?",
];

export function ReportAskAI() {
  return (
    <motion.section
      id="ask-ai"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.24 }}
      className="rounded-[28px] border border-white/[0.08] bg-[#0b0d12]/70 p-5 sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Need more clarity?</p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-100">Still have questions?</h2>
        </div>
        <Button asChild variant="primary" size="sm" className="shrink-0">
          <Link href="/chat">
            <span className="inline-flex items-center gap-2">
              Ask AI
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </Button>
      </div>

      <p className="mt-4 text-lg text-zinc-200">Ask AI Vakil about this document.</p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {prompts.map((prompt) => (
          <Link
            key={prompt}
            href="/chat"
            className="group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left text-sm text-zinc-200 transition-colors hover:border-violet-500/30 hover:bg-violet-500/[0.05]"
          >
            <span className="inline-flex items-center gap-2">
              <MessageSquareText className="h-4 w-4 text-violet-300" />
              {prompt}
            </span>
            <ArrowRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-200" />
          </Link>
        ))}
      </div>
    </motion.section>
  );
}

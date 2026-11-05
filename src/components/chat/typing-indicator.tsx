import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex max-w-[80%] items-center gap-3 rounded-2xl border border-violet-500/20 bg-[#121218]/90 px-3 py-2.5 text-zinc-300 shadow-xl shadow-black/20">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            animate={{ y: [0, -3, 0], opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: dot * 0.12,
              ease: "easeInOut",
            }}
            className="block h-2 w-2 rounded-full bg-violet-400"
          />
        ))}
      </div>
      <span className="text-xs text-zinc-300">AI Vakil is analyzing the document...</span>
    </div>
  );
}

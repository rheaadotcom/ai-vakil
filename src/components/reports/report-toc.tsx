import { motion } from "framer-motion";

const sections = [
  { label: "Executive Summary", href: "#executive-summary" },
  { label: "Document at a Glance", href: "#document-overview" },
  { label: "Important Dates", href: "#important-dates" },
  { label: "Key Obligations", href: "#key-obligations" },
  { label: "Areas Worth Reviewing", href: "#areas-worth-reviewing" },
  { label: "Clause Breakdown", href: "#clause-breakdown" },
  { label: "Key Terms", href: "#key-terms" },
  { label: "AI Observations", href: "#ai-observations" },
  { label: "Source Coverage", href: "#source-coverage" },
  { label: "Ask AI", href: "#ask-ai" },
];

export function ReportTOC() {
  return (
    <aside className="hidden xl:block xl:pl-2">
      <motion.nav
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky top-6 rounded-[24px] border border-white/[0.08] bg-[#0b0d12]/70 p-4"
        aria-label="Report table of contents"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Contents</p>
        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
          {sections.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                className="block rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-white/[0.03] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </aside>
  );
}

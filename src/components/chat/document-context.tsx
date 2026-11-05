import { Badge } from "@/components/ui/badge";
import { FileText, Sparkles, ArrowUpRight } from "lucide-react";
import { MockDocument } from "@/lib/mock-documents";

export interface DocumentContextProps {
  documents: MockDocument[];
  selectedDocumentId: string;
  onSelectDocument: (documentId: string) => void;
  scope: "all" | string;
}

export function DocumentContext({ documents, selectedDocumentId, onSelectDocument, scope }: DocumentContextProps) {
  const selectedDocument = documents.find((document) => document.id === selectedDocumentId) ?? documents[0];

  if (scope === "all") {
    return (
      <aside className="h-full rounded-[28px] border border-white/[0.08] bg-[#0B0B10]/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-zinc-100">Document Context</h2>
          <Badge variant="outline" size="sm">
            12 Documents
          </Badge>
        </div>

        <div className="space-y-2">
          {documents.map((document) => (
            <button
              key={document.id}
              type="button"
              onClick={() => onSelectDocument(document.id)}
              className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2.5 text-left transition-colors ${
                selectedDocumentId === document.id
                  ? "border-violet-500/35 bg-violet-500/10 text-violet-100"
                  : "border-white/[0.06] bg-white/[0.02] text-zinc-300 hover:border-violet-500/25"
              }`}
            >
              <div>
                <p className="text-sm font-medium">{document.name}</p>
                <p className="mt-1 text-[11px] text-zinc-500">{document.pages} pages</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-500" />
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-full rounded-[28px] border border-white/[0.08] bg-[#0B0B10]/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-zinc-100">Document Context</h2>
        <Badge variant="success" size="sm">
          Analyzed
        </Badge>
      </div>

      <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.05] p-3">
        <div className="mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4 text-violet-300" />
          <span className="text-sm font-medium text-zinc-100">{selectedDocument.name}</span>
        </div>
        <p className="text-[11px] text-zinc-400">PDF · {selectedDocument.pages} pages</p>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-500">
            Document Summary
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">
            {selectedDocument.summary || "Summary not available for this document."}
          </p>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-500">
            Key Sections
          </p>
          <div className="space-y-2 text-sm text-zinc-300">
            {[
              { name: "Termination", page: 7 },
              { name: "Rent & Payment", page: 4 },
              { name: "Maintenance", page: 6 },
              { name: "Dispute Resolution", page: 10 },
            ].map((section) => (
              <button
                key={section.name}
                type="button"
                onClick={() => onSelectDocument(selectedDocument.id)}
                className="flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 text-left hover:border-violet-500/30"
              >
                <span>{section.name}</span>
                <span className="text-[11px] text-violet-300">Page {section.page}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-500">
            Recent Sources
          </p>
          <div className="space-y-2 text-sm text-zinc-300">
            {[
              "Page 7 · Section 7.2",
              "Page 9 · Security Deposit",
            ].map((source) => (
              <button
                key={source}
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 text-left hover:border-violet-500/30"
              >
                <span>{source}</span>
                <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

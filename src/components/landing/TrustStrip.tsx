"use client";

import React from "react";
import { FileText, Briefcase, Shield, Pen, Settings2, Mail } from "lucide-react";

const docTypes = [
  { icon: FileText, label: "Rental Agreements" },
  { icon: Briefcase, label: "Employment Contracts" },
  { icon: Shield, label: "NDAs" },
  { icon: Pen, label: "Freelance Agreements" },
  { icon: Settings2, label: "Service Agreements" },
  { icon: Mail, label: "Offer Letters" },
];

export function TrustStrip() {
  return (
    <section className="py-14 px-5 sm:px-8 border-y border-white/[0.04]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-zinc-500 mb-8 tracking-wide">
          Built for the documents people actually deal with.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {docTypes.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-zinc-400 text-sm hover:border-violet-500/25 hover:text-zinc-200 transition-all duration-200"
            >
              <Icon className="w-3.5 h-3.5 text-violet-400/70" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

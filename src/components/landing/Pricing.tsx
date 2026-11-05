"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    description: "For trying AI Vakil",
    features: [
      "3 documents per month",
      "AI document analysis",
      "Basic Q&A",
      "Clause explorer",
    ],
    cta: "Start Free",
    ctaHref: "/login",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "For individuals working with documents regularly",
    features: [
      "Unlimited document analysis",
      "AI Q&A",
      "Clause insights",
      "Important dates",
      "Analysis reports",
      "Priority processing",
    ],
    cta: "Choose Pro",
    ctaHref: "/login",
    variant: "primary" as const,
    popular: true,
  },
  {
    name: "Business",
    price: "Custom",
    period: "",
    description: "For teams",
    features: [
      "Team workspace",
      "Shared documents",
      "Advanced reporting",
      "Admin controls",
      "Custom limits",
    ],
    cta: "Contact Sales",
    ctaHref: "/login",
    variant: "outline" as const,
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-28 px-5 sm:px-8 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/7 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-[0.12em] mb-4">Pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-3">
            Simple, transparent pricing.
          </h2>
          <p className="text-sm text-zinc-600">Pricing shown is indicative for this prototype.</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn(
                "relative rounded-2xl border p-8 flex flex-col",
                plan.popular
                  ? "bg-gradient-to-b from-violet-600/12 to-transparent border-violet-500/30 shadow-xl shadow-violet-600/10"
                  : "glass-card border-white/[0.07]"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-600 text-[10px] font-bold text-white tracking-wider uppercase shadow-lg shadow-violet-600/30">
                  Popular
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-4xl font-semibold text-white">{plan.price}</span>
                  {plan.period && <span className="text-sm text-zinc-500">{plan.period}</span>}
                </div>
                <p className="text-xs text-zinc-500">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan.ctaHref}>
                <Button variant={plan.variant} className="w-full justify-center">
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

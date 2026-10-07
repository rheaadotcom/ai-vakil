"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordRule {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordStrengthProps {
  password?: string;
  className?: string;
}

export function evaluatePasswordRules(password: string): {
  rules: PasswordRule[];
  score: number; // 0 to 3
  level: "Weak" | "Fair" | "Strong" | "None";
} {
  if (!password) {
    return {
      rules: [
        { id: "length", label: "At least 8 characters", met: false },
        { id: "uppercase", label: "One uppercase letter", met: false },
        { id: "number", label: "One number", met: false },
      ],
      score: 0,
      level: "None",
    };
  }

  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const rules: PasswordRule[] = [
    { id: "length", label: "At least 8 characters", met: hasLength },
    { id: "uppercase", label: "One uppercase letter", met: hasUppercase },
    { id: "number", label: "One number", met: hasNumber },
  ];

  const score = [hasLength, hasUppercase, hasNumber].filter(Boolean).length;

  let level: "Weak" | "Fair" | "Strong" | "None" = "Weak";
  if (score === 0) level = "None";
  else if (score === 1) level = "Weak";
  else if (score === 2) level = "Fair";
  else if (score === 3) level = "Strong";

  return { rules, score, level };
}

export function PasswordStrength({
  password = "",
  className,
}: PasswordStrengthProps) {
  const { rules, score, level } = evaluatePasswordRules(password);

  // If user hasn't typed anything yet, don't show the colored meter aggressively
  const isStarted = password.length > 0;

  const strengthColor =
    level === "Strong"
      ? "bg-emerald-500"
      : level === "Fair"
      ? "bg-amber-500"
      : level === "Weak"
      ? "bg-rose-500"
      : "bg-zinc-700";

  const textColor =
    level === "Strong"
      ? "text-emerald-400"
      : level === "Fair"
      ? "text-amber-400"
      : level === "Weak"
      ? "text-rose-400"
      : "text-zinc-500";

  return (
    <div className={cn("w-full space-y-2.5 pt-1", className)}>
      {/* Strength Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">Password strength</span>
          <span className={cn("font-medium transition-colors duration-200", textColor)}>
            {isStarted ? level : "Not entered"}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              score >= 1 ? strengthColor : "bg-white/[0.08]"
            )}
          />
          <div
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              score >= 2 ? strengthColor : "bg-white/[0.08]"
            )}
          />
          <div
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              score >= 3 ? strengthColor : "bg-white/[0.08]"
            )}
          />
        </div>
      </div>

      {/* Checklist items */}
      <ul className="space-y-1.5 text-xs">
        {rules.map((rule) => (
          <li
            key={rule.id}
            className={cn(
              "flex items-center gap-2 transition-colors duration-200",
              rule.met ? "text-emerald-400 font-medium" : "text-zinc-500"
            )}
          >
            <div
              className={cn(
                "h-4 w-4 rounded-full flex items-center justify-center text-[10px] shrink-0 border transition-all duration-200",
                rule.met
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                  : "bg-white/[0.03] border-white/[0.1] text-zinc-600"
              )}
            >
              {rule.met ? <Check className="h-2.5 w-2.5" /> : <div className="h-1 w-1 rounded-full bg-zinc-600" />}
            </div>
            <span>{rule.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

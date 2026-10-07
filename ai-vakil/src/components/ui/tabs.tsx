"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used within <Tabs />");
  return context;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  className,
  children,
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const onValueChange = controlledOnValueChange || setInternalValue;

  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full space-y-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl bg-zinc-900/80 p-1 border border-white/[0.06] backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  badge,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  badge?: string | number;
}) {
  const { value: activeValue, onValueChange } = useTabs();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => onValueChange(value)}
      className={cn(
        "relative flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors select-none",
        isActive ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200",
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeTabBadge"
          transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
          className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/10 shadow-sm"
        />
      )}
      <span className="relative z-10">{children}</span>
      {badge !== undefined && (
        <span
          className={cn(
            "relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-semibold",
            isActive
              ? "bg-violet-500/25 text-violet-300"
              : "bg-white/[0.05] text-zinc-500"
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { value: activeValue } = useTabs();
  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn("outline-none animate-in fade-in duration-200", className)}
    >
      {children}
    </div>
  );
}

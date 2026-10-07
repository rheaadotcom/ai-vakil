"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(
  undefined
);

export function Dropdown({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error("DropdownTrigger must be within Dropdown");

  return (
    <div
      onClick={() => context.setOpen((prev) => !prev)}
      className={cn("cursor-pointer inline-flex items-center", className)}
    >
      {children}
    </div>
  );
}

export function DropdownContent({
  children,
  align = "right",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error("DropdownContent must be within Dropdown");

  return (
    <AnimatePresence>
      {context.open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute z-50 mt-2 min-w-[200px] rounded-xl border border-white/[0.08] bg-[#0E0E13] p-1.5 text-zinc-100 shadow-2xl shadow-black/70 backdrop-blur-2xl focus:outline-none",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DropdownItem({
  children,
  onClick,
  className,
  destructive = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  destructive?: boolean;
  disabled?: boolean;
}) {
  const context = React.useContext(DropdownContext);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    context?.setOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors text-left",
        destructive
          ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
          : "text-zinc-300 hover:bg-white/[0.06] hover:text-zinc-100",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
    >
      {children}
    </button>
  );
}

export function DropdownSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-white/[0.06]", className)} />;
}

export function DropdownLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500",
        className
      )}
    >
      {children}
    </div>
  );
}

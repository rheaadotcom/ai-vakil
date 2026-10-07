"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  LayoutDashboard,
  FileText,
  MessageSquare,
  BookOpen,
  Lightbulb,
  Clock,
  Star,
  Settings,
  HelpCircle,
  PlusCircle,
  X,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  onUploadClick?: () => void;
}

export function MobileNavigation({
  open,
  onClose,
  onUploadClick,
}: MobileNavigationProps) {
  const pathname = usePathname();

  const mainNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Documents", href: "/documents", icon: FileText },
    { name: "AI Assistant", href: "/chat", icon: MessageSquare },
    { name: "Clauses", href: "/clauses", icon: BookOpen },
    { name: "Insights", href: "/insights", icon: Lightbulb },
  ];

  const workspaceNavItems = [
    { name: "Recent", href: "/documents?filter=recent", icon: Clock },
    { name: "Favorites", href: "/documents?filter=favorites", icon: Star },
  ];

  const systemNavItems = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Slide-out drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-[#0A0A0E] border-r border-white/10 p-5 flex flex-col justify-between shadow-2xl z-10"
          >
            <div className="overflow-y-auto flex-1 pr-1">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300">
                    <Scale className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-sm text-zinc-100">
                    AI Vakil
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Upload CTA */}
              <div className="my-4">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onUploadClick?.();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white py-2.5 px-3 text-xs font-semibold shadow-lg shadow-violet-600/20"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Upload Document</span>
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-4">
                <nav className="space-y-1">
                  <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Navigation
                  </div>
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/" && pathname?.startsWith(item.href));

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                          isActive
                            ? "bg-violet-500/15 text-violet-200 border border-violet-500/30"
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="space-y-1 pt-2 border-t border-white/[0.06]">
                  <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Workspace
                  </div>
                  {workspaceNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                          isActive
                            ? "bg-violet-500/15 text-violet-200 border border-violet-500/30"
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="space-y-1 pt-2 border-t border-white/[0.06]">
                  <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    System
                  </div>
                  {systemNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                          isActive
                            ? "bg-violet-500/15 text-violet-200 border border-violet-500/30"
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3 shrink-0">
              <Avatar name="Riya Bhardwaj" size="sm" status="online" />
              <div>
                <p className="text-xs font-medium text-zinc-200">Riya Bhardwaj</p>
                <p className="text-[10px] text-zinc-500 font-mono">Legal Lead</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

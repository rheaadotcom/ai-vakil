"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
  Shield,
  ChevronRight,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onUploadClick?: () => void;
}

export function Sidebar({
  className,
  onUploadClick,
}: SidebarProps) {
  const pathname = usePathname();

  const mainNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      name: "Documents",
      href: "/documents",
      icon: FileText,
      badge: "12",
    },
    {
      name: "AI Assistant",
      href: "/chat",
      icon: MessageSquare,
      badge: "AI",
      badgeVariant: "legal" as const,
    },
    {
      name: "Clauses",
      href: "/clauses",
      icon: BookOpen,
      badge: "27",
    },
    {
      name: "Insights",
      href: "/insights",
      icon: Lightbulb,
      badge: "3",
      badgeVariant: "warning" as const,
    },
  ];

  const workspaceNavItems = [
    {
      name: "Recent",
      href: "/documents?filter=recent",
      icon: Clock,
    },
    {
      name: "Favorites",
      href: "/documents?filter=favorites",
      icon: Star,
    },
  ];

  const bottomNavItems = [
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      name: "Help",
      href: "/help",
      icon: HelpCircle,
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-screen w-64 border-r border-white/[0.08] bg-[#0A0A0D]/95 backdrop-blur-2xl text-zinc-300 z-30 select-none transition-all duration-200",
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-[1px] shadow-lg shadow-violet-600/25">
            <div className="h-full w-full rounded-[11px] bg-[#0D0D12] flex items-center justify-center text-violet-300 group-hover:text-white transition-colors">
              <Scale className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-zinc-100 group-hover:text-violet-200 transition-colors">
                AI Vakil
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Legal Intelligence
            </p>
          </div>
        </Link>
      </div>

      {/* Action Slot: Quick Upload CTA */}
      <div className="p-3">
        <button
          type="button"
          onClick={onUploadClick}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600/15 hover:bg-violet-600/25 text-violet-200 border border-violet-500/30 hover:border-violet-500/50 py-2.5 px-3 text-xs font-semibold transition-all shadow-sm shadow-violet-900/20 group"
        >
          <PlusCircle className="h-4 w-4 text-violet-400 group-hover:scale-110 transition-transform" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 px-3 py-2 space-y-4 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            Navigation
          </div>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                  isActive
                    ? "bg-violet-500/15 text-violet-200 border border-violet-500/25 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-violet-400"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant={item.badgeVariant || "default"}
                    size="sm"
                    className={cn(
                      "text-[10px] px-1.5 py-0",
                      isActive && "border-violet-500/30 text-violet-200 bg-violet-500/20"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>

        {/* Workspace Group */}
        <div className="space-y-1 pt-1 border-t border-white/[0.04]">
          <div className="px-3 pb-1 pt-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            Workspace
          </div>
          {workspaceNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                  isActive
                    ? "bg-violet-500/15 text-violet-200 border border-violet-500/25 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-violet-400"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Options */}
        <div className="space-y-1 pt-1 border-t border-white/[0.04]">
          <div className="px-3 pb-1 pt-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            System
          </div>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                  isActive
                    ? "bg-violet-500/15 text-violet-200 border border-violet-500/25 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive
                        ? "text-violet-400"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Security & Jurisdiction Badge */}
      <div className="p-3 mx-3 mb-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-zinc-400">
        <div className="flex items-center gap-1.5 text-zinc-300 font-medium mb-1">
          <Shield className="h-3.5 w-3.5 text-violet-400" />
          <span>Privileged & Confidential</span>
        </div>
        <p className="text-[10px] text-zinc-500 leading-normal">
          Client-attorney data isolation guaranteed under Section 126 IEA.
        </p>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-white/[0.06]">
        <Link
          href="/settings"
          className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.04] transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <Avatar name="Riya Bhardwaj" size="sm" status="online" />
            <div className="space-y-0.5 text-left">
              <div className="text-xs font-medium text-zinc-200 group-hover:text-violet-300 transition-colors">
                Riya Bhardwaj
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                Legal Lead
              </div>
            </div>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
        </Link>
      </div>
    </aside>
  );
}

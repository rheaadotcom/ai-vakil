"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Command,
  FileUp,
  User,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  Calendar,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "@/components/ui/dropdown";
import { mockNotifications, mockUserProfile } from "@/lib/mock-dashboard";

export interface TopBarProps {
  onMenuToggle?: () => void;
  onUploadClick?: () => void;
  className?: string;
}

export function TopBar({
  onMenuToggle,
  onUploadClick,
  className,
}: TopBarProps) {
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <header
      className={cn(
        "h-16 border-b border-white/[0.08] bg-[#0A0A0D]/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20",
        className
      )}
    >
      {/* Left: Mobile Toggle & Context Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs">
          <Link href="/dashboard" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            Workspace
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="font-medium text-zinc-200 truncate max-w-[200px] md:max-w-xs">
            Residential Rental Agreement
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-violet-500/15 text-violet-300 border border-violet-500/30">
            12 Pages
          </span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search clauses, obligations, legal definitions..."
            className="w-full h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-12 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.05] text-[10px] font-mono text-zinc-400 pointer-events-none">
            <Command className="h-2.5 w-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right: Actions, Notifications, AI Status & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Engine status indicator */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Vakil Engine 2.4</span>
        </div>

        {/* Notifications Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <button
              type="button"
              className="relative p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-[#0A0A0D]" />
              )}
            </button>
          </DropdownTrigger>
          <DropdownContent align="right" className="w-80">
            <div className="flex items-center justify-between px-2.5 py-1">
              <DropdownLabel className="px-0 py-0">Notifications</DropdownLabel>
              <span className="text-[10px] font-mono text-violet-400">
                {unreadCount} unread
              </span>
            </div>
            <DropdownSeparator />
            <div className="max-h-72 overflow-y-auto space-y-0.5">
              {mockNotifications.map((n) => {
                const icon =
                  n.type === "document" ? (
                    <FileText className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                  ) : n.type === "date" ? (
                    <Calendar className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  );

                return (
                  <DropdownItem key={n.id} className="flex flex-col items-start gap-1 py-2">
                    <div className="flex items-center gap-2 w-full">
                      {icon}
                      <span className="font-semibold text-xs text-zinc-200 truncate flex-1">
                        {n.title}
                      </span>
                      {n.unread && (
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-normal line-clamp-2">
                      {n.description}
                    </p>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {n.timestamp}
                    </span>
                  </DropdownItem>
                );
              })}
            </div>
          </DropdownContent>
        </Dropdown>

        {/* Quick Upload Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={onUploadClick}
          leftIcon={<FileUp className="h-3.5 w-3.5" />}
          className="shadow-sm shadow-violet-600/30"
        >
          <span className="hidden sm:inline">Upload</span>
          <span className="sm:hidden">Upload</span>
        </Button>

        {/* User Profile Menu */}
        <Dropdown>
          <DropdownTrigger>
            <button
              type="button"
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/[0.06] transition-colors focus:outline-none"
              aria-label="User profile menu"
            >
              <Avatar name={mockUserProfile.name} size="sm" status="online" />
            </button>
          </DropdownTrigger>
          <DropdownContent align="right" className="w-56">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-zinc-100">{mockUserProfile.name}</p>
              <p className="text-[11px] text-zinc-400 truncate">{mockUserProfile.email}</p>
              <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30">
                {mockUserProfile.role}
              </span>
            </div>
            <DropdownSeparator />
            <Link href="/settings">
              <DropdownItem className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-zinc-400" />
                <span>Account Profile</span>
              </DropdownItem>
            </Link>
            <Link href="/settings">
              <DropdownItem className="flex items-center gap-2">
                <SettingsIcon className="h-3.5 w-3.5 text-zinc-400" />
                <span>Workspace Settings</span>
              </DropdownItem>
            </Link>
            <Link href="/help">
              <DropdownItem className="flex items-center gap-2">
                <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
                <span>Help & Documentation</span>
              </DropdownItem>
            </Link>
            <DropdownSeparator />
            <Link href="/login">
              <DropdownItem destructive className="flex items-center gap-2">
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </DropdownItem>
            </Link>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  );
}

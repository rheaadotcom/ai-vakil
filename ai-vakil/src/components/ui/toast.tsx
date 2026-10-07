"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, "id">) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

// External store pattern for clean event distribution
class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners = new Set<(toasts: ToastItem[]) => void>();

  subscribe(listener: (toasts: ToastItem[]) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener([...this.toasts]);
    }
  }

  add(toastData: Omit<ToastItem, "id">) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { ...toastData, id };
    this.toasts = [...this.toasts, newToast];
    this.notify();

    setTimeout(() => {
      this.remove(id);
    }, toastData.duration || 4000);
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }
}

const store = new ToastStore();

export const toast = {
  success: (title: string, description?: string) => {
    store.add({ title, description, type: "success" });
  },
  error: (title: string, description?: string) => {
    store.add({ title, description, type: "error" });
  },
  warning: (title: string, description?: string) => {
    store.add({ title, description, type: "warning" });
  },
  info: (title: string, description?: string) => {
    store.add({ title, description, type: "info" });
  },
};

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    const unsubscribe = store.subscribe((updatedToasts) => {
      setToasts(updatedToasts);
    });
    return unsubscribe;
  }, []);

  const showToast = React.useCallback((toastData: Omit<ToastItem, "id">) => {
    store.add(toastData);
  }, []);

  const dismissToast = React.useCallback((id: string) => {
    store.remove(id);
  }, []);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />,
    error: <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />,
    info: <Info className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />,
  };

  const borderColors = {
    success: "border-emerald-500/30",
    error: "border-rose-500/30",
    warning: "border-amber-500/30",
    info: "border-violet-500/30",
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-2 sm:p-0">
        <AnimatePresence>
          {toasts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              className={cn(
                "pointer-events-auto flex items-start justify-between gap-3 rounded-xl border bg-[#0E0E14] p-3.5 shadow-2xl shadow-black/80 backdrop-blur-xl",
                borderColors[item.type || "info"]
              )}
            >
              <div className="flex items-start gap-2.5">
                {icons[item.type || "info"]}
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-zinc-100">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => dismissToast(item.id)}
                className="text-zinc-500 hover:text-zinc-200 transition-colors p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

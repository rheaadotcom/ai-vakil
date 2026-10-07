"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuthInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      id,
      label,
      error,
      leftIcon,
      rightIcon,
      helperText,
      className,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full space-y-1.5 text-left">
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-zinc-300 select-none"
        >
          {label}
          {required && (
            <span className="text-violet-400 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "flex h-11 w-full rounded-xl border border-white/[0.08] bg-[#0E0E14]/90 px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 backdrop-blur-md transition-all duration-200",
              "focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 focus:bg-[#12121A]",
              "hover:border-white/[0.14]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon ? "pl-10" : "pl-3.5",
              rightIcon ? "pr-10" : "pr-3.5",
              error
                ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20 text-red-200"
                : "",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-red-400 font-medium pl-0.5 animate-in fade-in-50 duration-150"
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-zinc-500 pl-0.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

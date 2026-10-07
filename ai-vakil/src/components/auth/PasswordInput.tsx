"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { AuthInput, AuthInputProps } from "./AuthInput";

export interface PasswordInputProps
  extends Omit<AuthInputProps, "type" | "leftIcon" | "rightIcon"> {
  showLockIcon?: boolean;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ showLockIcon = true, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <AuthInput
      ref={ref}
      type={showPassword ? "text" : "password"}
      leftIcon={
        showLockIcon ? (
          <Lock className="h-4 w-4 text-zinc-400" aria-hidden="true" />
        ) : undefined
      }
      rightIcon={
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-zinc-400 hover:text-zinc-200 transition-colors p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500/50"
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={0}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";

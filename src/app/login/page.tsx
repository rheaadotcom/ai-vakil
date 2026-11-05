"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import {
  AuthLayout,
  AuthCard,
  AuthInput,
  PasswordInput,
  SocialAuthButtons,
  ForgotPasswordModal,
} from "@/components/auth";
import { Button } from "@/components/ui/button";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/supabase/auth-errors";

export default function LoginPage() {
  const router = useRouter();

  // Form states
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authError, setAuthError] = React.useState<string | null>(null);

  // Validation states
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = React.useState(false);

  // Validate form
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);

    try {
      const { error } = await getSupabaseClient().auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setAuthError(getAuthErrorMessage(error, "sign-in"));
        return;
      }

      const nextPath = new URLSearchParams(window.location.search).get("next");
      const redirectTarget = nextPath
        ? new URL(nextPath, window.location.origin)
        : null;
      router.replace(
        redirectTarget?.origin === window.location.origin
          ? `${redirectTarget.pathname}${redirectTarget.search}${redirectTarget.hash}`
          : "/dashboard",
      );
    } catch {
      setAuthError("Unable to sign in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        {/* Card Header */}
        <div className="text-left space-y-1.5 mb-7">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Welcome back
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Sign in to continue to your AI Vakil workspace.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <AuthInput
            id="login-email"
            label="Email address"
            type="email"
            placeholder="advocate@lawfirm.in"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            error={errors.email}
            leftIcon={<Mail className="h-4 w-4 text-zinc-400" />}
            autoComplete="email"
            required
          />

          <PasswordInput
            id="login-password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            error={errors.password}
            autoComplete="current-password"
            required
          />

          {/* Remember me & Forgot Password */}
          <div className="flex justify-end text-xs pt-0.5">
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors focus:outline-none focus:underline"
            >
              Forgot password?
            </button>
          </div>

          {authError && (
            <p role="alert" className="text-xs text-red-400" aria-live="polite">
              {authError}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2 font-medium tracking-wide text-sm"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </Button>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0E0E14] px-3 text-zinc-500 font-mono tracking-widest uppercase text-[10px]">
                OR
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <SocialAuthButtons />

          {/* Footer switch to Register */}
          <p className="text-center text-xs text-zinc-400 pt-3">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors hover:underline"
            >
              Create account
            </Link>
          </p>
        </form>
      </AuthCard>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        open={showForgotModal}
        onOpenChange={setShowForgotModal}
      />
    </AuthLayout>
  );
}

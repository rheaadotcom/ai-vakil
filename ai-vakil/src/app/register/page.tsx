"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail } from "lucide-react";
import {
  AuthLayout,
  AuthCard,
  AuthInput,
  PasswordInput,
  PasswordStrength,
  SocialAuthButtons,
} from "@/components/auth";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  // Validation errors
  const [errors, setErrors] = React.useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      agreeTerms?: string;
    } = {};

    // Full Name
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    // Email
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // Password requirements: >= 8 chars, 1 uppercase, 1 number
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must include at least one uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must include at least one number.";
    }

    // Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Terms of Service Checkbox
    if (!agreeTerms) {
      newErrors.agreeTerms =
        "You must agree to the Terms of Service and Privacy Policy.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Mock register transition
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 750);
  };

  return (
    <AuthLayout>
      <AuthCard className="max-w-lg">
        {/* Card Header */}
        <div className="text-left space-y-1.5 mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Create your AI Vakil account
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Start understanding your legal documents with AI.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full Name */}
          <AuthInput
            id="register-name"
            label="Full Name"
            placeholder="Adv. Priya Sharma"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) {
                setErrors((prev) => ({ ...prev, fullName: undefined }));
              }
            }}
            error={errors.fullName}
            leftIcon={<User className="h-4 w-4 text-zinc-400" />}
            autoComplete="name"
            required
          />

          {/* Email Address */}
          <AuthInput
            id="register-email"
            label="Email Address"
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

          {/* Password */}
          <PasswordInput
            id="register-password"
            label="Password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            error={errors.password}
            autoComplete="new-password"
            required
          />

          {/* Password Strength Indicator */}
          <PasswordStrength password={password} />

          {/* Confirm Password */}
          <PasswordInput
            id="register-confirm-password"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: undefined,
                }));
              }
            }}
            error={errors.confirmPassword}
            autoComplete="new-password"
            required
          />

          {/* Terms Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none text-left">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  if (errors.agreeTerms) {
                    setErrors((prev) => ({ ...prev, agreeTerms: undefined }));
                  }
                }}
                className="h-4 w-4 mt-0.5 rounded border-white/[0.15] bg-[#0E0E14] text-violet-600 focus:ring-violet-500/30 focus:ring-offset-0 transition-colors cursor-pointer accent-violet-600 shrink-0"
              />
              <span className="text-xs text-zinc-400 leading-normal">
                I agree to the{" "}
                <span className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                  Privacy Policy
                </span>
                .
              </span>
            </label>
            {errors.agreeTerms && (
              <p
                role="alert"
                className="text-xs text-red-400 font-medium pl-6 pt-1 animate-in fade-in-50 duration-150 text-left"
              >
                {errors.agreeTerms}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2 font-medium tracking-wide text-sm"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Creating account…" : "Create Account"}
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

          {/* Footer switch to Login */}
          <p className="text-center text-xs text-zinc-400 pt-3">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

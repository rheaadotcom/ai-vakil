import type { User } from "@supabase/supabase-js";

export function getAuthUserDisplayName(
  user: User | null,
  fallback = "Account",
) {
  const fullName = user?.user_metadata?.full_name;
  if (typeof fullName === "string" && fullName.trim()) {
    return fullName.trim();
  }

  return user?.email?.split("@")[0] || fallback;
}

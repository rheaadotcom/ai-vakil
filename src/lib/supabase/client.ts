import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfigStatus } from "./config";

let supabaseClient: SupabaseClient | undefined;

export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    const { missingVariables } = getSupabaseConfigStatus();
    throw new Error(
      `Supabase is not configured. Set ${missingVariables.join(", ")} in .env.local.`,
    );
  }

  supabaseClient = createBrowserClient(url, publishableKey);
  return supabaseClient;
}

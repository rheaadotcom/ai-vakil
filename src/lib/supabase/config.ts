const requiredEnvironmentVariables = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
] as const;

export function getSupabaseConfigStatus() {
  const missingVariables = requiredEnvironmentVariables.filter((name) => {
    return !process.env[name];
  });

  return {
    isConfigured: missingVariables.length === 0,
    missingVariables,
  };
}

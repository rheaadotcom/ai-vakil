"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getSupabaseConfigStatus } from "@/lib/supabase/config";

interface AuthSessionContextValue {
  user: User | null;
  isLoading: boolean;
  authError: string | null;
}

const AuthSessionContext = createContext<AuthSessionContextValue>({
  user: null,
  isLoading: true,
  authError: null,
});

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!getSupabaseConfigStatus().isConfigured) {
      // Configuration missing; clear any auth error and stop loading.
      setAuthError(null);
      setIsLoading(false);
      return;
    }

    let isActive = true;
    let authStateEstablished = false;
    let hasAuthTransition = false;
    let authInitializationResolved = false;
    let client;
    try {
      client = getSupabaseClient();
    } catch {
      setAuthError("Authentication is temporarily unavailable.");
      setIsLoading(false);
      return;
    }

    const resolveAuthInitialization = () => {
      if (authInitializationResolved) {
        return;
      }
      authInitializationResolved = true;
      clearTimeout(authInitTimeoutId);
      if (isActive) {
        setIsLoading(false);
      }
    };

    // Safety fallback: never allow auth initialization to hang indefinitely.
    // If the session promise does not settle, resolve to a safe auth error state.
    const authInitTimeoutId = setTimeout(() => {
      if (isActive && !authInitializationResolved) {
        authStateEstablished = true;
        setAuthError("Authentication is temporarily unavailable. Please try again.");
        resolveAuthInitialization();
      }
    }, 10000);

    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        // Wait for explicit session fetch before clearing loading
        if (hasAuthTransition || authStateEstablished) {
          return;
        }
        // Keep loading true; will be handled in getSession call below
        setUser(session?.user ?? null);
        setAuthError(null);
        // Do not set isLoading false here
        return;
      } else {
        hasAuthTransition = true;
      }

      authStateEstablished = true;
      setUser(session?.user ?? null);
      setAuthError(null);
      resolveAuthInitialization();
    });

    void (async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await client.auth.getSession();
        if (!isActive || authStateEstablished) {
          return;
        }
        if (sessionError) {
          throw sessionError;
        }

        authStateEstablished = true;
        setUser(session?.user ?? null);
        setAuthError(null);
      } catch {
        if (isActive && !authStateEstablished) {
          // Preserve existing user (if any) to avoid flashing unauthenticated UI.
          setAuthError(
            "Authentication is temporarily unavailable. Please try again.",
          );
        }
      } finally {
        // Always resolve auth initialization — success, error, or otherwise.
        // Never leave isLoading stuck true, otherwise consumers (e.g. /documents) hang.
        resolveAuthInitialization();
      }
    })();

    return () => {
      isActive = false;
      clearTimeout(authInitTimeoutId);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthSessionContext.Provider value={{ user, isLoading, authError }}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  return useContext(AuthSessionContext);
}

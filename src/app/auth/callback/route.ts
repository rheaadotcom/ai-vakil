import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

function getSafeRedirectPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  try {
    const redirectUrl = new URL(value, "https://ai-vakil.invalid");
    if (redirectUrl.origin !== "https://ai-vakil.invalid") {
      return "/dashboard";
    }

    return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
  } catch {
    return "/dashboard";
  }
}

function getLoginErrorRedirect(requestUrl: URL, message: string) {
  const loginUrl = new URL("/login", requestUrl.origin);
  loginUrl.searchParams.set("authError", message.slice(0, 240));
  return NextResponse.redirect(loginUrl);
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const providerError =
    requestUrl.searchParams.get("error_description") ??
    requestUrl.searchParams.get("error");

  if (providerError) {
    return getLoginErrorRedirect(requestUrl, providerError);
  }

  const code = requestUrl.searchParams.get("code");
  if (!code) {
    return getLoginErrorRedirect(
      requestUrl,
      "Sign-in could not be completed because no authorization code was returned.",
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !publishableKey) {
    return getLoginErrorRedirect(
      requestUrl,
      "Sign-in is temporarily unavailable. Please try again later.",
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return getLoginErrorRedirect(requestUrl, error.message);
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to complete sign-in with the authentication service.";
    return getLoginErrorRedirect(requestUrl, message);
  }

  const redirectPath = getSafeRedirectPath(
    requestUrl.searchParams.get("next"),
  );
  return NextResponse.redirect(new URL(redirectPath, requestUrl.origin));
}

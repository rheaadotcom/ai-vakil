export function getAuthErrorMessage(
  error: { code?: string; message?: string },
  action: "sign-in" | "sign-up",
) {
  if (error.code === "invalid_credentials") {
    return "Email or password is incorrect.";
  }

  if (error.code === "email_not_confirmed") {
    return "Please confirm your email address before signing in.";
  }

  if (error.code === "user_already_exists") {
    return "An account with this email already exists. Try signing in instead.";
  }

  if (
    error.code === "over_email_send_rate_limit" ||
    error.code === "over_request_rate_limit"
  ) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }

  if (error.message?.toLowerCase().includes("fetch")) {
    return "Unable to reach the authentication service. Check your connection and try again.";
  }

  return action === "sign-in"
    ? "Unable to sign in right now. Please try again."
    : "Unable to create your account right now. Please try again.";
}

// Simple shared-password gate. The session cookie holds a hash of the
// password, so changing PASSWORD signs everyone out.

export const PASSWORD = "support4all";
export const SESSION_COOKIE = "aip_session";
export const SESSION_TTL_S = 30 * 24 * 60 * 60;

export async function sessionValue() {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`aip:${PASSWORD}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Only allow same-site relative paths as the post-login destination.
export function safeNext(next: string | null | undefined) {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : "/";
}

// Stateless magic-link auth. Tokens are HMAC-signed with AUTH_SECRET, so no
// database is needed: a short-lived "link" token goes in the email, and the
// verify route swaps it for a longer-lived "session" token in a cookie.

export const ALLOWED_DOMAINS = ["decagon.ai", "pandarecycling.co.uk"];
export const SESSION_COOKIE = "aip_session";
export const LINK_TTL_S = 15 * 60;
export const SESSION_TTL_S = 7 * 24 * 60 * 60;

type Payload = { e: string; t: "link" | "session"; x: number };

const enc = new TextEncoder();

function b64url(bytes: Uint8Array) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function key() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET must be set (32+ chars)");
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export function normaliseEmail(raw: unknown) {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  const m = /^[^\s@]+@([a-z0-9.-]+)$/.exec(email);
  if (!m || !ALLOWED_DOMAINS.includes(m[1])) return null;
  return email;
}

export async function sign(email: string, t: Payload["t"], ttl: number) {
  const body = b64url(enc.encode(JSON.stringify({ e: email, t, x: Math.floor(Date.now() / 1000) + ttl } satisfies Payload)));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await key(), enc.encode(body)));
  return `${body}.${b64url(sig)}`;
}

export async function verify(token: string | undefined, t: Payload["t"]) {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await key(), fromB64url(sig), enc.encode(body));
    if (!ok) return null;
    const p = JSON.parse(new TextDecoder().decode(fromB64url(body))) as Payload;
    if (p.t !== t || p.x < Date.now() / 1000 || !normaliseEmail(p.e)) return null;
    return p.e;
  } catch {
    return null;
  }
}

// Only allow same-site relative paths as the post-login destination.
export function safeNext(next: string | null | undefined) {
  return next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\") ? next : "/";
}

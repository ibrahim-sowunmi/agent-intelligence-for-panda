import { NextResponse } from "next/server";
import { PASSWORD, SESSION_COOKIE, SESSION_TTL_S, safeNext, sessionValue } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body.password !== PASSWORD) return Response.json({ error: "That password isn't right." }, { status: 401 });

  const res = NextResponse.json({ ok: true, next: safeNext(body.next) });
  res.cookies.set(SESSION_COOKIE, await sessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_S,
  });
  return res;
}

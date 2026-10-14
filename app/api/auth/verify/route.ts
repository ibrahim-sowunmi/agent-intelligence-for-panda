import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, SESSION_TTL_S, safeNext, sign, verify } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const email = await verify(params.get("token") ?? undefined, "link");
  if (!email) return NextResponse.redirect(new URL("/login?error=expired", request.url));

  const res = NextResponse.redirect(new URL(safeNext(params.get("next")), request.url));
  res.cookies.set(SESSION_COOKIE, await sign(email, "session", SESSION_TTL_S), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_S,
  });
  return res;
}

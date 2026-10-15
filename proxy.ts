import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, sessionValue } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  if (request.cookies.get(SESSION_COOKIE)?.value === (await sessionValue())) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  const next = request.nextUrl.pathname + request.nextUrl.search;
  if (next !== "/") url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except the login page, the auth routes, and the assets the login page needs.
  matcher: ["/((?!login|api/auth|_next/static|_next/image|brand/|favicon.ico).*)"],
};

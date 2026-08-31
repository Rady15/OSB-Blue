import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const SESSION_COOKIE = "osb-admin-session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/admin/api");
  if (isAdminPage) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
}

export const config = { matcher: ["/admin/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"] };

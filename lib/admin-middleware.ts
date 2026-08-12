import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    const session = verifySession(token);
    if (!session) {
      const response = NextResponse.redirect(new URL("/admin/login", req.url));
      response.cookies.delete(SESSION_COOKIE);
      return response;
    }
    return handler(req);
  };
}

export function requireAuth(request: NextRequest): boolean {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySession(token) !== null;
}

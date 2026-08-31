import { NextRequest, NextResponse } from "next/server";
import { createSession, SESSION_COOKIE, SESSION_TTL, verifyPassword, getAdminPasswordHash } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";
    if (!password || password.length > 256 || !verifyPassword(password, getAdminPasswordHash())) {
      return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
    }
    const token = createSession("admin");
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_TTL / 1000,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export const runtime = "nodejs";

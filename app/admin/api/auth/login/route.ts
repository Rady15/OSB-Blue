import { NextRequest, NextResponse } from "next/server";
import { createSession, SESSION_COOKIE, SESSION_TTL, verifyPassword, hashPassword } from "@/lib/auth";
import { store } from "@/lib/store";

const ADMIN_PASSWORD_HASH = hashPassword(process.env.ADMIN_PASSWORD || "OSB@2026!");

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!verifyPassword(password, ADMIN_PASSWORD_HASH)) {
      return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const token = createSession("admin");
    const response = NextResponse.json({ success: true });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_TTL / 1000,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export const runtime = "nodejs";

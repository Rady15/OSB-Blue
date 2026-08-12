import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { contentStore } from "@/lib/content-store";

function checkAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token || !verifySession(token)) return false;
  return true;
}

async function GET() {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  return NextResponse.json(contentStore.getBranding());
}

async function PUT(request: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    const body = await request.json();
    contentStore.saveBranding(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "خطأ في الحفظ" }, { status: 500 });
  }
}

export { GET, PUT };
export const runtime = "nodejs";

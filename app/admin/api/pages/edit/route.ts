import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

function checkAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token || !verifySession(token)) return false;
  return true;
}

async function GET(request: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const path = request.nextUrl.searchParams.get("path");
  if (!path) return NextResponse.json({ error: "المسار مطلوب" }, { status: 400 });
  
  const { contentStore } = await import("@/lib/content-store");
  const page = contentStore.getPage(path);
  if (!page) return NextResponse.json({ error: "الصفحة غير موجودة" }, { status: 404 });
  return NextResponse.json(page);
}

export { GET };
export const runtime = "nodejs";

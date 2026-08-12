import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { store } from "@/lib/store";

function checkAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token || !verifySession(token)) return false;
  return true;
}

async function GET(request: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const type = request.nextUrl.searchParams.get("type");
  if (type === "seo") {
    return NextResponse.json(store.getSEO());
  }
  return NextResponse.json(store.getSettings());
}

async function POST(request: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    const type = request.nextUrl.searchParams.get("type");
    const body = await request.json();

    if (type === "seo") {
      store.saveSEO(body);
      return NextResponse.json({ success: true });
    }

    store.saveSettings(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "خطأ في الحفظ" }, { status: 500 });
  }
}

export { GET, POST };
export const runtime = "nodejs";

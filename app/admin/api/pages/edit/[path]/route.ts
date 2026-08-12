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

  const fs = await import("fs");
  const pathModule = await import("path");
  const storeDir = pathModule.join(process.cwd(), "data", "store");
  const pagesPath = pathModule.join(storeDir, "pages.json");
  if (!fs.existsSync(pagesPath)) {
    return NextResponse.json({ error: "الصفحة غير موجودة" }, { status: 404 });
  }
  const pages: any[] = JSON.parse(fs.readFileSync(pagesPath, "utf-8"));
  const page = pages.find((p) => p.path === path);
  if (!page) return NextResponse.json({ error: "الصفحة غير موجودة" }, { status: 404 });
  return NextResponse.json(page);
}

async function PUT(request: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    const body = await request.json();
    const fs = await import("fs");
    const pathModule = await import("path");
    const storeDir = pathModule.join(process.cwd(), "data", "store");
    const pagesPath = pathModule.join(storeDir, "pages.json");

    const pages: any[] = fs.existsSync(pagesPath) ? JSON.parse(fs.readFileSync(pagesPath, "utf-8")) : [];
    const idx = pages.findIndex((p) => p.path === body.path);
    if (idx >= 0) {
      pages[idx] = { ...pages[idx], ...body, updatedAt: new Date().toISOString() };
    } else {
      pages.push({ ...body, updatedAt: new Date().toISOString() });
    }
    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "خطأ في الحفظ" }, { status: 500 });
  }
}

export { GET, PUT };
export const runtime = "nodejs";

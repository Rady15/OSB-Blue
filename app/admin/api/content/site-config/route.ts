import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

function checkAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token || !verifySession(token)) return false;
  return true;
}

async function GET() {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { siteConfig } = await import("@/data/siteConfig");
  return NextResponse.json(siteConfig);
}

async function PUT(request: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    const body = await request.json();
    const fs = await import("fs");
    const path = await import("path");
    const storeDir = path.join(process.cwd(), "data", "store");
    fs.writeFileSync(path.join(storeDir, "siteConfig.json"), JSON.stringify(body, null, 2), "utf-8");
    
    const { execSync } = await import("child_process");
    execSync("npx tsx scripts/sync-data.ts", { cwd: process.cwd(), stdio: "ignore" });
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "خطأ في الحفظ" }, { status: 500 });
  }
}

export { GET, PUT };
export const runtime = "nodejs";

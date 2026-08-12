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
  const fs = await import("fs");
  const path = await import("path");
  const storeDir = path.join(process.cwd(), "data", "store");
  const pagesPath = path.join(storeDir, "pages.json");
  if (!fs.existsSync(pagesPath)) {
    return NextResponse.json([]);
  }
  const pages = JSON.parse(fs.readFileSync(pagesPath, "utf-8"));
  return NextResponse.json(pages);
}

export { GET };
export const runtime = "nodejs";

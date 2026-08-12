import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

function checkAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token || !verifySession(token)) return false;
  return true;
}

async function POST(request: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    ensureUploadDir();
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "لا يوجد ملف" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "نوع الملف غير مدعوم" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "حجم الملف يتجاوز 10MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    writeFileSync(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}`, filename });
  } catch {
    return NextResponse.json({ error: "خطأ في رفع الملف" }, { status: 500 });
  }
}

export { POST };
export const runtime = "nodejs";

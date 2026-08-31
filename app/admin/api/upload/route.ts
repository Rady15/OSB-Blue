import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function checkAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return !!token && !!verifySession(token);
}

function extensionFor(type: string) {
  return ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" } as Record<string, string>)[type];
}

function validMagic(type: string, buffer: Buffer) {
  if (type === "image/jpeg") return buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]));
  if (type === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  if (type === "image/gif") return buffer.subarray(0, 6).toString() === "GIF87a" || buffer.subarray(0, 6).toString() === "GIF89a";
  if (type === "image/webp") return buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP";
  return false;
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "لا يوجد ملف" }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "حجم الملف يتجاوز 5MB" }, { status: 400 });

    const extension = extensionFor(file.type);
    if (!extension) return NextResponse.json({ error: "يسمح فقط بـ JPG وPNG وWEBP وGIF" }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!validMagic(file.type, buffer)) return NextResponse.json({ error: "الملف ليس صورة صالحة" }, { status: 400 });

    await mkdir(UPLOAD_DIR, { recursive: true });
    const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${extension}`;
    await writeFile(path.join(UPLOAD_DIR, filename), buffer, { flag: "wx" });
    return NextResponse.json({ url: `/uploads/${filename}`, filename });
  } catch {
    return NextResponse.json({ error: "خطأ في رفع الملف" }, { status: 500 });
  }
}

export const runtime = "nodejs";

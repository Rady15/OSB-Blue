import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

const leadsFile = path.join(process.cwd(), "data", "store", "leads.json");

export async function GET() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token || !verifySession(token)) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    const raw = await fs.readFile(leadsFile, "utf8");
    const leads = JSON.parse(raw);
    return NextResponse.json(Array.isArray(leads) ? leads.slice().reverse() : []);
  } catch {
    return NextResponse.json([]);
  }
}

export const runtime = "nodejs";

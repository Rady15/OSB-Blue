import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const requestSchema = z.object({
  fullName: z.string().trim().min(3).max(120),
  phone: z.string().trim().regex(/^05\d{8}$/),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  businessNature: z.string().trim().max(500).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

const leadsFile = path.join(process.cwd(), "data", "store", "leads.json");
let lastRequestAt = 0;

async function saveLead(lead: unknown) {
  await fs.mkdir(path.dirname(leadsFile), { recursive: true });
  let leads: unknown[] = [];
  try {
    leads = JSON.parse(await fs.readFile(leadsFile, "utf8"));
    if (!Array.isArray(leads)) leads = [];
  } catch {}
  leads.push(lead);
  await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2), "utf8");
}

export async function POST(request: Request) {
  const now = Date.now();
  if (now - lastRequestAt < 1500) {
    return NextResponse.json({ success: false, error: "يرجى المحاولة بعد لحظات" }, { status: 429 });
  }
  lastRequestAt = now;

  try {
    const body = await request.json();
    const result = requestSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ success: false, error: "تحقق من البيانات المدخلة" }, { status: 400 });
    if (result.data.website) return NextResponse.json({ success: true });

    const lead = {
      id: crypto.randomUUID(),
      ...result.data,
      source: "website",
      createdAt: new Date().toISOString(),
    };
    await saveLead(lead);

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(lead),
          cache: "no-store",
        });
      } catch {
        // The lead is already persisted locally; delivery can be retried externally.
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "تعذر إرسال الطلب الآن" }, { status: 500 });
  }
}

export const runtime = "nodejs";

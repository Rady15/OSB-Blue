import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().regex(/^05\d{8}$/),
  email: z.string().optional(),
  businessNature: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = requestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // TODO: ربط لاحقاً بـ CRM حقيقي أو WhatsApp Business API حسب قرار العميل
  return NextResponse.json({ success: true });
}

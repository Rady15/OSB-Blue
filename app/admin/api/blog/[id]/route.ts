import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { store } from "@/lib/store";
import { notifyGoogleUrlUpdated } from "@/lib/google-indexing";

function checkAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token || !verifySession(token)) {
    return false;
  }
  return true;
}

async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const post = store.getBlogPost(params.id);
  if (!post) {
    return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
  }
  return NextResponse.json(post);
}

async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    const existing = store.getBlogPost(params.id);
    if (!existing) {
      return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
    }

    const body = await request.json();
    const updated = {
      ...existing,
      ...body,
      id: existing.id,
      updatedAt: new Date().toISOString(),
    };

    if (body.status === "published" && !existing.publishedAt) {
      updated.publishedAt = new Date().toISOString();
    }

    store.saveBlogPost(updated);

    // Notify Google whenever a published URL is created or materially updated.
    if (updated.status === "published") {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://osb.com.sa";
      void notifyGoogleUrlUpdated(`${siteUrl.replace(/\/$/, "")}/blog/${updated.slug}`).then((result) => {
        if (!result.ok && result.error !== "disabled") {
          console.warn("[Google Indexing] update notification failed:", result.error);
        }
      });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "خطأ في التحديث" }, { status: 500 });
  }
}

async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const existing = store.getBlogPost(params.id);
  if (!existing) {
    return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
  }
  store.deleteBlogPost(params.id);
  return NextResponse.json({ success: true });
}

export { GET, PUT, DELETE };
export const runtime = "nodejs";

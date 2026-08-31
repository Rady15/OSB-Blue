import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { store } from "@/lib/store";
import { BlogPost } from "@/data/store";
import { notifyGoogleUrlUpdated } from "@/lib/google-indexing";

function checkAuth() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token || !verifySession(token)) {
    return false;
  }
  return true;
}

async function GET() {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const posts = store.getBlogPosts().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json(posts);
}

async function POST(request: NextRequest) {
  if (!checkAuth()) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, author, category, tags, status, seoTitle, seoDescription } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "العنوان والمحتوى مطلوبان" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const post: BlogPost = {
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${Date.now()}`,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, "-"),
      excerpt: excerpt || "",
      content,
      coverImage: coverImage || "",
      author: author || "OSB",
      category: category || "عام",
      tags: Array.isArray(tags) ? tags : [],
      status: status || "draft",
      seoTitle: seoTitle || "",
      seoDescription: seoDescription || "",
      publishedAt: status === "published" ? now : undefined,
      createdAt: now,
      updatedAt: now,
    };

    store.saveBlogPost(post);

    // Fire-and-forget: publishing a post should never fail just because Google's
    // notification service is unavailable. Sitemap inclusion remains the primary
    // discovery mechanism for normal editorial content.
    if (post.status === "published") {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://osb.com.sa";
      void notifyGoogleUrlUpdated(`${siteUrl.replace(/\/$/, "")}/blog/${post.slug}`).then((result) => {
        if (!result.ok && result.error !== "disabled") {
          console.warn("[Google Indexing] publish notification failed:", result.error);
        }
      });
    }

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "خطأ في الحفظ" }, { status: 500 });
  }
}

export { GET, POST };
export const runtime = "nodejs";

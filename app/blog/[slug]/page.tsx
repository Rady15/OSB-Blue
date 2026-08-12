import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { store } from "@/lib/store";

export async function generateStaticParams() {
  const posts = store.getBlogPosts().filter((p) => p.status === "published");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = store.getBlogPostBySlug(params.slug);
  if (!post) return { title: "المقال غير موجود" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = store.getBlogPostBySlug(params.slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <div dir="rtl" className="min-h-screen bg-black">
      <article className="min-h-screen">
        {/* Cover image */}
        {post.coverImage && (
          <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        )}

        <div className="relative -mt-20 z-10 container-osb">
          <div className="max-w-3xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              جميع المقالات
            </Link>

            {/* Meta */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-white/40">
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              )}
              {post.category && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                  {post.category}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-extrabold text-white md:text-5xl leading-[1.5]">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mb-8 text-xl text-white/60 leading-relaxed">{post.excerpt}</p>
            )}

            {/* Content */}
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-extrabold
                prose-p:text-white/70 prose-p:leading-8
                prose-a:text-[#2563eb] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-white/70 prose-ol:text-white/70
                prose-li:text-white/70
                prose-blockquote:border-r-4 prose-blockquote:border-[#2563eb] prose-blockquote:bg-white/5 prose-blockquote:text-white/60
                prose-hr:border-white/10
                prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                prose-code:text-[#2563eb] prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg
                prose-pre:bg-[#071527] prose-pre:border prose-pre:border-white/10
                [&_*]:font-tajawal"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-8">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/40">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

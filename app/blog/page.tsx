import { Metadata } from "next";
import Link from "next/link";
import { store } from "@/lib/store";
import { getT } from "@/lib/get-t";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getT();
  return {
    title: t("page.blog.metaTitle"),
    metadataBase: new URL("https://osb.com.sa"),
    description: t("page.blog.metaDescription"),
    alternates: { canonical: "/blog" },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage() {
  const { t, lang, dir } = getT();
  const posts = store.getBlogPosts().filter((p) => p.status === "published");
  const locale = lang === "ar" ? "ar-SA" : "en-US";

  return (
    <div dir={dir} className="min-h-screen bg-black">
      <section className="relative overflow-hidden bg-black pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,0.25),transparent_40%)]" />
        <div className="relative z-10 container-osb text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-6xl">{t("page.blog.title")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            {t("page.blog.description")}
          </p>
        </div>
      </section>

      <section className="relative bg-black pb-24">
        <div className="container-osb">
          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-white/40">{t("page.blog.empty")}</p>
              <Link href="/" className="mt-4 inline-block text-[#2563eb] hover:underline">
                {t("page.blog.backHome")}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-[#0B1F3A] overflow-hidden transition hover:border-white/20"
                >
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      {post.category && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                          {post.category}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="text-xs text-white/30">
                          {new Date(post.publishedAt).toLocaleDateString(locale)}
                        </span>
                      )}
                    </div>
                    <h2 className="mb-2 text-lg font-bold text-white group-hover:text-[#2563eb] transition">
                      {post.title}
                    </h2>
                    <p className="text-sm text-white/40 line-clamp-2">{post.excerpt}</p>
                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

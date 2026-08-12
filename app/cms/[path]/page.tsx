import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { contentStore } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { path: string } }): Promise<Metadata> {
  const page = contentStore.getPage("/" + params.path);
  if (!page) return { title: "غير موجود" };
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
  };
}

export default async function CMSPage({ params }: { params: { path: string } }) {
  const path = "/" + params.path;
  const page = contentStore.getPage(path);

  if (!page) {
    notFound();
  }

  return (
    <div dir="rtl" className="min-h-screen">
      <ContentRenderer path={path} />
    </div>
  );
}

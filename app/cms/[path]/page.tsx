import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { getT } from "@/lib/get-t";
import { contentStore } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { path: string } }): Promise<Metadata> {
  const { t } = getT();
  const page = contentStore.getPage("/" + params.path);
  if (!page) return { title: t("common.notFound") };
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
  };
}

export default async function CMSPage({ params }: { params: { path: string } }) {
  const { dir } = getT();
  const path = "/" + params.path;
  const page = contentStore.getPage(path);

  if (!page) {
    notFound();
  }

  return (
    <div dir={dir} className="min-h-screen">
      <ContentRenderer path={path} />
    </div>
  );
}

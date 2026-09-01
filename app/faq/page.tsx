import type { Metadata } from "next";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";
import { getT } from "@/lib/get-t";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getT();
  return {
    title: t("page.faq.metaTitle"),
    description: t("page.faq.metaDescription"),
  };
}

export default function FaqPage() {
  const { t } = getT();
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <PageHero
        title={t("page.faq.heroTitle")}
        description={t("page.faq.heroDescription")}
      />
      <section className="bg-black py-24">
        <div className="container-osb max-w-4xl">
          <FaqAccordion />
        </div>
      </section>
    </div>
  );
}

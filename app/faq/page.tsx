import type { Metadata } from "next";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | OSB",
  description: "إجابات مختصرة على الأسئلة الشائعة حول خدمات OSB.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <PageHero
        title="الأسئلة الشائعة"
        description="إجابات مختصرة تساعدك على فهم طريقة عمل OSB والخطوة الأنسب قبل البدء."
      />
      <section className="bg-black py-24">
        <div className="container-osb max-w-4xl">
          <FaqAccordion />
        </div>
      </section>
    </div>
  );
}

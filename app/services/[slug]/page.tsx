import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { serviceCta, services } from "@/data/services";
import { icons } from "@/lib/icons";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

type ServicePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) return {};

  return {
    title: `${service.title} | OSB`,
    description: service.problemParagraphs[0],
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) notFound();
  const Icon = icons[service.icon] ?? icons.BriefcaseBusiness;
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <PageHero eyebrow={service.title} title={service.heroQuestion} description={service.problemParagraphs[0]}>
        <div className="grid gap-4">
          <Icon className="h-12 w-12 text-white" />
          <p className="text-2xl font-extrabold text-white">{service.title}</p>
          <p className="leading-8 text-white/55">نبدأ بالتشخيص، ثم نحدد الخطوة العملية الأقرب لوضع مشروعك.</p>
        </div>
      </PageHero>

      <section className="bg-black py-24">
        <div className="container-osb grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            {service.problemParagraphs.map((paragraph) => (
              <p key={paragraph} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-lg leading-9 text-white/60">
                {paragraph}
              </p>
            ))}
            <div className="glow-panel rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-black p-7">
                <ScrollRevealText as="h2" text="كيف نساعدك؟" className="text-2xl font-extrabold text-white" />
                <p className="mt-4 text-lg leading-9 text-white/60">{service.solutionParagraph}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 shadow-[0_0_45px_rgba(37,99,235,0.08)]">
            <ScrollRevealText as="h2" text="هذه الخدمة مناسبة لك إذا كنت..." className="text-2xl font-extrabold text-white" />
            <ul className="mt-6 grid gap-4">
              {service.suitableIf.map((item) => (
                <li key={item} className="flex gap-3 leading-8 text-white/60">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-white" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#111] py-16">
        <div className="container-osb">
          <div className="rounded-[2rem] border border-white/10 bg-black p-8 md:p-12">
          <ScrollRevealText as="h2" text={serviceCta.title} wordsPerLine={6} className="text-3xl font-extrabold" />
          <p className="mt-4 max-w-3xl text-lg leading-9 text-white/60">{serviceCta.description}</p>
          <div className="mt-8">
            <LinkButton href="/free-consultation">{serviceCta.button}</LinkButton>
          </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="container-osb">
          <ScrollRevealText as="h2" text="خدمات أخرى قد تهمك" className="mb-6 text-2xl font-extrabold text-white" />
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 font-bold text-white transition hover:bg-white hover:text-black">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

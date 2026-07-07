import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { serviceCta, services } from "@/data/services";
import { icons } from "@/lib/icons";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

const serviceImages: Record<string, string> = {
  "company-formation": "https://tanfeth.sa/wp-content/uploads/2026/06/%D8%AA%D8%A3%D8%B3%D9%8A%D8%B3-%D9%85%D8%A4%D8%B3%D8%B3%D8%A9-%D9%81%D8%B1%D8%AF%D9%8A%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9.png",
  "legal-consulting": "https://www.alsaqrlaw.com/wp-content/uploads/2025/11/8-980x580-2.png",
  "accounting-tax": "https://sadanykhalifa.com/uploads/Blog/1745571118.webp",
  "feasibility-studies": "https://mega-consultations.com/photos/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AC%D8%AF%D9%88%D9%89/%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AC%D8%AF%D9%88%D9%89.jpg",
  "digital-marketing": "https://mbridges-sa.com/ar/wp-content/uploads/2025/02/%D9%83%D9%8A%D9%81-%D8%AA%D8%AE%D8%AA%D8%A7%D8%B1-%D8%B4%D8%B1%D9%83%D8%A9-%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A-%D9%86%D8%A7%D8%AC%D8%AD%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9%D8%9F.webp",
  "automation": "https://sabbar-prod-uploaded-files.s3.eu-west-1.amazonaws.com/submissions/blog-posts/a40091e3-3403-4cda-b251-54d59945898e.webp",
  "government-procedures": "/images/operations-dashboard.svg",
  "office-rental": "/images/operations-dashboard.svg",
};

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
  const imgSrc = serviceImages[service.slug] ?? "/images/operations-dashboard.svg";
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <PageHero eyebrow={service.title} title={service.heroQuestion} description={service.problemParagraphs[0]}>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10">
          <div className="grid gap-4">
            <Icon className="h-12 w-12 text-white" />
            <p className="text-2xl font-extrabold text-white">{service.title}</p>
            <p className="leading-8 text-white/55">نبدأ بالتشخيص، ثم نحدد الخطوة العملية الأقرب لوضع مشروعك.</p>
          </div>
          <div className="overflow-hidden rounded-[1.5rem]">
            <img src={imgSrc} alt={service.title} className="h-full w-full object-cover" />
          </div>
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

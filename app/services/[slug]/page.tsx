import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { serviceCta, services } from "@/data/services";
import { icons } from "@/lib/icons";
import { LinkButton } from "@/components/ui/Button";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

const serviceImages: Record<string, string> = {
  "strategy-planning": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "accounting-compliance": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
  "marketing-branding": "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&q=80",
  "digital-solutions": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "business-automation": "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80",
  "business-infrastructure": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
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
    metadataBase: new URL("https://osb.com.sa"),
    title: `${service.title} | OSB`,
    description: service.problemParagraphs[0],
    alternates: { canonical: `/services/${service.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      url: `https://osb.com.sa/services/${service.slug}`,
      title: `${service.title} | OSB`,
      description: service.problemParagraphs[0],
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = services.find((item) => item.slug === params.slug);
  if (!service) notFound();
  const Icon = icons[service.icon] ?? icons.BriefcaseBusiness;
  const imgSrc = service.image || (serviceImages[service.slug] ?? "/images/operations-dashboard.svg");
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.problemParagraphs[0],
    provider: { "@type": "Organization", name: "OSB — One Stop Business", url: "https://osb.com.sa" },
    url: `https://osb.com.sa/services/${service.slug}`,
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden bg-black pb-20 pt-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(37,99,235,0.28),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.09),transparent_24%)]" />
        <div className="soft-light-beam right-0 top-28" />
        <div className="container-osb relative z-10">
          <p className="mb-5 text-sm font-bold text-white/55">{service.title}</p>
          <ScrollRevealText
            as="h1"
            text={service.heroQuestion}
            wordsPerLine={4}
            className="max-w-5xl text-5xl font-extrabold leading-[1.5] md:text-7xl"
          />
          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-black p-5">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10">
              <div className="grid gap-4">
                <Icon className="h-12 w-12 text-white" />
                <p className="text-2xl font-extrabold text-white">{service.title}</p>
                <p className="leading-8 text-white/55">{service.shortDescription || service.heroQuestion}</p>
              </div>
              <div className="overflow-hidden rounded-[1.5rem] aspect-[4/3] lg:aspect-auto lg:h-full">
                <img src={imgSrc} alt={service.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

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

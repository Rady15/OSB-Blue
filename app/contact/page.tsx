import type { Metadata } from "next";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "تواصل معنا | OSB",
  description: "سواء كنت في مرحلة الفكرة أو التأسيس أو التوسع، فريقنا جاهز للإجابة على استفساراتك.",
};

export default function ContactPage() {
  const contactItems = [
    { icon: Phone, label: "الهاتف", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { icon: Mail, label: "البريد", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: "العنوان", value: siteConfig.address, href: null },
    ...(siteConfig.social.instagram ? [{ icon: Instagram, label: "Instagram", value: "@osb.ksa", href: siteConfig.social.instagram }] : []),
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <PageHero
        title="تواصل معنا"
        description="سواء كنت في مرحلة الفكرة أو التأسيس أو التوسع، فريقنا جاهز للإجابة على استفساراتك."
      />
      <section className="bg-black py-24">
        <div className="container-osb grid gap-8 lg:grid-cols-2">
          <div className="grid gap-5">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <Icon className="h-7 w-7 text-white transition group-hover:text-[#2563eb]" />
                <div>
                    <p className="font-bold text-white transition group-hover:text-black">{item.label}</p>
                    <p className="mt-2 text-white/55 transition group-hover:text-black/60">{item.value}</p>
                </div>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Instagram" ? "_blank" : undefined}
                  rel={item.label === "Instagram" ? "noreferrer" : undefined}
                  className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_0_45px_rgba(37,99,235,0.08)] transition hover:bg-white hover:text-black"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_0_45px_rgba(37,99,235,0.08)]">
                  {content}
                </div>
              );
            })}
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_0_45px_rgba(37,99,235,0.08)]">
              <p className="font-bold text-white">ساعات العمل</p>
              <p className="mt-2 text-white/55">{siteConfig.workingHours}</p>
            </div>
          </div>
          <div className="glow-panel min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3">
            <iframe
              title="موقع OSB في الخبر"
              src="https://www.google.com/maps?q=%D8%A7%D9%84%D8%AE%D8%A8%D8%B1%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9&output=embed"
              className="h-full min-h-[420px] w-full rounded-[1.5rem]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

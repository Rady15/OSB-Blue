import type { Metadata } from "next";
import Image from "next/image";
import { partners } from "@/data/partners";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "شركاء النجاح | OSB",
  description: "شركاء النجاح في منظومة OSB.",
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <PageHero
        title="شركاء النجاح"
        description="نختار شبكة الشركاء بعناية حتى يحصل صاحب المشروع على خبرة متخصصة وتنفيذ موثوق في كل خطوة."
      />
      <section className="bg-black py-24">
        <div className="container-osb grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <div key={partner.name} data-tilt className="tilt-card group flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.035] p-8 text-center shadow-[0_0_45px_rgba(37,99,235,0.08)] transition hover:bg-white hover:text-black">
              <p className="text-sm font-bold text-white/35 transition group-hover:text-black/35">0{index + 1}</p>
              <div className="grid h-28 place-items-center">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={200}
                  height={100}
                  className="max-h-24 w-auto object-contain"
                />
              </div>
              <p className="text-lg font-extrabold">{partner.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

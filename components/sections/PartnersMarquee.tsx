import { partners } from "@/data/partners";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

export function PartnersMarquee() {
  const repeated = [...partners, ...partners];

  return (
    <section className="overflow-hidden bg-black py-14 text-white">
      <div className="container-osb mb-8">
        <ScrollRevealText as="h2" text="شركاء النجاح" className="text-3xl font-extrabold text-white" />
      </div>
      <div className="group flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
        {repeated.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="min-w-72 rounded-2xl border border-white/10 bg-white/[0.035] px-8 py-6 text-center text-lg font-bold text-white/45 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
          >
            {partner.name}
          </div>
        ))}
      </div>
    </section>
  );
}

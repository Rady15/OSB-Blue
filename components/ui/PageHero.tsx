import type { ReactNode } from "react";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow = "OSB — One Stop Business", title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-black pb-20 pt-36 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(37,99,235,0.28),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.09),transparent_24%)]" />
      <div className="soft-light-beam right-0 top-28" />
      <div className="container-osb relative z-10 grid items-end gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="mb-5 text-sm font-bold text-white/55">{eyebrow}</p>
          <ScrollRevealText
            as="h1"
            text={title}
            wordsPerLine={4}
            className="max-w-5xl text-5xl font-extrabold leading-[1.08] md:text-7xl"
          />
          {description ? (
            <ScrollRevealText
              as="p"
              text={description}
              wordsPerLine={8}
              className="mt-7 max-w-3xl text-lg leading-9 text-white/60"
              startIndex={3}
            />
          ) : null}
        </div>
        <div className="glow-panel rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
          <div className="rounded-[1.5rem] border border-white/10 bg-black p-5">
            {children ?? (
              <div className="grid gap-3 text-sm font-bold text-white/75">
                {["نشخّص قبل التنفيذ", "نرتّب الخطوات", "نربطك بالمتخصصين"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

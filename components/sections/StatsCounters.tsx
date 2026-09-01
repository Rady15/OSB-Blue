"use client";

import CountUp from "react-countup";
import { useT } from "@/lib/i18n";

const statKeys = [
  { value: 50, key: "stats.founded" },
  { value: 120, key: "stats.clients" },
  { value: 7, key: "stats.years" },
  { value: 6, key: "stats.partners" },
];

export function StatsCounters() {
  const t = useT();
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.24),transparent_52%)]" />
      <div className="container-osb relative z-10 grid gap-8 text-center md:grid-cols-4">
        {statKeys.map((stat) => (
          <div key={stat.key} className="reveal-mask rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="text-5xl font-extrabold text-white md:text-6xl">
              +<CountUp end={stat.value} enableScrollSpy scrollSpyOnce duration={2} />
            </div>
            <p className="mt-4 font-bold text-white/55">{t(stat.key)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

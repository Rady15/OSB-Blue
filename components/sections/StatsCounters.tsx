"use client";

import CountUp from "react-countup";

const stats = [
  { value: 50, label: "شركة تم تأسيسها" },
  { value: 120, label: "عميل واثق بنا" },
  { value: 7, label: "سنوات خبرة" },
  { value: 6, label: "شركاء معتمدون" },
];

export function StatsCounters() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.24),transparent_52%)]" />
      <div className="container-osb relative z-10 grid gap-8 text-center md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="reveal-mask rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="text-5xl font-extrabold text-white md:text-6xl">
              +<CountUp end={stat.value} enableScrollSpy scrollSpyOnce duration={2} />
            </div>
            <p className="mt-4 font-bold text-white/55">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

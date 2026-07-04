"use client";

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { services } from "@/data/services";
import { icons } from "@/lib/icons";
import { fadeUpOnScroll } from "@/lib/animations";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const serviceImages = [
  "/images/service-cards.svg",
  "/images/operations-dashboard.svg",
  "/images/consulting-session.svg",
  "/images/business-strategy.svg",
];

export function ServicesPreviewGrid({ limit }: { limit?: number }) {
  const shownServices = limit ? services.slice(0, limit) : services;

  useEffect(() => {
    fadeUpOnScroll(".service-card", { stagger: 0.12, trigger: "#services-preview" });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      ".service-card",
      { rotateX: 9, transformPerspective: 900 },
      {
        rotateX: 0,
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#services-preview",
          start: "top 80%",
          end: "center 45%",
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <section id="services-preview" className="relative overflow-hidden bg-black py-24 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="container-osb relative z-10">
        <SectionHeading
          light
          title="خدماتنا"
          description="ثمانية مسارات عملية تساعدك على تأسيس مشروعك وإدارته وتطويره داخل المملكة العربية السعودية."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shownServices.map((service, index) => {
            const Icon = icons[service.icon] ?? icons.BriefcaseBusiness;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-card group relative min-h-[29rem] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_0_55px_rgba(37,99,235,0.08)] transition duration-500 hover:-translate-y-2 hover:bg-white hover:text-black hover:shadow-[0_0_65px_rgba(37,99,235,0.24)]"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-right scale-x-0 bg-[#2563eb] transition duration-500 group-hover:scale-x-100" />
                <div data-image-reveal className="image-reveal overflow-hidden">
                  <Image
                    src={serviceImages[index % serviceImages.length]}
                    alt={service.title}
                    width={960}
                    height={720}
                    className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="relative p-7">
                <span className="absolute left-6 top-4 text-7xl font-extrabold text-white opacity-10 transition group-hover:text-black">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="relative z-10 h-10 w-10 text-white transition group-hover:scale-110 group-hover:text-[#2563eb]" />
                <h3 className="relative z-10 mt-8 text-2xl font-extrabold leading-9 text-white transition group-hover:text-black">
                  {service.title}
                </h3>
                <p className="relative z-10 mt-4 line-clamp-3 leading-8 text-white/55 transition group-hover:text-black/60">
                  {service.problemParagraphs[0]}
                </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

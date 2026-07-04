import Image from "next/image";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";

const quickLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/how-we-work", label: "كيف نعمل" },
  { href: "/free-consultation", label: "استشارة مجانية" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.5)_0%,rgba(37,99,235,0.2)_30%,rgba(30,58,138,0.08)_60%,transparent_80%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563eb]/50 to-transparent" />
      <div className="container-osb relative z-10 grid gap-10 py-16 md:grid-cols-4">
        <div>
          <Image src="/images/logo.png" alt="OSB" width={200} height={80} className="h-20 w-auto brightness-0 invert" />
          <p className="mt-4 text-xl font-bold text-white">{siteConfig.tagline}</p>
          <div className="mt-6 flex gap-3">
            <Link aria-label="LinkedIn" href={siteConfig.social.linkedin} className="cursor-hover text-white/55 transition hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link aria-label="Instagram" href={`https://instagram.com/${siteConfig.social.instagram}`} className="cursor-hover text-white/55 transition hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-5 font-bold text-white">روابط سريعة</h3>
          <ul className="grid gap-3 text-white/55">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link className="cursor-hover transition hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-bold text-white">الخدمات</h3>
          <ul className="grid gap-3 text-white/55">
            {services.map((service) => (
              <li key={service.slug}>
                <Link className="cursor-hover transition hover:text-white" href={`/services/${service.slug}`}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-bold text-white">تواصل</h3>
          <ul className="grid gap-4 text-white/55">
            <li className="flex gap-3"><Phone className="h-5 w-5 text-white" /> {siteConfig.phone}</li>
            <li className="flex gap-3"><Mail className="h-5 w-5 text-white" /> {siteConfig.email}</li>
            <li className="flex gap-3"><MapPin className="h-5 w-5 text-white" /> {siteConfig.address}</li>
            <li>{siteConfig.workingHours}</li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10 py-5 text-center text-sm text-white/55">
        © 2025 OSB — One Stop Business | جميع الحقوق محفوظة
      </div>
    </footer>
  );
}

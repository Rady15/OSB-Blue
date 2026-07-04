import type { MetadataRoute } from "next";
import { services } from "@/data/services";

const baseUrl = "https://osb.com.sa";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/how-we-work", "/services", "/free-consultation", "/contact", "/faq", "/partners"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
    })),
  ];
}

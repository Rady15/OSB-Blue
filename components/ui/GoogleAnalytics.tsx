"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function GoogleAnalyticsInner({ gaId }: { gaId: string | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || typeof window === "undefined") return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
    (window as any).gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);
  }, [gaId]);

  useEffect(() => {
    if (!gaId || !(window as any).gtag) return;
    (window as any).gtag("event", "page_view", {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
    });
  }, [pathname, searchParams, gaId]);

  return null;
}

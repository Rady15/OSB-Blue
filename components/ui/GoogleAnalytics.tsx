"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function GoogleAnalyticsInner({ gaId }: { gaId: string | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || typeof window === "undefined" || document.querySelector(`script[data-ga-id="${gaId}"]`)) return;
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
    (window as any).gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId);
    const script = document.createElement("script");
    script.async = true;
    script.dataset.gaId = gaId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
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

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner gaId={process.env.NEXT_PUBLIC_GA_ID || null} />
    </Suspense>
  );
}

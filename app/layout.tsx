import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { PageLoader } from "@/components/ui/PageLoader";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { GlobalMotion } from "@/components/layout/GlobalMotion";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import RootLayoutClient from "./root-layout-client";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
});

const siteUrl = "https://osb.com.sa";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OSB | One Stop Business — حلول أعمال متكاملة لدعم نمو مشروعك في السعودية",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: "OSB — One Stop Business",
    title: "OSB | One Stop Business — حلول أعمال متكاملة",
    description: "حلول أعمال متكاملة تساعد رواد الأعمال والشركات على التأسيس والنمو وإدارة أعمالهم في السعودية.",
    images: [{ url: "/images/hero.png", width: 1200, height: 630, alt: "OSB — One Stop Business" }],
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  twitter: {
    card: "summary_large_image",
    title: "OSB | One Stop Business",
    description: "حلول أعمال متكاملة لدعم نمو مشروعك في السعودية.",
    images: ["/images/hero.png"],
  },
  description:
    "OSB شركة سعودية تساعد رواد الأعمال والمستثمرين والشركات على بناء أعمالهم وإدارتها وتطويرها داخل المملكة العربية السعودية. نجمع تحت سقف واحد الخدمات الأساسية التي تحتاجها المشاريع في مختلف مراحلها، بدءاً من التأسيس والتراخيص والاستشارات القانونية، وصولاً إلى المحاسبة، دراسات الجدوى، التسويق، الأنظمة الإدارية، وإدارة الإجراءات الحكومية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className={`${tajawal.variable} flex min-h-full flex-col font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OSB — One Stop Business",
              url: siteUrl,
              logo: `${siteUrl}/images/logo.png`,
              telephone: "+966555299140",
              email: "one-stop-business@osb.com.sa",
              address: { "@type": "PostalAddress", addressCountry: "SA", addressLocality: "Al Khobar" },
              sameAs: ["https://www.instagram.com/osb.ksa/"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "OSB — One Stop Business",
              url: siteUrl,
              inLanguage: "ar-SA",
            }),
          }}
        />
        <SmoothScrollProvider>
          <PageLoader />
          <ScrollProgressBar />
          <GlobalMotion />
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

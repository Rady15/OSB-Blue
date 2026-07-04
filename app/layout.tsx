import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PageLoader } from "@/components/ui/PageLoader";
import { Footer } from "@/components/layout/Footer";
import { GlobalMotion } from "@/components/layout/GlobalMotion";
import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "OSB | One Stop Business — حلول أعمال متكاملة لدعم نمو مشروعك في السعودية",
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
        <SmoothScrollProvider>
          <PageLoader />
          <ScrollProgressBar />
          <GlobalMotion />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTopButton />
          <FloatingWhatsApp />
          <CustomCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

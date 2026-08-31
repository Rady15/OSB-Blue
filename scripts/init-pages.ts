import fs from "fs";
import path from "path";

const STORE_DIR = path.join(process.cwd(), "data", "store");

function ensureDir() {
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const pages = [
  {
    path: "/",
    title: "الرئيسية",
    description: "الصفحة الرئيسية",
    sections: [
      {
        id: generateId(),
        type: "hero",
        label: "القسم الرئيسي",
        backgroundColor: "#000000",
        blocks: [
          { id: generateId(), type: "heading", content: "كل ما يحتاجه مشروعك في مكان واحد", styles: { color: "#ffffff", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: "800" } },
          { id: generateId(), type: "text", content: "نحوّل التحديات التشغيلية إلى حلول عملية تدعم كفاءة أعمالك ونموها", styles: { color: "rgba(255,255,255,0.65)", fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: "2.25" } },
        ],
      },
      {
        id: generateId(),
        type: "stats",
        label: "الإحصائيات",
        backgroundColor: "#000000",
        blocks: [
          { id: generateId(), type: "text", content: "+5,000", styles: { color: "#2563eb", fontSize: "2rem", fontWeight: "800" } },
          { id: generateId(), type: "text", content: "+370", styles: { color: "#2563eb", fontSize: "2rem", fontWeight: "800" } },
          { id: generateId(), type: "text", content: "+13K", styles: { color: "#2563eb", fontSize: "2rem", fontWeight: "800" } },
          { id: generateId(), type: "text", content: "+385", styles: { color: "#2563eb", fontSize: "2rem", fontWeight: "800" } },
        ],
      },
    ],
    seoTitle: "OSB | One Stop Business",
    seoDescription: "كل ما يحتاجه مشروعك في مكان واحد",
    updatedAt: new Date().toISOString(),
  },
  {
    path: "/about",
    title: "من نحن",
    description: "تعرف على OSB",
    sections: [
      {
        id: generateId(),
        type: "hero",
        label: "عنوان الصفحة",
        backgroundColor: "#000000",
        blocks: [
          { id: generateId(), type: "heading", content: "من نحن", styles: { color: "#2563eb", fontSize: "1.25rem", fontWeight: "700" } },
          { id: generateId(), type: "text", content: "OSB شركة سعودية متخصصة تقدم حلول الأعمال المتكاملة داخل المملكة العربية السعودية", styles: { color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", lineHeight: "2.25" } },
        ],
      },
    ],
    seoTitle: "من نحن | OSB",
    seoDescription: "تعرف على OSB وخدماتنا",
    updatedAt: new Date().toISOString(),
  },
  {
    path: "/how-we-work",
    title: "كيف نعمل",
    description: "طريقة العمل",
    sections: [
      {
        id: generateId(),
        type: "hero",
        label: "عنوان الصفحة",
        backgroundColor: "#000000",
        blocks: [
          { id: generateId(), type: "heading", content: "كيف نعمل", styles: { color: "#2563eb", fontSize: "1.25rem", fontWeight: "700" } },
          { id: generateId(), type: "text", content: "نبدأ بالتحديد، ثم نحدد الخطوة العملية الأقرب لوضع مشروعك", styles: { color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", lineHeight: "2.25" } },
        ],
      },
    ],
    seoTitle: "كيف نعمل | OSB",
    seoDescription: "طريقة العمل في OSB",
    updatedAt: new Date().toISOString(),
  },
  {
    path: "/contact",
    title: "تواصل معنا",
    description: "تواصل مع OSB",
    sections: [
      {
        id: generateId(),
        type: "hero",
        label: "عنوان الصفحة",
        backgroundColor: "#000000",
        blocks: [
          { id: generateId(), type: "heading", content: "تواصل معنا", styles: { color: "#2563eb", fontSize: "1.25rem", fontWeight: "700" } },
          { id: generateId(), type: "text", content: "سواء كنت في مرحلة الفكرة أو التأسيس أو التوسع، فريقنا جاهز للإجابة", styles: { color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", lineHeight: "2.25" } },
        ],
      },
    ],
    seoTitle: "تواصل معنا | OSB",
    seoDescription: "تواصل مع فريق OSB",
    updatedAt: new Date().toISOString(),
  },
  {
    path: "/faq",
    title: "الأسئلة الشائعة",
    description: "إجابات على أسئلتك",
    sections: [
      {
        id: generateId(),
        type: "hero",
        label: "عنوان الصفحة",
        backgroundColor: "#000000",
        blocks: [
          { id: generateId(), type: "heading", content: "الأسئلة الشائعة", styles: { color: "#2563eb", fontSize: "1.25rem", fontWeight: "700" } },
          { id: generateId(), type: "text", content: "إجابات على الأسئلة الأكثر شيوعاً", styles: { color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", lineHeight: "2.25" } },
        ],
      },
    ],
    seoTitle: "الأسئلة الشائعة | OSB",
    seoDescription: "إجابات على أسئلتك",
    updatedAt: new Date().toISOString(),
  },
  {
    path: "/partners",
    title: "الشركاء",
    description: "شركاء النجاح",
    sections: [
      {
        id: generateId(),
        type: "hero",
        label: "عنوان الصفحة",
        backgroundColor: "#000000",
        blocks: [
          { id: generateId(), type: "heading", content: "شركاء النجاح", styles: { color: "#2563eb", fontSize: "1.25rem", fontWeight: "700" } },
          { id: generateId(), type: "text", content: "نفتخر بشراكتنا مع أفضل المؤسسات", styles: { color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", lineHeight: "2.25" } },
        ],
      },
    ],
    seoTitle: "الشركاء | OSB",
    seoDescription: "شركاء النجاح",
    updatedAt: new Date().toISOString(),
  },
  {
    path: "/free-consultation",
    title: "استشارة مجانية",
    description: "احجز استشارتك المجانية",
    sections: [
      {
        id: generateId(),
        type: "hero",
        label: "عنوان الصفحة",
        backgroundColor: "#000000",
        blocks: [
          { id: generateId(), type: "heading", content: "استشارة مجانية", styles: { color: "#2563eb", fontSize: "1.25rem", fontWeight: "700" } },
          { id: generateId(), type: "text", content: "احجز استشارتك المجانية الآن", styles: { color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", lineHeight: "2.25" } },
        ],
      },
    ],
    seoTitle: "استشارة مجانية | OSB",
    seoDescription: "احجز استشارتك المجانية",
    updatedAt: new Date().toISOString(),
  },
];

ensureDir();
fs.writeFileSync(path.join(STORE_DIR, "pages.json"), JSON.stringify(pages, null, 2), "utf-8");
console.log("Pages initialized:", pages.length, "pages");

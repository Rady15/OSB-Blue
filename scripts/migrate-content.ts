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

const initialPages = [
  {
    path: "/",
    title: "الرئيسية",
    description: "الصفحة الرئيسية لموقع OSB",
    sections: [
      {
        id: generateId(),
        type: "hero",
        label: "القسم الرئيسي",
        backgroundColor: "#000000",
        blocks: [
          {
            id: generateId(),
            type: "heading",
            content: "كل ما يحتاجه مشروعك في مكان واحد",
            styles: { color: "#ffffff", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: "800" },
          },
          {
            id: generateId(),
            type: "text",
            content: "نحوّل التحديات التشغيلية إلى حلول عملية تدعم كفاءة أعمالك ونموها",
            styles: { color: "rgba(255,255,255,0.65)", fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: "2.25" },
          },
        ],
      },
      {
        id: generateId(),
        type: "trust-bar",
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
        label: "عن المن نحن",
        backgroundColor: "#000000",
        blocks: [
          { id: generateId(), type: "heading", content: "من نحن", styles: { color: "#2563eb", fontSize: "1.25rem", fontWeight: "700" } },
          { id: generateId(), type: "richtext", content: "OSB شركة سعودية متخصصة تقدم حلول الأعمال المتكاملة داخل المملكة العربية السعودية", styles: { color: "rgba(255,255,255,0.6)", fontSize: "1.125rem", lineHeight: "2.25" } },
        ],
      },
    ],
    seoTitle: "من نحن | OSB",
    seoDescription: "تعرف على OSB وخدماتنا",
    updatedAt: new Date().toISOString(),
  },
];

ensureDir();
fs.writeFileSync(path.join(STORE_DIR, "pages.json"), JSON.stringify(initialPages, null, 2), "utf-8");
console.log("Pages content migrated to store");

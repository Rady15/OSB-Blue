import fs from "fs";
import path from "path";

const STORE_DIR = path.join(process.cwd(), "data", "store");
const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(filename: string): T {
  const filePath = path.join(STORE_DIR, filename);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

function generateSiteConfig() {
  const config = readJson<any>("siteConfig.json");
  const content = `export const siteConfig = ${JSON.stringify(config, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA_DIR, "siteConfig.ts"), content, "utf-8");
  console.log("Generated siteConfig.ts");
}

function generateServices() {
  const services = readJson<any[]>("services.json");
  const content = `export interface Service {\n  slug: string;\n  title: string;\n  shortDescription: string;\n  heroQuestion: string;\n  problemParagraphs: string[];\n  solutionParagraph: string;\n  suitableIf: string[];\n  icon: string;\n  image: string;\n}\n\nexport const services: Service[] = ${JSON.stringify(services, null, 2)};\n\nexport const serviceCta = {\n  title: "غير متأكد إذا كانت هذه الخدمة هي ما يحتاجه مشروعك؟",\n  description: "احجز استشارة مجانية، وسنساعدك على فهم وضعك الحالي وتحديد الخطوة الأنسب قبل اتخاذ أي قرار.",\n  button: "احجز استشارتك المجانية",\n};\n`;
  fs.writeFileSync(path.join(DATA_DIR, "services.ts"), content, "utf-8");
  console.log("Generated services.ts");
}

function generatePartners() {
  const partners = readJson<any[]>("partners.json");
  const content = `export const partners = ${JSON.stringify(partners, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA_DIR, "partners.ts"), content, "utf-8");
  console.log("Generated partners.ts");
}

function generateFaq() {
  const faqs = readJson<any[]>("faq.json");
  const content = `export const faqs = ${JSON.stringify(faqs, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA_DIR, "faq.ts"), content, "utf-8");
  console.log("Generated faq.ts");
}

function generateJourney() {
  const journeySteps = readJson<any[]>("journey.json");
  const content = `export const journeySteps = ${JSON.stringify(journeySteps, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA_DIR, "journey.ts"), content, "utf-8");
  console.log("Generated journey.ts");
}

generateSiteConfig();
generateServices();
generatePartners();
generateFaq();
generateJourney();

console.log("All data files generated successfully!");

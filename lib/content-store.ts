import fs from "fs";
import path from "path";
import type { ContentPage, SiteBranding, MediaFile } from "@/data/content";

const STORE_DIR = path.join(process.cwd(), "data", "store");

function ensureDir() {
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
}

function readFile<T>(filename: string, fallback: T): T {
  ensureDir();
  const filePath = path.join(STORE_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

function writeFile<T>(filename: string, data: T): void {
  ensureDir();
  const filePath = path.join(STORE_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export const contentStore = {
  getPages(): ContentPage[] {
    return readFile<ContentPage[]>("pages.json", []);
  },

  getPage(path: string): ContentPage | undefined {
    return this.getPages().find((p) => p.path === path);
  },

  savePage(page: ContentPage): void {
    const pages = this.getPages();
    const idx = pages.findIndex((p) => p.path === page.path);
    if (idx >= 0) {
      pages[idx] = { ...pages[idx], ...page, updatedAt: new Date().toISOString() };
    } else {
      pages.push(page);
    }
    writeFile("pages.json", pages);
  },

  getBranding(): SiteBranding {
    return readFile<SiteBranding>("branding.json", {
      logo: "/images/logo.png",
      logoDark: "/images/logo.png",
      favicon: "/favicon.ico",
      primaryColor: "#0B1F3A",
      secondaryColor: "#2563eb",
      accentColor: "#ffffff",
      backgroundColor: "#000000",
      textColor: "#ffffff",
      fontFamily: "Tajawal",
      siteName: "OSB",
      siteTagline: "One Stop Business",
    });
  },

  saveBranding(branding: SiteBranding): void {
    writeFile("branding.json", branding);
  },

  getMedia(): MediaFile[] {
    return readFile<MediaFile[]>("media.json", []);
  },

  addMedia(file: MediaFile): void {
    const media = this.getMedia();
    media.push(file);
    writeFile("media.json", media);
  },

  deleteMedia(filename: string): void {
    const media = this.getMedia().filter((m) => m.filename !== filename);
    writeFile("media.json", media);
  },
};

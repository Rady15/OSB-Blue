import fs from "fs";
import path from "path";
import type { BlogPost, SEOSettings, SiteSettings, StoreData } from "@/data/store";

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

export const store = {
  getBlogPosts(): BlogPost[] {
    return readFile<BlogPost[]>("blog.json", []);
  },

  getBlogPost(id: string): BlogPost | undefined {
    return this.getBlogPosts().find((p) => p.id === id);
  },

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.getBlogPosts().find((p) => p.slug === slug);
  },

  saveBlogPost(post: BlogPost): void {
    const posts = this.getBlogPosts();
    const idx = posts.findIndex((p) => p.id === post.id);
    if (idx >= 0) {
      posts[idx] = { ...posts[idx], ...post, updatedAt: new Date().toISOString() };
    } else {
      posts.push(post);
    }
    writeFile("blog.json", posts);
  },

  deleteBlogPost(id: string): void {
    const posts = this.getBlogPosts().filter((p) => p.id !== id);
    writeFile("blog.json", posts);
  },

  getSEO(): SEOSettings {
    return readFile<SEOSettings>("seo.json", {
      globalTitle: "OSB — One Stop Business",
      globalDescription: "كل ما يحتاجه مشروعك في مكان واحد",
      globalKeywords: "أعمال، استشارات، تأسيس، محاسبة، قانوني",
      ogImage: "/images/hero.png",
      twitterHandle: "",
      googleAnalyticsId: "",
      googleSearchConsoleId: "",
      pages: [],
    });
  },

  saveSEO(seo: SEOSettings): void {
    writeFile("seo.json", seo);
  },

  getSettings(): SiteSettings {
    return readFile<SiteSettings>("settings.json", {
      siteName: "OSB",
      siteTagline: "One Stop Business",
      phone: "+966500000000",
      email: "info@osb.sa",
      address: "المملكة العربية السعودية",
      workingHours: "الأحد - الخميس: 9:00 ص - 6:00 م",
      social: { linkedin: "", instagram: "" },
      maintenanceMode: false,
    });
  },

  saveSettings(settings: SiteSettings): void {
    writeFile("settings.json", settings);
  },

  getAllData(): StoreData {
    return {
      blog: this.getBlogPosts(),
      seo: this.getSEO(),
      settings: this.getSettings(),
    };
  },
};

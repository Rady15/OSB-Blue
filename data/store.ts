export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SEOSettings {
  globalTitle: string;
  globalDescription: string;
  globalKeywords: string;
  ogImage?: string;
  twitterHandle?: string;
  googleAnalyticsId?: string;
  googleSearchConsoleId?: string;
  pages: PageSEO[];
}

export interface PageSEO {
  path: string;
  title: string;
  description: string;
  keywords: string;
  noIndex: boolean;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  social: {
    linkedin: string;
    instagram: string;
  };
  maintenanceMode: boolean;
}

export interface StoreData {
  blog: BlogPost[];
  seo: SEOSettings;
  settings: SiteSettings;
}

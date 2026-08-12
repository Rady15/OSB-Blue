export type ContentBlockType = "text" | "heading" | "image" | "richtext" | "button" | "spacer" | "columns";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
  styles?: Record<string, string>;
  metadata?: Record<string, string>;
}

export interface ContentSection {
  id: string;
  type: string;
  label: string;
  blocks: ContentBlock[];
  styles?: Record<string, string>;
  backgroundImage?: string;
  backgroundColor?: string;
}

export interface ContentPage {
  id: string;
  path: string;
  title: string;
  description: string;
  sections: ContentSection[];
  seoTitle?: string;
  seoDescription?: string;
  updatedAt: string;
}

export interface SiteBranding {
  logo: string;
  logoDark?: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  siteName: string;
  siteTagline: string;
}

export interface MediaFile {
  filename: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

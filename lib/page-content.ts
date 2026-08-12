import { contentStore } from "@/lib/content-store";
import type { ContentPage } from "@/data/content";

export function getPageContent(path: string): ContentPage | null {
  return contentStore.getPage(path) || null;
}

export function hasPageContent(path: string): boolean {
  return contentStore.getPage(path) !== undefined;
}

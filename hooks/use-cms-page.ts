"use client";

import { useEffect, useState } from "react";
import { contentStore } from "@/lib/content-store";
import type { ContentPage } from "@/data/content";

export function useCMSPage(path: string): ContentPage | null {
  const [page, setPage] = useState<ContentPage | null>(null);

  useEffect(() => {
    const pageData = contentStore.getPage(path);
    setPage(pageData || null);
  }, [path]);

  return page;
}

import { ContentSection } from "./ContentSection";
import { contentStore } from "@/lib/content-store";

export function ContentRenderer({ path }: { path: string }) {
  const page = contentStore.getPage(path);

  if (!page) {
    return null;
  }

  return (
    <>
      {page.sections.map((section) => (
        <ContentSection key={section.id} section={section} />
      ))}
    </>
  );
}

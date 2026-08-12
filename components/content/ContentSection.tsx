import type { ContentSection } from "@/data/content";

function renderBlock(block: any): React.ReactNode {
  const baseStyle: React.CSSProperties = {
    color: block.styles?.color || "#ffffff",
    fontSize: block.styles?.fontSize || "1rem",
    fontWeight: block.styles?.fontWeight || "400",
    lineHeight: block.styles?.lineHeight || "1.5",
    textAlign: (block.styles?.textAlign as any) || "right",
    direction: "rtl",
  };

  switch (block.type) {
    case "heading":
      return (
        <h2 style={{ ...baseStyle, fontSize: block.styles?.fontSize || "2rem", fontWeight: "800", marginBottom: "1rem" }}>
          {block.content}
        </h2>
      );
    case "text":
      return (
        <p style={{ ...baseStyle, marginBottom: "1rem" }}>
          {block.content}
        </p>
      );
    case "richtext":
      return (
        <div
          style={{ ...baseStyle, marginBottom: "1rem" }}
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );
    case "image":
      return (
        <div className="relative w-full overflow-hidden rounded-2xl mb-4" style={{ maxHeight: block.styles?.maxHeight || "500px" }}>
          <img
            src={block.content}
            alt={block.metadata?.alt || ""}
            className="w-full object-cover"
          />
        </div>
      );
    case "button":
      return (
        <a
          href={block.metadata?.href || "#"}
          style={{
            ...baseStyle,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: block.styles?.backgroundColor || "#2563eb",
            color: block.styles?.color || "#ffffff",
            borderRadius: "0.5rem",
            fontWeight: "700",
            textDecoration: "none",
            marginBottom: "1rem",
          }}
        >
          {block.content}
        </a>
      );
    default:
      return null;
  }
}

export function ContentSection({ section }: { section: ContentSection }) {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{
        backgroundColor: section.backgroundColor || "transparent",
        backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-osb relative z-10">
        {section.blocks.map((block) => (
          <div key={block.id} className="mb-4 last:mb-0">
            {renderBlock(block)}
          </div>
        ))}
      </div>
    </section>
  );
}

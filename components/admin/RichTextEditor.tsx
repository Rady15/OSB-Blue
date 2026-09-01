"use client";

import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Unlink,
  Image as ImageIcon,
  RemoveFormatting,
  Type,
} from "lucide-react";
import { useT } from "@/lib/i18n";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

const TOOLBAR_BTN =
  "flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white";

export function RichTextEditor({ value, onChange, placeholder, minHeight = 320 }: RichTextEditorProps) {
  const t = useT();
  const editorRef = useRef<HTMLDivElement>(null);
  const lastValueRef = useRef(value);

  useEffect(() => {
    if (editorRef.current && value !== lastValueRef.current) {
      editorRef.current.innerHTML = value;
      lastValueRef.current = value;
    }
  }, [value]);

  function exec(command: string, value?: string) {
    document.execCommand(command, false, value);
    sync();
  }

  function sync() {
    if (editorRef.current) {
      lastValueRef.current = editorRef.current.innerHTML;
      onChange(lastValueRef.current);
    }
  }

  function addLink() {
    const url = window.prompt(t("rte.linkPrompt"));
    if (url) exec("createLink", url);
  }

  function addImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/admin/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        exec("insertImage", data.url);
      }
    };
    input.click();
  }

  type ToolbarItem =
    | { divider: true }
    | { divider?: never; icon: typeof Bold; title: string; onClick: () => void };

  const buttons: ToolbarItem[] = [
    { icon: Bold, title: t("rte.bold"), onClick: () => exec("bold") },
    { icon: Italic, title: t("rte.italic"), onClick: () => exec("italic") },
    { icon: Underline, title: t("rte.underline"), onClick: () => exec("underline") },
    { divider: true },
    { icon: Heading2, title: t("rte.heading"), onClick: () => exec("formatBlock", "<h2>") },
    { icon: Heading3, title: t("rte.subheading"), onClick: () => exec("formatBlock", "<h3>") },
    { icon: Type, title: t("rte.normalText"), onClick: () => exec("formatBlock", "<p>") },
    { divider: true },
    { icon: List, title: t("rte.bulletList"), onClick: () => exec("insertUnorderedList") },
    { icon: ListOrdered, title: t("rte.numberedList"), onClick: () => exec("insertOrderedList") },
    { icon: Quote, title: t("rte.quote"), onClick: () => exec("formatBlock", "<blockquote>") },
    { divider: true },
    { icon: Link2, title: t("rte.addLink"), onClick: addLink },
    { icon: Unlink, title: t("rte.removeLink"), onClick: () => exec("unlink") },
    { icon: ImageIcon, title: t("rte.insertImage"), onClick: addImage },
    { icon: RemoveFormatting, title: t("rte.clearFormatting"), onClick: () => exec("removeFormat") },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-within:border-[#2563eb]">
      <style>{`
        .rte-editor[data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
        }
        .rte-editor img {
          max-width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/[0.03] px-3 py-2">
        {buttons.map((btn, i) => {
          if (btn.divider) {
            return <span key={i} className="mx-1 h-5 w-px bg-white/10" />;
          }
          const Icon = btn.icon;
          return (
            <button
              key={i}
              type="button"
              title={btn.title}
              onMouseDown={(e) => e.preventDefault()}
              onClick={btn.onClick}
              className={TOOLBAR_BTN}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
      <div
        ref={editorRef}
        dir="rtl"
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        onBlur={sync}
        className="rte-editor prose prose-invert prose-lg max-w-none min-h-[320px] max-h-[600px] overflow-y-auto px-5 py-4 text-right leading-8 outline-none
          prose-headings:text-white prose-headings:font-extrabold
          prose-p:text-white/80
          prose-a:text-[#2563eb] prose-a:no-underline
          prose-strong:text-white
          prose-ul:pr-6 prose-ol:pr-6 prose-li:text-white/80
          prose-blockquote:border-r-4 prose-blockquote:border-[#2563eb] prose-blockquote:bg-white/5 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:not-italic
          prose-img:max-w-full prose-img:rounded-xl prose-img:border prose-img:border-white/10
          prose-hr:border-white/10"
        style={{ minHeight }}
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}

/** Conservative HTML sanitizer for trusted admin-authored blog content. */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/<\s*(script|iframe|object|embed|form|style|link|meta)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|iframe|object|embed|form|style|link|meta)[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(href|src)\s*=\s*(["'])\s*(javascript:|data:text\/html)[^"']*\2/gi, "")
    .replace(/\s(href|src)\s*=\s*(["'])\s*(javascript:|data:text\/html)[^"']*\2/gi, "")
    .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

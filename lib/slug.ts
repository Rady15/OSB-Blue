export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\u0600-\u06FF]/g, (char) => {
      const map: Record<string, string> = {
        "أ": "a", "إ": "i", "آ": "a", "ا": "a", "ب": "b", "ت": "t", "ث": "th",
        "ج": "j", "ح": "h", "خ": "kh", "د": "d", "ذ": "dh", "ر": "r", "ز": "z",
        "س": "s", "ش": "sh", "ص": "s", "ض": "d", "ط": "t", "ظ": "z", "ع": "a",
        "غ": "gh", "ف": "f", "ق": "q", "ك": "k", "ل": "l", "م": "m", "ن": "n",
        "ه": "h", "و": "w", "ي": "y", "ة": "h", "ى": "a", "ئ": "e", "ء": "e",
        "ؤ": "o", "َ": "a", "ً": "an", "ُ": "u", "ٌ": "un", "ِ": "i", "ٍ": "in",
        "ْ": "", "ّ": "", "ـ": "",
      };
      return map[char] || "";
    })
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Merge of all per-area dictionaries into a single en/ar flat map.
import { en as EN_NAV, ar as AR_NAV } from "./nav";
import { en as EN_HOME, ar as AR_HOME } from "./home";
import { en as EN_ADMIN, ar as AR_ADMIN } from "./admin";
import {
  en as EN_LAYOUT_SECTIONS,
  ar as AR_LAYOUT_SECTIONS,
} from "./layout-sections";
import { en as EN_DATA, ar as AR_DATA } from "./data-content";
import { en as EN_PAGES, ar as AR_PAGES } from "./pages";

export type Lang = "en" | "ar";

function merge(partials: Record<string, string>[]): Record<string, string> {
  return Object.assign({}, ...partials);
}

const en = merge([EN_NAV, EN_HOME, EN_LAYOUT_SECTIONS, EN_ADMIN, EN_DATA, EN_PAGES]);
const ar = merge([AR_NAV, AR_HOME, AR_LAYOUT_SECTIONS, AR_ADMIN, AR_DATA, AR_PAGES]);

export const dictionaries: Record<Lang, Record<string, string>> = { en, ar };

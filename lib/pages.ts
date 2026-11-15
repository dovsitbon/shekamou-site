import type { Locale } from "@/lib/locales";

// Pages secondaires et leurs adresses dans chaque langue (le persan garde des adresses latines, plus faciles à partager).
export const PAGE_IDS = ["carte", "commander", "plateaux", "iranien", "paris15", "legal"] as const;
export type PageId = (typeof PAGE_IDS)[number];

export const SLUGS: Record<PageId, Record<Locale, string>> = {
  carte: { fr: "carte", en: "menu", fa: "menu" },
  commander: { fr: "commander", en: "order", fa: "order" },
  plateaux: { fr: "plateaux-bureaux-fetes", en: "office-party-platters", fa: "platters" },
  iranien: { fr: "cafe-iranien-paris", en: "iranian-cafe-paris", fa: "iranian-cafe-paris" },
  paris15: { fr: "coffee-shop-paris-15", en: "coffee-shop-paris-15", fa: "coffee-shop-paris-15" },
  legal: { fr: "mentions-legales", en: "legal", fa: "legal" },
};

export const pagePath = (id: PageId, lang: Locale) => `/${lang}/${SLUGS[id][lang]}`;

export const pageOfSlug = (slug: string, lang: Locale) => PAGE_IDS.find((id) => SLUGS[id][lang] === slug) ?? null;

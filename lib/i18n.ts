import fr from "@/locales/fr.json";
import en from "@/locales/en.json";
import fa from "@/locales/fa.json";
import type { Locale } from "@/lib/locales";

export { defaultLocale, dirOf, intlLocale, isLocale, isRtl, langNames, langShort, locales, ogLocale, type Locale } from "@/lib/locales";
export type Dict = typeof fr;

const dictionaries: Record<Locale, Dict> = { fr, en, fa };

export const getDict = (lang: Locale): Dict => dictionaries[lang];

export { fill, altOf } from "@/lib/text";

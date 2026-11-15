// Langues du site, sans les textes : importable côté client sans embarquer les dictionnaires.
// Français par défaut, anglais, persan (de droite à gauche).
export const locales = ["fr", "en", "fa"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const isRtl = (l: Locale) => l === "fa";
export const dirOf = (l: Locale) => (isRtl(l) ? "rtl" : "ltr");

export const ogLocale: Record<Locale, string> = { fr: "fr_FR", en: "en_GB", fa: "fa_IR" };
// Persan : chiffres persans, mais calendrier grégorien (les retraits se font à Paris)
export const intlLocale: Record<Locale, string> = { fr: "fr-FR", en: "en-GB", fa: "fa-IR-u-ca-gregory" };
export const langNames: Record<Locale, string> = { fr: "Français", en: "English", fa: "فارسی" };
export const langShort: Record<Locale, string> = { fr: "FR", en: "EN", fa: "فا" };

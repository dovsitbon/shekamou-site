"use client";

import { usePathname } from "next/navigation";
import { langNames, langShort, locales, type Locale } from "@/lib/locales";
import { pageOfSlug, SLUGS } from "@/lib/pages";

/** « FR · EN · فا » : renvoie vers la même page dans l'autre langue (les adresses des pages sont traduites). */
export function LangSwitch({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${lang}`;
  const slug = pathname.replace(/^\/(fr|en|fa)\/?/, "").split("/")[0];
  const page = slug ? pageOfSlug(slug, lang) : null;
  const target = (l: Locale) => (page ? `/${l}/${SLUGS[page][l]}` : `/${l}`);

  return (
    <nav aria-label={label} dir="ltr" className={`flex items-center gap-2 text-[0.75rem] tracking-[0.14em] ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
          )}
          <a
            href={target(l)}
            hrefLang={l}
            lang={l}
            title={langNames[l]}
            aria-current={l === lang ? "true" : undefined}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;samesite=lax`;
            }}
            className={`inline-flex min-h-10 min-w-6 items-center justify-center transition-opacity ${l === "fa" ? "font-[family-name:var(--font-fa)] text-[0.9375rem] tracking-normal" : ""} ${l === lang ? "font-semibold opacity-100" : "opacity-60 hover:opacity-100"}`}
          >
            {langShort[l]}
          </a>
        </span>
      ))}
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import annonces from "@/data/annonces.json";
import { CloseIcon } from "@/components/icons";
import { Star8 } from "@/components/Doodles";
import { useLocale } from "@/components/providers";
import { isoDay } from "@/lib/format";
import { upcomingClosure } from "@/lib/hours";

type Item = { id: string; from?: string; to?: string; fr: string; en: string; fa: string };

/**
 * Message du moment, refermable et mémorisé pour la session :
 * 1. une fermeture en cours ou dans les 14 jours (data/horaires.json → closures) ;
 * 2. une annonce datée de data/annonces.json (boisson du moment, fête persane…) ;
 * 3. sinon le message par défaut : « Ouvert 7 j/7 dès 8 h · Sur place ou à emporter ».
 */
function current(today: string): Item {
  const closure = upcomingClosure(today);
  if (closure) return closure;
  const dated = (annonces.items as Item[]).find((a) => (!a.from || a.from <= today) && (!a.to || today <= a.to));
  return dated ?? (annonces.default as Item);
}

export function AnnounceBar() {
  const { lang, d } = useLocale();
  const [item, setItem] = useState<Item>(() => current(isoDay(new Date())));
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const it = current(isoDay(new Date()));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date du navigateur, connue seulement après hydratation
    setItem(it);
    try {
      if (sessionStorage.getItem(`shekamou-bandeau-${it.id}`) === "1") setClosed(true);
    } catch {}
  }, []);

  if (closed) return null;
  return (
    <div className="relative z-[51] flex min-h-10 items-center justify-center bg-green px-12 py-2 text-center text-[0.875rem] leading-snug text-paper md:text-[0.9375rem]">
      <p className="flex items-center gap-2.5" suppressHydrationWarning>
        <Star8 className="hidden h-3.5 w-3.5 shrink-0 text-saffron sm:block" />
        {item[lang]}
      </p>
      <button
        type="button"
        onClick={() => {
          setClosed(true);
          try {
            sessionStorage.setItem(`shekamou-bandeau-${item.id}`, "1");
          } catch {}
        }}
        className="absolute end-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center opacity-75 transition-opacity hover:opacity-100"
        aria-label={d.announce.close}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

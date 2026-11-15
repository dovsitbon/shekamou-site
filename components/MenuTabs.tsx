"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useCart, useLocale } from "@/components/providers";
import { CupMark } from "@/components/Doodles";
import { CheckIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { CATEGORIES, CHECKED, type CategoryId, type Item } from "@/lib/carte";
import { fill, altOf } from "@/lib/text";
import { formatDay, num, price } from "@/lib/format";
import { has, img } from "@/lib/media";
import { pagePath } from "@/lib/pages";

const TINTS = ["bg-pistachio-soft text-green", "bg-rose-soft text-ube-deep", "bg-saffron-soft text-brass", "bg-ube-soft text-ube"];

/** Ajouter / quantité : un bouton « Ajouter », puis − 1 + une fois dans la commande. */
function AddControl({ item }: { item: Item }) {
  const { lang, d } = useLocale();
  const { cart, add, ready } = useCart();
  const qty = ready ? (cart[item.id] ?? 0) : 0;
  const name = item[lang].name;
  if (item.orderable === false) return null;
  if (!qty)
    return (
      <button type="button" onClick={() => add(item.id, 1)} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-[1.5px] border-green px-4 text-[0.9375rem] font-semibold text-green transition-colors hover:bg-green hover:text-paper" aria-label={fill(d.carte.addAria, { name })}>
        <PlusIcon className="h-4 w-4" />
        {d.carte.add}
      </button>
    );
  return (
    <span className="pop inline-flex min-h-11 items-center rounded-full bg-green text-paper" role="group" aria-label={`${name} · ${d.carte.inCart}`}>
      <button type="button" onClick={() => add(item.id, -1)} className="flex h-11 w-10 items-center justify-center" aria-label={fill(d.carte.removeAria, { name })}>
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="min-w-5 text-center font-semibold tabular-nums" aria-live="polite">
        {num(qty, lang)}
      </span>
      <button type="button" onClick={() => add(item.id, 1)} className="flex h-11 w-10 items-center justify-center" aria-label={fill(d.carte.addAria, { name })}>
        <PlusIcon className="h-4 w-4" />
      </button>
    </span>
  );
}

/** Carte produit complète : photo, nom, mentions, description, explication pour les plats iraniens, prix, Ajouter. */
export function ItemCard({ item, index = 0, priority = false }: { item: Item; index?: number; priority?: boolean }) {
  const { lang, d } = useLocale();
  const t = item[lang];
  const photo = item.photo && has(item.photo) ? img(item.photo) : null;
  return (
    <article className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-paper">
      <div className="relative aspect-[4/3]">
        {photo ? (
          <div className="zoom h-full">
            <Image src={photo.src} alt={altOf(d, photo.src) || t.name} width={photo.width} height={photo.height} sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 92vw" quality={70} priority={priority} className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className={`flex h-full flex-col items-center justify-center gap-2 ${TINTS[index % TINTS.length]}`} data-photo-slot={item.id}>
            <CupMark className="h-14 w-14 opacity-60" />
            <span className="text-[0.8125rem] font-medium opacity-80">{d.carte.photoSoon}</span>
          </div>
        )}
        <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
          {item.signature && <span className="tag bg-ube text-paper">{d.carte.signature}</span>}
          {item.isNew && <span className="tag bg-saffron text-ink">{d.carte.isNew}</span>}
          {item.weekend && <span className="tag bg-paper text-ink">{d.carte.weekend}</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display text-[1.375rem]">{t.name}</h3>
          {item.veg && <span className="tag mt-1 bg-pistachio-soft text-green">{d.carte.veg}</span>}
        </div>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{t.desc}</p>
        {t.about && (
          <details className="mt-3 rounded-xl bg-saffron-soft/60 px-3.5 py-2.5 text-[0.9375rem]">
            <summary className="flex min-h-7 items-center justify-between gap-2 font-semibold text-ink">
              {d.carte.about}
              <PlusIcon className="faq-plus h-4 w-4 shrink-0" />
            </summary>
            <p className="mt-1.5 leading-relaxed text-muted">{t.about}</p>
          </details>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className={item.price === null ? "text-[0.875rem] text-muted" : "text-[1.0625rem] font-semibold tabular-nums"}>{item.price === null ? d.carte.priceOnSite : price(item.price, lang)}</span>
          <AddControl item={item} />
        </div>
      </div>
    </article>
  );
}

/**
 * La carte en onglets (cafés, boissons, brunch, sandwichs, plats iraniens, douceurs).
 * `limit` : nombre d'articles par onglet sur l'accueil (avec un lien vers la carte complète).
 * L'onglet suit l'ancre de l'adresse (#iranien…), pour que les tuiles de l'accueil ouvrent la bonne rubrique.
 */
export function MenuTabs({ limit }: { limit?: number }) {
  const { lang, d } = useLocale();
  const [tab, setTab] = useState<CategoryId>("cafes");
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1) as CategoryId;
      if (CATEGORIES.some((c) => c.id === h)) setTab(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (id: CategoryId) => {
    setTab(id);
    if (!limit) history.replaceState(null, "", `#${id}`);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = document.dir === "rtl" ? { next: "ArrowLeft", prev: "ArrowRight" } : { next: "ArrowRight", prev: "ArrowLeft" };
    const i = CATEGORIES.findIndex((c) => c.id === tab);
    let j = -1;
    if (e.key === keys.next) j = (i + 1) % CATEGORIES.length;
    else if (e.key === keys.prev) j = (i - 1 + CATEGORIES.length) % CATEGORIES.length;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = CATEGORIES.length - 1;
    if (j < 0) return;
    e.preventDefault();
    select(CATEGORIES[j].id);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[j]?.focus();
  };

  const cat = CATEGORIES.find((c) => c.id === tab)!;
  // Sur l'accueil : d'abord les signatures et les articles qui ont déjà leur photo
  const score = (it: Item) => (it.photo && has(it.photo) ? 2 : 0) + (it.signature ? 1 : 0);
  const items = limit ? [...cat.items].sort((a, b) => score(b) - score(a)).slice(0, limit) : cat.items;

  return (
    <div>
      <div ref={tabsRef} role="tablist" aria-label={d.carte.tablist} onKeyDown={onKey} className="tabs -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {CATEGORIES.map((c) => {
          const on = c.id === tab;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={on}
              aria-controls={`panel-${c.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(c.id)}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors ${on ? "border-green bg-green text-paper" : "border-line bg-paper text-ink hover:border-green"}`}
            >
              {c[lang]}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${cat.id}`} aria-labelledby={`tab-${cat.id}`} className="fade-in mt-8" key={cat.id}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it, i) => (
            <ItemCard key={it.id} item={it} index={i} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[0.875rem] text-muted">{fill(d.carte.checked, { date: formatDay(CHECKED, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
          {limit && cat.items.length > limit && (
            <Link href={`${pagePath("carte", lang)}#${cat.id}`} className="btn-line">
              {d.carte.seeAll} · {cat[lang]}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/** Rappel flottant (écrans larges) dès qu'un article est ajouté : « 3 articles · Voir ma commande ». */
export function CartBar() {
  const { lang, d } = useLocale();
  const { count, last } = useCart();
  const [onOrder, setOnOrder] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- adresse connue côté navigateur
    setOnOrder(window.location.pathname.startsWith(pagePath("commander", lang)));
  }, [lang]);
  if (!count || !last || onOrder) return null;
  return (
    <Link href={pagePath("commander", lang)} className="fade-in fixed end-6 bottom-6 z-40 hidden items-center gap-3 rounded-full bg-ink py-2 ps-5 pe-2 text-paper shadow-[0_8px_30px_rgba(34,32,31,0.25)] md:flex">
      <span className="text-[0.9375rem]">{fill(d.cartBar.items, { n: num(count, lang) })}</span>
      <span className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-saffron px-4 text-[0.9375rem] font-semibold text-ink">
        <CheckIcon className="h-4 w-4" />
        {d.cartBar.view}
      </span>
    </Link>
  );
}

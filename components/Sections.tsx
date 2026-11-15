import Link from "next/link";
import site from "@/data/site.json";
import avis from "@/data/avis.json";
import { Pic } from "@/components/Pic";
import { Reveal } from "@/components/Reveal";
import { Rating } from "@/components/Rating";
import { OpenStatus } from "@/components/OpenStatus";
import { HoursTable } from "@/components/HoursTable";
import { MapLoader } from "@/components/MapLoader";
import { TraysForm } from "@/components/Forms";
import { Bag, Bowl, Clock, Star8, Wifi } from "@/components/Doodles";
import { ArrowIcon, InstagramIcon, PhoneIcon, PinIcon, StarIcon } from "@/components/icons";
import type { Dict, Locale } from "@/lib/i18n";
import { formatDay, num } from "@/lib/format";
import type { CategoryId } from "@/lib/carte";
import { pagePath } from "@/lib/pages";

type S = { lang: Locale; d: Dict };

/** Titre de section : petite ligne ube avec une étoile persane, grand titre Fraunces (Vazirmatn en persan). */
export function Heading({ eyebrow, title, id, className = "", children, light = false }: { eyebrow: string; title: string; id?: string; className?: string; children?: React.ReactNode; light?: boolean }) {
  return (
    <div className={className}>
      <p className={`eyebrow flex items-center gap-2 ${light ? "!text-saffron" : ""}`}>
        <Star8 className="h-3.5 w-3.5" />
        {eyebrow}
      </p>
      <h2 id={id} className="display mt-3 text-[2.25rem] md:text-[3.25rem]">
        {title}
      </h2>
      {children}
    </div>
  );
}

/* 3. Hero plein écran : l'ube latte vu de dessus, deux boutons, la note Google et le statut en direct. */
export function Hero({ lang, d }: S) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-6.5rem)] flex-col justify-end overflow-hidden bg-green-deep md:min-h-[calc(100svh-7.5rem)]">
      <Pic src="/media/hero/hero.jpg" d={d} alt={d.hero.alt} sizes="100vw" priority className="!absolute inset-0 -z-20" position="center 55%" />
      {/* Voile neutre en bas (mobile) ou côté texte (écrans larges), pour lire le texte sur la photo */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(20,24,20,0.82)_0%,rgba(20,24,20,0.5)_40%,rgba(20,24,20,0)_72%)] md:bg-[linear-gradient(to_right,rgba(20,24,20,0.78)_0%,rgba(20,24,20,0.4)_45%,rgba(20,24,20,0)_72%)] rtl:md:bg-[linear-gradient(to_left,rgba(20,24,20,0.78)_0%,rgba(20,24,20,0.4)_45%,rgba(20,24,20,0)_72%)]" />
      <div className="mx-auto w-full max-w-7xl px-5 pt-32 pb-10 text-paper md:px-8 md:pb-16">
        <div className="rise max-w-2xl">
          <p className="sign text-saffron-soft">{d.hero.eyebrow}</p>
          <h1 id="hero-title" className="display mt-4 text-[3.25rem] md:text-[5.75rem]">
            {d.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-[1.125rem] leading-relaxed text-paper/90">{d.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={pagePath("carte", lang)} className="btn-light">
              {d.nav.seeMenu}
            </Link>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-line text-paper hover:!border-paper hover:!bg-paper hover:!text-green">
              <PinIcon />
              {d.nav.directions}
            </a>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem]">
            <Rating lang={lang} d={d} />
            <OpenStatus />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 4. Tuiles de catégories en capitales sur photo, juste après le hero. */
const TILES: { id: CategoryId; photo: string; position?: string }[] = [
  { id: "cafes", photo: "/media/cafes-boissons/latte-coeur.jpg" },
  { id: "boissons", photo: "/media/cafes-boissons/ube-chantilly.jpg" },
  { id: "brunch", photo: "/media/brunch/english-breakfast.jpg" },
  { id: "sandwichs", photo: "/media/sandwichs/pastrami-coupe.jpg" },
  { id: "iranien", photo: "/media/plats-iraniens/ash-reshteh.jpg" },
  { id: "douceurs", photo: "/media/douceurs/trio-gateaux.jpg" },
];

export function Tiles({ lang, d }: S) {
  return (
    <section aria-label={d.tiles.title} className="mx-auto max-w-7xl px-5 pt-6 md:px-8 md:pt-8">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-6">
        {TILES.map((t, i) => (
          <Reveal as="li" key={t.id} delay={i * 0.04}>
            <Link href={`${pagePath("carte", lang)}#${t.id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[22px]">
              <Pic src={t.photo} d={d} alt="" sizes="(min-width: 1280px) 16vw, (min-width: 768px) 30vw, 46vw" className="h-full" position={t.position} />
              <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,24,20,0.7),rgba(20,24,20,0)_55%)]" aria-hidden="true" />
              <span className="sign absolute inset-x-3 bottom-4 text-center !text-[0.8125rem] leading-snug text-paper">{d.tiles.items[t.id]}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* 5. Bande de services en 4 pictos. */
export function Services({ d }: S) {
  const icons = [Clock, Wifi, Bag, Bowl];
  return (
    <section aria-label={d.services.title} className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 border-y border-line py-8 md:grid-cols-4 md:py-10">
        {d.services.items.map((s, i) => {
          const Icon = icons[i];
          return (
            <li key={s.t} className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-soft text-green">
                <Icon className="h-7 w-7" />
              </span>
              <p className="mt-3 font-semibold">{s.t}</p>
              <p className="mt-0.5 text-[0.9375rem] text-muted">{s.p}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* 7. Trois blocs alternés : photo, texte court, un seul bouton. */
export function Blocks({ lang, d }: S) {
  const items = [
    { photo: "/media/cafes-boissons/latte-art-versee.jpg", href: pagePath("carte", lang), external: false, tint: "bg-ube-soft" },
    { photo: "/media/plats-iraniens/ash-reshteh.jpg", href: pagePath("iranien", lang), external: false, tint: "bg-saffron-soft" },
    { photo: "/media/facade/facade.jpg", href: site.directionsUrl, external: true, tint: "bg-pistachio-soft", position: "30% 60%" },
  ];
  return (
    <section className="mx-auto max-w-7xl space-y-16 px-5 py-16 md:space-y-28 md:px-8 md:py-24">
      {d.blocks.map((b, i) => {
        const it = items[i];
        const cta = it.external ? (
          <a href={it.href} target="_blank" rel="noopener noreferrer" className="btn">
            <PinIcon />
            {b.cta}
          </a>
        ) : (
          <Link href={it.href} className="btn">
            {b.cta}
            <ArrowIcon />
          </Link>
        );
        return (
          <div key={b.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <Reveal className={`relative ${i % 2 ? "md:order-2" : ""}`}>
              <div className={`absolute -inset-3 -z-10 rounded-[34px] ${it.tint} md:-inset-4`} style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }} aria-hidden="true" />
              <Pic src={it.photo} d={d} sizes="(min-width: 768px) 45vw, 92vw" className="aspect-[4/5] rounded-[28px]" position={it.position} />
            </Reveal>
            <Reveal delay={0.08} className="max-w-md">
              <Heading eyebrow={b.eyebrow} title={b.title} />
              <p className="lead mt-5">{b.text}</p>
              <div className="mt-8">{cta}</div>
            </Reveal>
          </div>
        );
      })}
    </section>
  );
}

/* 8. Plateaux pour bureaux et fêtes : texte, photo, formulaire de demande. */
export function Trays({ d, withHeading = true }: S & { withHeading?: boolean }) {
  return (
    <section id="plateaux" aria-labelledby={withHeading ? "plateaux-title" : undefined} className="bg-green-soft/60 py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          {withHeading && (
            <Heading eyebrow={d.trays.eyebrow} title={d.trays.title} id="plateaux-title">
              <p className="lead mt-5">{d.trays.intro}</p>
            </Heading>
          )}
          <Pic src="/media/sandwichs/focaccias-planche.jpg" d={d} sizes="(min-width: 1024px) 36vw, 92vw" className={`aspect-[4/3] rounded-[28px] ${withHeading ? "mt-8" : ""}`} />
        </div>
        <div className="rounded-[28px] bg-paper p-5 md:p-9">
          <TraysForm />
        </div>
      </div>
    </section>
  );
}

/* 9. Avis : aucun avis inventé. Emplacements tant que data/avis.json est vide, et le lien vers la fiche Google. */
type Review = { name: string; date: string; source: string; rating: number } & Record<Locale, string>;

export function Reviews({ lang, d }: S) {
  const items = avis.items as Review[];
  return (
    <section aria-labelledby="avis-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading eyebrow={d.reviews.eyebrow} title={d.reviews.title} id="avis-title">
          <p className="lead mt-4 max-w-xl">{d.reviews.intro}</p>
        </Heading>
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
          <StarIcon className="h-4 w-4 text-saffron" />
          {d.reviews.google}
        </a>
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {items.length
          ? items.slice(0, 3).map((r) => (
              <li key={r.name + r.date} className="rounded-[22px] border border-line bg-paper p-6">
                <p className="flex gap-0.5 text-saffron" aria-label={`${num(r.rating, lang)}/5`}>
                  {Array.from({ length: r.rating }, (_, k) => (
                    <StarIcon key={k} className="h-4 w-4" />
                  ))}
                </p>
                <blockquote className="mt-3 leading-relaxed">{r[lang] || r.fr}</blockquote>
                <p className="mt-4 text-[0.875rem] text-muted">
                  {r.name} · {r.source} · {formatDay(r.date, lang, { month: "long", year: "numeric" })}
                </p>
              </li>
            ))
          : [0, 1, 2].map((k) => (
              <li key={k} className="flex min-h-44 flex-col items-center justify-center gap-2 rounded-[22px] border border-dashed border-line p-6 text-center text-muted" data-review-slot>
                <span dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR avec de vrais avis clients (data/avis.json), avec leur accord -->" }} />
                <Star8 className="h-5 w-5 text-brass/70" />
                <span className="text-[0.9375rem]">{d.reviews.slot}</span>
              </li>
            ))}
      </ul>
    </section>
  );
}

/* 10. Infos pratiques : adresse, métro, horaires, téléphone, Wi-Fi, plan. */
export function Infos({ lang, d }: S) {
  const pay = site.paymentMethods[lang];
  return (
    <section id="infos" aria-labelledby="infos-title" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <Heading eyebrow={d.infos.eyebrow} title={d.infos.title} id="infos-title" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="grid content-start gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold">{d.infos.address}</h3>
            <address className="mt-2 text-muted not-italic" dir="ltr">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
            <OpenStatus className="mt-3 text-[0.9375rem]" />
          </div>
          <div>
            <h3 className="font-semibold">{d.infos.metro}</h3>
            <ul className="mt-2 space-y-1.5 text-[0.9375rem]">
              {d.infos.stations.map((s) => (
                <li key={s.name}>
                  <span className="font-medium" dir="ltr">
                    {s.name}
                  </span>{" "}
                  <span className="text-muted">
                    · {s.line} · {s.walk}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <h3 className="font-semibold">{d.infos.hours}</h3>
            <div className="mt-2">
              <HoursTable lang={lang} d={d} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold">{d.infos.phone}</h3>
            <a href={`tel:${site.phoneIntl}`} className="link-line mt-2 inline-flex min-h-11 items-center gap-2 font-medium tabular-nums" dir="ltr">
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-line flex min-h-11 items-center gap-2 font-medium" dir="ltr">
              <InstagramIcon className="h-4 w-4" />
              {site.instagramHandle}
            </a>
          </div>
          <div className="rounded-[20px] bg-pistachio-soft p-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <Wifi className="h-5 w-5 text-green" />
              {d.infos.wifi}
            </h3>
            <p className="mt-1.5 text-[0.9375rem] leading-snug text-muted">{d.infos.wifiText}</p>
          </div>
          {pay ? (
            <p className="text-[0.9375rem] text-muted sm:col-span-2">{pay}</p>
          ) : (
            <span hidden dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR : moyens de paiement (data/site.json → paymentMethods) -->" }} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <MapLoader src={site.mapsEmbed} title={d.infos.mapTitle} label={d.infos.mapLoad} note={d.infos.mapNote} className="aspect-[4/3] rounded-[28px] lg:aspect-[5/4]" />
          <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn self-start">
            <PinIcon />
            {d.nav.directions}
          </a>
        </div>
      </div>
    </section>
  );
}

/* 11. FAQ. */
export function Faq({ d }: S) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Heading eyebrow={d.faq.eyebrow} title={d.faq.title} id="faq-title" />
        <div className="border-t border-line">
          {d.faq.items.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-16 items-center justify-between gap-4 py-4 text-[1.0625rem] font-semibold">
                {f.q}
                <span className="faq-plus flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-green" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Petite ligne « Plus de 1 200 avis · ouvert » réutilisée dans les en-têtes de page. */
export function TrustLine({ lang, d }: S) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem]">
      <Rating lang={lang} d={d} />
      <OpenStatus />
    </div>
  );
}


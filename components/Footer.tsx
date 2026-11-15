import Link from "next/link";
import site from "@/data/site.json";
import { Badge } from "@/components/Logo";
import { InstagramIcon, PhoneIcon } from "@/components/icons";
import { LangSwitch } from "@/components/LangSwitch";
import { MotifRule } from "@/components/Doodles";
import { formatTime, num } from "@/lib/format";
import { weekHours } from "@/lib/hours";
import type { Dict, Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const w = weekHours();
  const slot = (s: string[][]) => s.map(([a, b]) => `${formatTime(a, lang)} – ${formatTime(b, lang)}`).join(", ");
  const links = [
    { href: pagePath("carte", lang), label: d.pages.carte.title },
    { href: pagePath("commander", lang), label: d.pages.commander.title },
    { href: pagePath("iranien", lang), label: d.pages.iranien.title },
    { href: pagePath("paris15", lang), label: d.pages.paris15.title },
    { href: pagePath("plateaux", lang), label: d.pages.plateaux.title },
  ];
  return (
    <footer className="bg-green-deep text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8 md:py-16">
        <div>
          <Badge className="h-28 w-28" ring="var(--color-green)" ink="var(--color-cream)" />
          <p className="mt-5 max-w-xs text-paper/80">{d.footer.tagline}</p>
        </div>
        <div>
          <h2 className="text-[0.9375rem] font-semibold text-saffron">{d.infos.address}</h2>
          <address className="mt-3 leading-relaxed not-italic" dir="ltr">
            Shekamou
            <br />
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a href={`tel:${site.phoneIntl}`} className="mt-3 inline-flex min-h-11 items-center gap-2 tabular-nums hover:underline" dir="ltr">
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
          <br />
          <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline decoration-paper/40 underline-offset-4 hover:decoration-paper">
            {d.nav.directions}
          </a>
        </div>
        <div>
          <h2 className="text-[0.9375rem] font-semibold text-saffron">{d.footer.hours}</h2>
          <p className="mt-3 leading-relaxed">
            {d.footer.weekdays}
            <br />
            <span className="tabular-nums">{slot(w[6])}</span>
          </p>
          <p className="mt-2 leading-relaxed">
            {d.footer.saturday}
            <br />
            <span className="tabular-nums">{slot(w[5])}</span>
          </p>
        </div>
        <div>
          <h2 className="text-[0.9375rem] font-semibold text-saffron">{d.footer.pages}</h2>
          <ul className="mt-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <MotifRule className="mx-auto max-w-7xl px-5 !text-saffron/50 md:px-8" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 text-[0.875rem] md:px-8">
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline" dir="ltr">
          <InstagramIcon className="h-5 w-5" />
          {site.instagramHandle}
        </a>
        <div className="flex items-center gap-6">
          <Link href={pagePath("legal", lang)} className="inline-flex min-h-11 items-center hover:underline">
            {d.footer.legal}
          </Link>
          <LangSwitch lang={lang} label={d.nav.lang} />
        </div>
        <p className="w-full text-paper/70 md:w-auto">
          © {num(new Date().getFullYear(), lang, { useGrouping: false })} {d.footer.rights}
        </p>
      </div>
    </footer>
  );
}

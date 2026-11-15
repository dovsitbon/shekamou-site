import site from "@/data/site.json";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { num } from "@/lib/format";
import { StarIcon } from "@/components/icons";

/** Note Google relevée à la main (data/site.json → rating), avec un lien vers la fiche. */
export function Rating({ lang, d, className = "" }: { lang: Locale; d: Dict; className?: string }) {
  const value = num(site.rating.value, lang, { minimumFractionDigits: 1 });
  const count = num(site.rating.count, lang);
  return (
    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-6 items-center gap-2 hover:underline ${className}`} title={fill(d.rating.aria, { value, count })}>
      <StarIcon className="h-4 w-4 text-saffron" />
      <span>
        <span className="font-semibold">{fill(d.rating.label, { value })}</span>
        <span className="opacity-80"> · {fill(d.rating.count, { count })}</span>
      </span>
    </a>
  );
}

import { formatTime } from "@/lib/format";
import { weekHours } from "@/lib/hours";
import type { Dict, Locale } from "@/lib/i18n";

/** Horaires de la semaine (data/horaires.json), du lundi au dimanche. */
export function HoursTable({ lang, d }: { lang: Locale; d: Dict }) {
  const week = weekHours();
  return (
    <table className="w-full text-[0.9375rem]">
      <tbody>
        {week.map((slots, i) => (
          <tr key={i} className="border-b border-line last:border-0">
            <th scope="row" className="py-2 pe-4 text-start font-normal">
              {d.infos.days[i]}
            </th>
            <td className={`py-2 text-end tabular-nums ${slots.length ? "" : "text-muted"}`}>{slots.length ? slots.map(([a, b]) => `${formatTime(a, lang)} – ${formatTime(b, lang)}`).join(" · ") : d.infos.closed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import hours from "@/data/horaires.json";
import { isoDay } from "@/lib/format";
import site from "@/data/site.json";

export type Slot = [string, string];
type Week = Record<string, Slot[]>;
type Exception = { date: string; closed?: boolean; slots?: Slot[] };
export type Closure = { id: string; from: string; to: string; fr: string; en: string; fa: string };

const week = hours.week as unknown as Week;
const exceptions = hours.exceptions as Exception[];
export const closures = hours.closures as Closure[];

/** Jour ISO (1 = lundi … 7 = dimanche) d'une date AAAA-MM-JJ. */
export const weekday = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return ((new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7) + 1;
};

export const addDays = (iso: string, n: number) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
};

/** Fermeture (vacances) en cours ce jour-là. */
export const closureOn = (iso: string) => closures.find((c) => c.from <= iso && iso <= c.to) ?? null;

/** Fermeture en cours ou qui commence dans les `days` prochains jours (pour le bandeau). */
export const upcomingClosure = (iso: string, days = 14) => closures.find((c) => c.to >= iso && c.from <= addDays(iso, days)) ?? null;

/** Créneaux d'ouverture d'un jour donné (vacances et fermetures exceptionnelles comprises). */
export function slotsOn(iso: string): Slot[] {
  if (closureOn(iso)) return [];
  const ex = exceptions.find((e) => e.date === iso);
  if (ex) return ex.closed ? [] : (ex.slots ?? []);
  return week[String(weekday(iso))] ?? [];
}

/** Heure de Paris « HH:MM ». */
export const parisTime = (date: Date) => new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", hour12: false }).format(date);

export type Status = { open: true; until: string } | { open: false; nextDay: string | null; at: string | null };

/** Ouvert / fermé en ce moment, et prochaine ouverture. */
export function statusAt(date: Date): Status {
  const today = isoDay(date);
  const now = parisTime(date);
  for (const [a, b] of slotsOn(today)) if (now >= a && now < b) return { open: true, until: b };
  const later = slotsOn(today).find(([a]) => a > now);
  if (later) return { open: false, nextDay: today, at: later[0] };
  for (let i = 1; i <= 45; i++) {
    const day = addDays(today, i);
    const s = slotsOn(day);
    if (s.length) return { open: false, nextDay: day, at: s[0][0] };
  }
  return { open: false, nextDay: null, at: null };
}

/** Horaires de la semaine, du lundi au dimanche, pour l'affichage et le schema.org. */
export const weekHours = () => [1, 2, 3, 4, 5, 6, 7].map((n) => week[String(n)] ?? []);

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/**
 * Créneaux de retrait d'un jour (commande à emporter) : toutes les 15 minutes pendant l'ouverture,
 * à partir de « maintenant + délai de préparation » (data/site.json → order.leadMinutes), jusqu'à 15 minutes avant la fermeture.
 */
export function pickupTimes(iso: string, now: Date): string[] {
  const step = site.order.stepMinutes;
  const today = isoDay(now);
  if (iso < today) return [];
  const earliest = iso === today ? toMin(parisTime(now)) + site.order.leadMinutes : 0;
  const out: string[] = [];
  for (const [a, b] of slotsOn(iso)) {
    const start = Math.max(toMin(a) + step, Math.ceil(earliest / step) * step);
    for (let t = start; t <= toMin(b) - step; t += step) out.push(toHHMM(t));
  }
  return out;
}

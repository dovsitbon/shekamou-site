import site from "@/data/site.json";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay, formatTime, isoDay, num, price } from "@/lib/format";
import { isItem, isOrderable, itemById, unitPrice } from "@/lib/carte";
import { addDays, pickupTimes } from "@/lib/hours";

// Les deux demandes du site : commande à emporter (order) et plateaux pour bureaux et fêtes (trays).

export const TRAY_KINDS = ["office", "breakfast", "party", "iranian", "other"] as const;
export type TrayKind = (typeof TRAY_KINDS)[number];
export const TRAY_WANTS = ["coffee", "viennoiseries", "sandwiches", "iranian", "cakes", "drinks"] as const;
export type TrayWant = (typeof TRAY_WANTS)[number];

type Contact = { name: string; phone: string; email: string; message: string };
export type OrderLine = { item: string; qty: number };
export type Order = Contact & { lines: OrderLine[]; day: string; time: string };
export type Trays = Contact & { day: string; time: string; guests: number; kind: TrayKind; wants: TrayWant[] };

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Jours de retrait proposés : aujourd'hui et les jours suivants qui ont encore un créneau. */
export function pickupDays(now: Date) {
  const today = isoDay(now);
  return Array.from({ length: site.order.daysAhead + 1 }, (_, i) => addDays(today, i)).filter((day) => pickupTimes(day, now).length > 0);
}

export const traysMinDay = (now: Date) => addDays(isoDay(now), 1);
export const traysMaxDay = (now: Date) => addDays(isoDay(now), site.trays.daysAhead);

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const day = (v: unknown) => (ISO.test(str(v, 10)) ? str(v, 10) : "");
// Marge de 10 minutes : le client a pu choisir son heure juste avant qu'elle ne sorte de la liste
const grace = (now: Date) => new Date(now.getTime() - 10 * 60_000);

function contact(o: Record<string, unknown>, emailRequired = false): Contact | null {
  const c = { name: str(o.name, 120), phone: str(o.phone, 30), email: str(o.email, 160), message: str(o.message, 1000) };
  if (!c.name || !isPhone(c.phone)) return null;
  if (c.email && !isEmail(c.email)) c.email = "";
  if (emailRequired && !c.email) return null;
  return c;
}

export function parseOrder(v: unknown, now = new Date()): Order | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const c = contact(o);
  const lines = (Array.isArray(o.lines) ? o.lines : []).slice(0, 40).flatMap((l): OrderLine[] => {
    if (!l || typeof l !== "object") return [];
    const x = l as Record<string, unknown>;
    if (!isItem(x.item) || !isOrderable(x.item)) return [];
    return [{ item: x.item, qty: Math.min(Math.max(Math.round(Number(x.qty) || 1), 1), site.order.maxPerLine) }];
  });
  const d = day(o.day);
  const time = str(o.time, 5);
  if (!c || !lines.length || !d || !pickupTimes(d, grace(now)).includes(time)) return null;
  return { ...c, lines, day: d, time };
}

export function parseTrays(v: unknown, now = new Date()): Trays | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const c = contact(o, true);
  const d = day(o.day);
  const guests = Math.round(Number(o.guests) || 0);
  const wants = (Array.isArray(o.wants) ? o.wants : []).filter((w): w is TrayWant => TRAY_WANTS.includes(w as TrayWant));
  const time = /^\d{2}:\d{2}$/.test(str(o.time, 5)) ? str(o.time, 5) : "";
  if (!c || !d || d < isoDay(now) || d > traysMaxDay(now) || !TRAY_KINDS.includes(o.kind as TrayKind) || guests < site.trays.minGuests || guests > site.trays.maxGuests) return null;
  return { ...c, day: d, time, guests, kind: o.kind as TrayKind, wants: [...new Set(wants)] };
}

/** Total estimé ; « partial » si un des articles n'a pas encore de prix. */
export function orderTotal(lines: OrderLine[]) {
  let sum = 0;
  let partial = false;
  for (const l of lines) {
    const p = unitPrice(l.item);
    if (p === null) partial = true;
    else sum += p * l.qty;
  }
  return { sum, partial };
}

const colon = (lang: Locale) => (lang === "fr" ? " :" : lang === "fa" ? ":" : ":");
const longDay = (iso: string, lang: Locale) => formatDay(iso, lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const join = (blocks: (string | false)[]) => blocks.filter(Boolean).join("\n\n");

function who(q: Contact, m: { name: string; phone: string; email: string }, c: string) {
  return [`${m.name}${c} ${q.name}`, `${m.phone}${c} ${q.phone}`, q.email ? `${m.email}${c} ${q.email}` : ""].filter(Boolean).join("\n");
}

export const itemName = (id: string, lang: Locale) => itemById(id)?.[lang].name ?? id;

export function orderText(q: Order, lang: Locale, d: Dict, withContact = true) {
  const m = d.order.mail;
  const c = colon(lang);
  const { sum, partial } = orderTotal(q.lines);
  const total = sum > 0 ? `${price(sum, lang)}${partial ? ` + ${d.carte.priceOnSite}` : ""}` : d.carte.priceOnSite;
  return join([
    [`${m.lines}${c}`, ...q.lines.map((l) => `– ${num(l.qty, lang)} × ${itemName(l.item, lang)}`)].join("\n"),
    `${m.pickup}${c} ${longDay(q.day, lang)}, ${formatTime(q.time, lang)}`,
    `${m.total}${c} ${total}`,
    withContact && who(q, m, c),
    !!q.message && `${m.message}${c}\n${q.message}`,
  ]);
}

export function traysText(t: Trays, lang: Locale, d: Dict, withContact = true) {
  const m = d.trays.mail;
  const c = colon(lang);
  return join([
    [
      `${m.date}${c} ${longDay(t.day, lang)}${t.time ? `, ${formatTime(t.time, lang)}` : ""}`,
      `${m.kind}${c} ${d.trays.kinds[t.kind]}`,
      `${m.guests}${c} ${num(t.guests, lang)}`,
      t.wants.length ? `${m.wants}${c} ${t.wants.map((w) => d.trays.wants[w]).join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    withContact && who(t, m, c),
    !!t.message && `${m.message}${c}\n${t.message}`,
  ]);
}

/** Lien WhatsApp (vide tant que le café n'a pas donné de portable : data/site.json → whatsapp). */
export const waLink = (text: string) => (site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "");

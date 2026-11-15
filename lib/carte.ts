import carte from "@/data/carte.json";
import type { Locale } from "@/lib/locales";

// La carte (data/carte.json), typée.

export type Text = { name: string; desc: string; about?: string };
export type Item = {
  id: string;
  price: number | null;
  photo?: string;
  signature?: boolean;
  veg?: boolean;
  weekend?: boolean;
  isNew?: boolean;
  orderable?: boolean;
} & Record<Locale, Text>;
export type CategoryId = "cafes" | "boissons" | "brunch" | "sandwichs" | "iranien" | "douceurs";
export type Category = { id: CategoryId; items: Item[] } & Record<Locale, string>;

export const CATEGORIES = carte.categories as Category[];
export const CHECKED = carte.checked;

const all = new Map<string, Item>(CATEGORIES.flatMap((c) => c.items.map((i) => [i.id, i] as const)));
export const itemById = (id: string) => all.get(id) ?? null;
export const allItems = () => [...all.values()];
export const isItem = (v: unknown): v is string => typeof v === "string" && all.has(v);
export const isOrderable = (id: string) => {
  const it = all.get(id);
  return !!it && it.orderable !== false;
};
export const unitPrice = (id: string) => all.get(id)?.price ?? null;
export const categoryOf = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;

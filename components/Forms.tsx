"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import site from "@/data/site.json";
import { useCart, useLocale } from "@/components/providers";
import { CheckIcon, MinusIcon, PhoneIcon, PlusIcon, WhatsAppIcon } from "@/components/icons";
import { isOrderable, unitPrice } from "@/lib/carte";
import { formatDay, formatTime, num, price } from "@/lib/format";
import { pickupTimes } from "@/lib/hours";
import { fill } from "@/lib/text";
import { pagePath } from "@/lib/pages";
import { isEmail, isPhone, itemName, orderText, orderTotal, pickupDays, TRAY_KINDS, TRAY_WANTS, traysMaxDay, traysMinDay, traysText, waLink, type Order, type TrayKind, type Trays, type TrayWant } from "@/lib/requests";

// Les deux formulaires du site : commande à emporter et plateaux (bureaux, fêtes).
// Chacun envoie à /api/demande (e-mail au café + confirmation au client). Si l'e-mail n'est pas encore branché,
// le message de fin demande au client d'appeler le café avec le récapitulatif.

type Errors = Record<string, string>;
type Done = { notified: boolean; text: string } | null;

function useNow() {
  // L'heure du navigateur n'est connue qu'après hydratation : les listes d'heures se remplissent à ce moment-là
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- horloge du navigateur
    setNow(new Date());
  }, []);
  return now;
}

async function send(kind: "order" | "trays", lang: string, data: unknown, website: string) {
  const res = await fetch("/api/demande", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, lang, data, website }) });
  if (!res.ok) throw new Error("send");
  return (await res.json()) as { ok: boolean; notified: boolean };
}

function Field({ label, error, optional, children, className = "" }: { label: string; error?: string; optional?: string; children: (p: { id: string; "aria-invalid"?: true; "aria-describedby"?: string }) => ReactNode; className?: string }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="font-normal text-muted"> ({optional})</span>}
      </label>
      {children({ id, ...(error ? { "aria-invalid": true as const, "aria-describedby": `${id}-e` } : {}) })}
      {error && (
        <p id={`${id}-e`} className="mt-1.5 text-[0.875rem] text-red">
          {error}
        </p>
      )}
    </div>
  );
}

/** Champ piège pour les robots : invisible, jamais rempli par un humain. */
function Trap({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="absolute -start-[9999px]" aria-hidden="true">
      <label>
        Site web
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

type ContactV = { name: string; phone: string; email: string; message: string };

function ContactFields({ v, set, errors, messagePh, emailRequired = false }: { v: ContactV; set: (k: keyof ContactV, val: string) => void; errors: Errors; messagePh: string; emailRequired?: boolean }) {
  const { d } = useLocale();
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={d.form.name} error={errors.name}>
          {(p) => <input {...p} className="field" name="name" autoComplete="name" required value={v.name} onChange={(e) => set("name", e.target.value)} />}
        </Field>
        <Field label={d.form.phone} error={errors.phone}>
          {(p) => <input {...p} className="field" dir="ltr" name="tel" type="tel" inputMode="tel" autoComplete="tel" required value={v.phone} onChange={(e) => set("phone", e.target.value)} />}
        </Field>
      </div>
      <Field label={d.form.email} optional={emailRequired ? undefined : d.form.optional} error={errors.email}>
        {(p) => <input {...p} className="field" dir="ltr" name="email" type="email" autoComplete="email" spellCheck={false} required={emailRequired} value={v.email} onChange={(e) => set("email", e.target.value)} />}
      </Field>
      <Field label={d.form.message} optional={d.form.optional}>
        {(p) => <textarea {...p} className="field" name="message" rows={3} placeholder={messagePh} value={v.message} onChange={(e) => set("message", e.target.value)} />}
      </Field>
    </>
  );
}

function contactErrors(v: ContactV, e: Errors, d: ReturnType<typeof useLocale>["d"], emailRequired = false) {
  if (!v.name.trim()) e.name = d.form.errors.name;
  if (!isPhone(v.phone)) e.phone = d.form.errors.phone;
  if (emailRequired && !v.email.trim()) e.email = d.form.errors.emailRequired;
  else if (v.email.trim() && !isEmail(v.email)) e.email = d.form.errors.email;
}

function Submit({ busy, label, failed }: { busy: boolean; label: string; failed: boolean }) {
  const { d } = useLocale();
  return (
    <div>
      {failed && (
        <p role="alert" className="mb-4 border-s-2 border-red ps-3 text-red">
          {d.form.failed}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" className="btn" disabled={busy}>
          {busy ? d.form.sending : label}
        </button>
        <a href={`tel:${site.phoneIntl}`} className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] hover:underline">
          <PhoneIcon className="h-4 w-4" />
          {d.form.orCall} <span dir="ltr">{site.phone}</span>
        </a>
      </div>
      <p className="mt-4 text-[0.875rem] text-muted">{d.form.privacy}</p>
    </div>
  );
}

function Thanks({ title, text, recap, onAgain }: { title: string; text: string; recap: string; onAgain: () => void }) {
  const { d } = useLocale();
  const wa = waLink(recap);
  return (
    <div role="status" className="fade-in rounded-[22px] border border-line bg-paper p-6 md:p-9">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-paper">
        <CheckIcon className="h-5 w-5" />
      </span>
      <h2 className="display mt-5 text-[1.875rem]">{title}</h2>
      <p className="mt-3 max-w-xl text-muted">{text}</p>
      <pre className="mt-6 border-t border-line pt-5 font-[inherit] text-[0.9375rem] leading-relaxed whitespace-pre-wrap">{recap}</pre>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href={`tel:${site.phoneIntl}`} className="btn">
          <PhoneIcon className="h-5 w-5" />
          {d.nav.call} <span dir="ltr">{site.phone}</span>
        </a>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-line">
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        )}
        <button type="button" className="btn-line" onClick={onAgain}>
          {d.form.again}
        </button>
      </div>
    </div>
  );
}

function focusFirstError(form: HTMLFormElement) {
  requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
}

/* ——— Commande à emporter ——— */
export function OrderForm() {
  const { lang, d } = useLocale();
  const { cart, add, clear, ready } = useCart();
  const now = useNow();
  const blank = { day: "", time: "", name: "", phone: "", email: "", message: "" };
  const [v, setV] = useState(blank);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState<Done>(null);
  const set = (k: keyof typeof blank, val: string) => setV((p) => ({ ...p, [k]: val }));

  const lines = useMemo(() => Object.entries(cart).filter(([id, q]) => q > 0 && isOrderable(id)).map(([item, qty]) => ({ item, qty })), [cart]);
  const days = useMemo(() => (now ? pickupDays(now) : []), [now]);
  const day = v.day || days[0] || "";
  const times = useMemo(() => (now && day ? pickupTimes(day, now) : []), [now, day]);
  const { sum, partial } = orderTotal(lines);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const er: Errors = {};
    if (!lines.length) er.cart = d.form.errors.cart;
    if (!times.includes(v.time)) er.time = d.form.errors.time;
    contactErrors(v, er, d);
    setErrors(er);
    if (Object.keys(er).length) return focusFirstError(e.currentTarget);
    const data: Order = { ...v, day, lines };
    setBusy(true);
    setFailed(false);
    try {
      const r = await send("order", lang, data, trap);
      setDone({ notified: r.notified, text: orderText(data, lang, d) });
      clear();
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <Thanks
        title={d.order.doneTitle}
        text={done.notified ? d.order.done : d.order.doneNoMail}
        recap={done.text}
        onAgain={() => {
          setDone(null);
          setV(blank);
        }}
      />
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Trap value={trap} onChange={setTrap} />
      <section aria-labelledby="panier-titre" className="rounded-[22px] border border-line bg-paper p-5 md:p-7">
        <h2 id="panier-titre" className="display text-[1.5rem]">
          {d.order.cart}
        </h2>
        {ready && !lines.length ? (
          <div className="mt-4">
            <p className={errors.cart ? "text-red" : "text-muted"} role={errors.cart ? "alert" : undefined}>
              {d.order.empty}
            </p>
            <Link href={pagePath("carte", lang)} className="btn mt-5">
              {d.order.toMenu}
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-3 divide-y divide-line">
              {lines.map((l) => {
                const p = unitPrice(l.item);
                const name = itemName(l.item, lang);
                return (
                  <li key={l.item} className="flex items-center gap-3 py-3">
                    <span className="min-w-0 flex-1 font-medium">{name}</span>
                    <span className="text-[0.9375rem] text-muted tabular-nums">{p !== null ? price(p * l.qty, lang) : d.carte.priceOnSite}</span>
                    <span className="flex shrink-0 items-center">
                      <button type="button" onClick={() => add(l.item, -1)} className="flex h-11 w-10 items-center justify-center text-green" aria-label={fill(d.carte.removeAria, { name })}>
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="min-w-6 text-center font-semibold tabular-nums">{num(l.qty, lang)}</span>
                      <button type="button" onClick={() => add(l.item, 1)} className="flex h-11 w-10 items-center justify-center text-green" aria-label={fill(d.carte.addAria, { name })}>
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <Link href={pagePath("carte", lang)} className="link-line inline-flex min-h-11 items-center text-[0.9375rem] font-medium">
                {d.order.addMore}
              </Link>
              {lines.length > 0 && (
                <p className="text-[0.9375rem]">
                  {d.order.total} : <span className="font-semibold">{sum > 0 ? `${price(sum, lang)}${partial ? ` + ${d.carte.priceOnSite}` : ""}` : d.carte.priceOnSite}</span>
                </p>
              )}
            </div>
          </>
        )}
      </section>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={d.order.pickupDay}>
          {(p) => (
            <select {...p} className="field" name="day" value={day} onChange={(e) => setV((x) => ({ ...x, day: e.target.value, time: "" }))}>
              {days.map((x) => (
                <option key={x} value={x}>
                  {formatDay(x, lang)}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field label={d.order.pickupTime} error={errors.time}>
          {(p) => (
            <select {...p} className="field" name="time" required value={v.time} onChange={(e) => set("time", e.target.value)}>
              <option value="">{now && !times.length ? d.form.noTime : d.form.chooseTime}</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {formatTime(t, lang)}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>
      <ContactFields v={v} set={set} errors={errors} messagePh={d.order.messagePh} />
      <p className="text-[0.9375rem] text-muted">{d.order.payOnSite}</p>
      <Submit busy={busy} label={d.order.submit} failed={failed} />
    </form>
  );
}

/* ——— Plateaux pour bureaux et fêtes ——— */
export function TraysForm() {
  const { lang, d } = useLocale();
  const now = useNow();
  const blank = { day: "", time: "", guests: "", kind: "" as TrayKind | "", wants: [] as TrayWant[], name: "", phone: "", email: "", message: "" };
  const [v, setV] = useState(blank);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState<Done>(null);
  const setC = (k: keyof ContactV, val: string) => setV((p) => ({ ...p, [k]: val }));
  const toggle = (w: TrayWant) => setV((p) => ({ ...p, wants: p.wants.includes(w) ? p.wants.filter((x) => x !== w) : [...p.wants, w] }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const er: Errors = {};
    if (!v.kind) er.kind = d.form.errors.kind;
    if (!v.day) er.day = d.form.errors.date;
    const guests = Number(v.guests);
    if (!guests || guests < site.trays.minGuests) er.guests = guests ? fill(d.trays.small, { n: site.trays.minGuests }) : d.form.errors.guests;
    contactErrors(v, er, d, true);
    setErrors(er);
    if (Object.keys(er).length) return focusFirstError(e.currentTarget);
    const data: Trays = { ...v, kind: v.kind as TrayKind, guests };
    setBusy(true);
    setFailed(false);
    try {
      const r = await send("trays", lang, data, trap);
      setDone({ notified: r.notified, text: traysText(data, lang, d) });
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <Thanks
        title={d.trays.doneTitle}
        text={done.notified ? d.trays.done : d.trays.doneNoMail}
        recap={done.text}
        onAgain={() => {
          setDone(null);
          setV(blank);
        }}
      />
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Trap value={trap} onChange={setTrap} />
      <fieldset>
        <legend className="label">{d.trays.kind}</legend>
        <div className="flex flex-wrap gap-2">
          {TRAY_KINDS.map((k) => (
            <label key={k} className="chip">
              <input type="radio" name="kind" value={k} checked={v.kind === k} onChange={() => setV((p) => ({ ...p, kind: k }))} className="sr-only" />
              {d.trays.kinds[k]}
            </label>
          ))}
        </div>
        {errors.kind && <p className="mt-1.5 text-[0.875rem] text-red">{errors.kind}</p>}
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label={d.trays.date} error={errors.day}>
          {(p) => <input {...p} className="field" type="date" name="date" required min={now ? traysMinDay(now) : undefined} max={now ? traysMaxDay(now) : undefined} value={v.day} onChange={(e) => setV((x) => ({ ...x, day: e.target.value }))} />}
        </Field>
        <Field label={d.trays.time} optional={d.form.optional}>
          {(p) => <input {...p} className="field" type="time" name="time" step={900} value={v.time} onChange={(e) => setV((x) => ({ ...x, time: e.target.value }))} />}
        </Field>
        <Field label={d.trays.guests} error={errors.guests}>
          {(p) => <input {...p} className="field" type="number" name="guests" inputMode="numeric" min={site.trays.minGuests} max={site.trays.maxGuests} required value={v.guests} onChange={(e) => setV((x) => ({ ...x, guests: e.target.value }))} />}
        </Field>
      </div>
      {Number(v.guests) > 0 && Number(v.guests) < site.trays.minGuests && (
        <p className="border-s-2 border-saffron ps-3 text-[0.9375rem]">
          {fill(d.trays.small, { n: num(site.trays.minGuests, lang) })}{" "}
          <Link href={pagePath("commander", lang)} className="link-line font-medium">
            {d.nav.orderCta}
          </Link>
        </p>
      )}
      <fieldset>
        <legend className="label">
          {d.trays.wantsLegend} <span className="font-normal text-muted">({d.form.optional})</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {TRAY_WANTS.map((w) => (
            <label key={w} className="chip">
              <input type="checkbox" name="wants" value={w} checked={v.wants.includes(w)} onChange={() => toggle(w)} className="sr-only" />
              {v.wants.includes(w) && <CheckIcon className="h-4 w-4" />}
              {d.trays.wants[w]}
            </label>
          ))}
        </div>
      </fieldset>
      <ContactFields v={v} set={setC} errors={errors} messagePh={d.trays.messagePh} emailRequired />
      <p className="text-[0.9375rem] text-muted">{d.trays.note}</p>
      <Submit busy={busy} label={d.trays.submit} failed={failed} />
    </form>
  );
}


// Outils de dessin partagés par les scripts (logo, image de partage, affichette) :
// texte converti en tracés (aucune police à installer), la tasse du logo, le badge rond, le cœur de latte art.
import { readFile } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";

export const ROOT = path.resolve(import.meta.dirname, "..");
// Charte : vert sapin du store et du logo, crème, laiton de l'enseigne, accents ube et safran.
export const C = {
  cream: "#FBF6EE",
  paper: "#FFFDF8",
  green: "#23402F",
  greenDeep: "#172C20",
  greenSoft: "#E4EBDC",
  ube: "#6B4FA0",
  saffron: "#E0A526",
  pistachio: "#93B56B",
  rose: "#E8A0A8",
  brass: "#8A6A2F",
  ink: "#22201F",
  muted: "#5B544E",
};

async function load(file) {
  const buf = await readFile(path.join(ROOT, "node_modules", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

export const fonts = {
  display: await load("@fontsource/fraunces/files/fraunces-latin-500-normal.woff"),
  displaySemi: await load("@fontsource/fraunces/files/fraunces-latin-600-normal.woff"),
  text: await load("@fontsource/inter/files/inter-latin-400-normal.woff"),
  medium: await load("@fontsource/inter/files/inter-latin-500-normal.woff"),
  bold: await load("@fontsource/inter/files/inter-latin-600-normal.woff"),
};

/** Largeur d'un texte, interlettrage compris (tracking en em). */
export function width(font, text, size, tracking = 0) {
  return font.getAdvanceWidth(text, size) + tracking * size * (text.length - 1);
}

/** Texte en tracés SVG. anchor : start | middle | end. tracking en em. */
export function text(font, str, x, y, size, { fill = C.ink, anchor = "start", tracking = 0 } = {}) {
  const w = width(font, str, size, tracking);
  let cursor = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  let d = "";
  for (const ch of str) {
    d += font.getPath(ch, cursor, y, size).toPathData(2);
    cursor += font.getAdvanceWidth(ch, size) + tracking * size;
  }
  return `<path d="${d}" fill="${fill}"/>`;
}

/** Texte en arc au-dessus d'un centre (cx, cy), rayon r (ligne de base), centré sur le haut du cercle. */
export function arcText(font, str, cx, cy, r, size, { fill = C.cream, tracking = 0 } = {}) {
  const total = width(font, str, size, tracking);
  let s = -total / 2;
  let out = "";
  for (const ch of str) {
    const adv = font.getAdvanceWidth(ch, size);
    const mid = s + adv / 2;
    const angle = mid / r; // radians, 0 = haut du cercle
    const x = cx + r * Math.sin(angle);
    const y = cy - r * Math.cos(angle);
    const glyph = font.getPath(ch, -adv / 2, 0, size).toPathData(2);
    out += `<path d="${glyph}" fill="${fill}" transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${((angle * 180) / Math.PI).toFixed(2)})"/>`;
    s += adv + tracking * size;
  }
  return out;
}

// La tasse du logo, boîte 64 × 64 (mêmes tracés que components/Doodles.tsx).
export const CUP = [
  "M14 27h30v5c0 9.4-6.7 16-15 16s-15-6.6-15-16v-5Z",
  "M44 30.5h3.2a5.3 5.3 0 0 1 0 10.6H42",
  "M8 52c5 2.6 12.6 4 21 4s16-1.4 21-4",
  "M24 21c-3-3.4 3-5.6 0-9.6M33.5 21c-3-3.4 3-5.6 0-9.6",
];
const HEART = "M29 39.5c-3.2-1.9-5-3.5-5-5.3 0-1.3 1-2.3 2.3-2.3 1.1 0 2 .6 2.7 1.6.7-1 1.6-1.6 2.7-1.6 1.3 0 2.3 1 2.3 2.3 0 1.8-1.8 3.4-5 5.3Z";

/** Tasse au trait en (x, y), taille s (côté de la boîte), avec ou sans cœur ube. */
export function cup(x, y, s, { stroke = C.green, width = 2.4, heart = true } = {}) {
  const k = s / 64;
  return `<g transform="translate(${x} ${y}) scale(${k})"><g fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${CUP.map((d) => `<path d="${d}"/>`).join("")}</g>${heart ? `<path d="${HEART}" fill="${C.ube}"/>` : ""}</g>`;
}

/** Badge rond, comme le vrai logo : « L'ART DU BON CAFÉ » en arc, tasse, « SHEKAMOU », petit trait ondulé. Centre (cx, cy), rayon R. */
export function badge(cx, cy, R, { ring = C.green, ink = C.cream } = {}) {
  const k = R / 96;
  return [
    `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${ring}"/>`,
    `<circle cx="${cx}" cy="${cy}" r="${86 * k}" fill="none" stroke="${ink}" stroke-opacity="0.35" stroke-width="${1.2 * k}"/>`,
    arcText(fonts.display, "L'ART DU BON CAFÉ", cx, cy + 4 * k, 64 * k, 15 * k, { fill: ink, tracking: 0.2 }),
    cup(cx - 36 * k, cy - 44 * k, 72 * k, { stroke: ink, width: 2.4, heart: false }),
    text(fonts.displaySemi, "SHEKAMOU", cx, cy + 46 * k, 20 * k, { fill: ink, anchor: "middle", tracking: 0.14 }),
    `<path d="M${cx - 22 * k} ${cy + 58 * k}c${7 * k} ${4 * k} ${14 * k} ${-4 * k} ${22 * k} 0s${15 * k} ${-4 * k} ${22 * k} 0" fill="none" stroke="${ink}" stroke-opacity="0.7" stroke-width="${1.4 * k}" stroke-linecap="round"/>`,
  ].join("");
}

/** Logo horizontal : tasse + « SHEKAMOU » + « L'ART DU BON CAFÉ ». x = gauche, y = haut, h = hauteur de la tasse. */
export function wordmark(x, y, h, { mark = C.green, word = C.green, sub = C.brass, heart = true } = {}) {
  const size = h * 0.56;
  return [
    cup(x, y, h, { stroke: mark, heart }),
    text(fonts.displaySemi, "SHEKAMOU", x + h * 1.05, y + h * 0.6, size, { fill: word, tracking: 0.1 }),
    text(fonts.medium, "L'ART DU BON CAFÉ", x + h * 1.07, y + h * 0.88, size * 0.36, { fill: sub, tracking: 0.3 }),
  ].join("");
}

export const wordmarkWidth = (h) => h * 1.05 + width(fonts.displaySemi, "SHEKAMOU", h * 0.56, 0.1);

/** Étoile persane à huit branches, centrée en (cx, cy), largeur w. */
export function star8(cx, cy, w, { stroke = C.brass, width = 1.5 } = {}) {
  const s = w / 24;
  return `<g transform="translate(${cx - 12 * s} ${cy - 12 * s}) scale(${s})" fill="none" stroke="${stroke}" stroke-width="${width / s}" stroke-linejoin="round"><path d="M12 2.5 14.8 6h4.6v4.6L22.5 12l-3.1 1.4V18h-4.6L12 21.5 9.2 18H4.6v-4.6L1.5 12l3.1-1.4V6h4.6L12 2.5Z"/><circle cx="12" cy="12" r="2.6"/></g>`;
}

// Logo de Shekamou, redessiné d'après son badge (photo de profil Instagram, enseigne de la façade) :
// cercle vert sapin, « L'ART DU BON CAFÉ » en arc, tasse fumante au trait, « SHEKAMOU » en capitales à empattements.
//   npm run logo
// → public/logo.svg (badge rond), public/logo-horizontal.svg (fond clair), public/logo-clair.svg (fond sombre),
//   app/icon.svg (favicon), app/apple-icon.png (180 px), public/icon-512.png, assets/logo-apercu.png.
// Pour mettre son fichier d'origine : remplacez public/logo.svg (même nom).
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ROOT, C, badge, cup, wordmark, wordmarkWidth } from "./draw.mjs";

const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>\n`;

await writeFile(path.join(ROOT, "public/logo.svg"), svg(200, 200, badge(100, 100, 96)));
const ww = Math.ceil(wordmarkWidth(64)) + 8;
await writeFile(path.join(ROOT, "public/logo-horizontal.svg"), svg(ww, 72, wordmark(4, 4, 64)));
await writeFile(path.join(ROOT, "public/logo-clair.svg"), svg(ww, 72, wordmark(4, 4, 64, { mark: C.cream, word: C.cream, sub: "#F8EBCB", heart: true })));

// Favicon : la tasse crème et son cœur ube sur le vert du badge
const mark = (size) => svg(size, size, `<g transform="scale(${size / 100})"><rect width="100" height="100" rx="24" fill="${C.green}"/>${cup(14, 10, 72, { stroke: C.cream, width: 3.6 })}</g>`);
await writeFile(path.join(ROOT, "app/icon.svg"), mark(100));
await sharp(Buffer.from(mark(512))).resize(180, 180).flatten({ background: C.green }).png().toFile(path.join(ROOT, "app/apple-icon.png"));
await sharp(Buffer.from(mark(512))).png().toFile(path.join(ROOT, "public/icon-512.png"));

// Aperçu à comparer avec l'original
await sharp(Buffer.from(svg(640, 240, `<rect width="640" height="240" fill="${C.cream}"/>${badge(120, 120, 100)}${wordmark(250, 88, 64)}`)))
  .png()
  .toFile(path.join(ROOT, "assets/logo-apercu.png"));
console.log("logo.svg, logo-horizontal.svg, logo-clair.svg, icon.svg, apple-icon.png, icon-512.png écrits");

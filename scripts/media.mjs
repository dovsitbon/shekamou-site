// Photos du site.
//   npm run media
//
// 1. Prépare pour le web toutes les photos de assets/<dossier>/ dans public/media/<dossier>/
//    (next/image sert ensuite AVIF/WebP à la bonne taille) et note leurs dimensions dans data/media-sizes.json.
// 2. Fabrique l'image de partage public/og.jpg (1200 × 630).
//
// Pour ajouter une photo prise sur place : déposez-la sous le nom attendu (voir assets/A-PHOTOGRAPHIER.md),
// par ex. assets/boutique/comptoir.jpg, puis relancez « npm run media » : l'emplacement dessiné disparaît.
// assets/raw/ : images brutes d'Instagram (non publiées telles quelles), triées dans les dossiers ci-dessus.
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ROOT, C, fonts, text, wordmark, star8 } from "./draw.mjs";

const CATS = ["hero", "cafes-boissons", "plats-iraniens", "brunch", "sandwichs", "douceurs", "boutique", "facade"];
// Recadrages : le titre incrusté en haut de la photo du haleem ; le passant à droite de la façade (pas de visages de clients)
const CROP = { "plats-iraniens/haleem": { top: 0.22 }, "facade/facade": { right: 0.24 } };

const sizes = {};
await rm(path.join(ROOT, "public/media"), { recursive: true, force: true });
for (const cat of CATS) {
  const dir = path.join(ROOT, "assets", cat);
  await mkdir(dir, { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  for (const f of (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
    const name = f.replace(/\.\w+$/, "").toLowerCase();
    const max = cat === "hero" ? 2400 : 1600;
    let img = sharp(path.join(dir, f)).rotate();
    const crop = CROP[`${cat}/${name}`];
    if (crop) {
      const m = await sharp(path.join(dir, f)).metadata();
      const top = Math.round(m.height * (crop.top ?? 0));
      const cut = Math.round(m.width * (crop.right ?? 0));
      img = img.extract({ left: 0, top, width: m.width - cut, height: m.height - top });
    }
    const info = await img
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
    sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
  }
}
await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");

// Image de partage : à droite l'ube latte et le croissant, à gauche le logo et l'essentiel
const right = await sharp(path.join(ROOT, "assets/hero/hero.jpg")).rotate().resize(560, 630, { fit: "cover", position: "centre" }).toBuffer();
const left = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="630">
${wordmark(150, 120, 64)}
${star8(320, 300, 22)}
${text(fonts.display, "Le café des gourmands", 320, 392, 50, { anchor: "middle" })}
${text(fonts.text, "Café de spécialité · Cuisine iranienne", 320, 446, 25, { anchor: "middle", fill: C.muted })}
${text(fonts.medium, "42 rue des Entrepreneurs · Paris 15", 320, 488, 25, { anchor: "middle", fill: C.green })}
${text(fonts.text, "Ouvert 7 j/7 dès 8 h", 320, 528, 23, { anchor: "middle", fill: C.muted })}
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: C.cream } })
  .composite([
    { input: right, left: 640, top: 0 },
    { input: left, left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

console.log(`${Object.keys(sizes).length} photos prêtes, og.jpg écrit`);

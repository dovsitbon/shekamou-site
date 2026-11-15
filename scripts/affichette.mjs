// Affichette A5 à poser sur le comptoir et en vitrine, avec un QR code vers la carte.
//   npm run affichette
// → print/affichette-a5.pdf (148 × 210 mm, 300 dpi) et print/affichette-a5.png (aperçu).
// L'adresse du QR code vient de data/site.json → url (+ /fr/carte) : relancez le script si le nom de domaine change.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import { ROOT, C, fonts, text, badge, star8 } from "./draw.mjs";

const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const target = `${site.url}/fr/carte`;
const W = 1748;
const H = 2480;
const cx = W / 2;

// QR code dessiné en carrés (correction élevée : il reste lisible même un peu taché)
const qr = QRCode.create(target, { errorCorrectionLevel: "H" });
const n = qr.modules.size;
const QR = 480;
const cell = QR / n;
const qx = cx - QR / 2;
const qy = 1600;
let squares = "";
for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.modules.get(r, c)) squares += `<rect x="${(qx + c * cell).toFixed(2)}" y="${(qy + r * cell).toFixed(2)}" width="${(cell + 0.5).toFixed(2)}" height="${(cell + 0.5).toFixed(2)}"/>`;

// Trois photos vues de dessus : ube latte, âsh-e reshteh, gâteau au safran
const tile = async (file, w, h) => {
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="44" fill="#fff"/></svg>`);
  return sharp(path.join(ROOT, file)).rotate().resize(w, h, { fit: "cover", position: "centre" }).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
};
const PW = 480;
const PH = 600;
const gap = 34;
const px = (W - (PW * 3 + gap * 2)) / 2;
const py = 560;
const photos = await Promise.all(["assets/hero/hero.jpg", "assets/plats-iraniens/ash-reshteh.jpg", "assets/douceurs/gateau-safran.jpg"].map((f) => tile(f, PW, PH)));

const host = target.replace(/^https?:\/\//, "");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${C.cream}"/>
${badge(cx, 270, 190)}
${text(fonts.display, "La carte est ici", cx, py + PH + 160, 96, { anchor: "middle", fill: C.green })}
${text(fonts.text, "Cafés, ube latte, brunch, plats iraniens : scannez pour voir les prix", cx, py + PH + 240, 38, { anchor: "middle", fill: C.muted })}
${text(fonts.text, "et commander à emporter.", cx, py + PH + 292, 38, { anchor: "middle", fill: C.muted })}
<rect x="${qx - 40}" y="${qy - 40}" width="${QR + 80}" height="${QR + 80}" rx="40" fill="#FFFFFF"/>
<g fill="${C.green}">${squares}</g>
${star8(300, qy + QR / 2, 110, { width: 4 })}
${star8(W - 300, qy + QR / 2, 110, { width: 4 })}
${text(fonts.medium, host, cx, qy + QR + 120, 38, { anchor: "middle", fill: C.ube })}
${text(fonts.medium, "Ouvert 7 j/7 dès 8 h · Sur place ou à emporter", cx, qy + QR + 200, 40, { anchor: "middle", fill: C.ink })}
${text(fonts.text, "42 rue des Entrepreneurs, Paris 15  ·  09 56 70 91 12  ·  @shekamoufr", cx, qy + QR + 260, 34, { anchor: "middle", fill: C.muted })}
</svg>`;

const png = await sharp(Buffer.from(svg))
  .composite(photos.map((input, i) => ({ input, left: Math.round(px + i * (PW + gap)), top: py })))
  .png()
  .toBuffer();

await mkdir(path.join(ROOT, "print"), { recursive: true });
await sharp(png).resize({ width: 874 }).png().toFile(path.join(ROOT, "print/affichette-a5.png"));

const pdf = await PDFDocument.create();
pdf.setTitle("Shekamou, affichette A5");
const page = pdf.addPage([419.53, 595.28]); // A5 en points
const jpg = await pdf.embedJpg(await sharp(png).jpeg({ quality: 94 }).toBuffer());
page.drawImage(jpg, { x: 0, y: 0, width: 419.53, height: 595.28 });
await writeFile(path.join(ROOT, "print/affichette-a5.pdf"), await pdf.save());
console.log(`affichette A5 écrite, QR code → ${target}`);

// CONTENU.md : tous les textes du site et la carte, en français, anglais et persan, pour relecture et validation.
//   npm run contenu
// Le fichier est régénéré à partir de locales/*.json et de data/*.json : corrigez les textes dans ces fichiers,
// pas dans CONTENU.md.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ROOT } from "./draw.mjs";

const json = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const [fr, en, fa, carte, site, horaires, annonces] = await Promise.all(["locales/fr.json", "locales/en.json", "locales/fa.json", "data/carte.json", "data/site.json", "data/horaires.json", "data/annonces.json"].map(json));
const L = { fr, en, fa };

const out = [];
const h = (n, t) => out.push("", `${"#".repeat(n)} ${t}`, "");
const tri = (label, get) => out.push(`- **${label}**`, ...["fr", "en", "fa"].map((l) => `  - ${l.toUpperCase()} : ${get(L[l]) ?? ""}`));
const TODO = "**À REMPLIR**";
const eur = (n) => (n === null ? TODO : `${n.toFixed(2).replace(".", ",")} €`);
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

out.push(
  "# Shekamou : contenu du site",
  "",
  "Tous les textes et la carte, pour validation. Ce qui est marqué « À REMPLIR » manque encore : voir INFOS-A-DEMANDER.md.",
  "",
  `Relevé le ${carte.checked} à partir de son Instagram (${site.instagramHandle} : 162 publications et les stories à la une « Boissons », « Sandwich », « Brunch », « Gâteaux », « Spécialités iraniennes »), de sa fiche Google (${site.rating.value}/5, plus de ${site.rating.count} avis) et de specialtycoffee.paris (ouverture en février 2025, grains Terres de Café, prix des cafés).`,
  "",
  "Les textes se corrigent dans `locales/fr.json`, `locales/en.json`, `locales/fa.json` ; la carte dans `data/carte.json` ; les horaires dans `data/horaires.json` ; le bandeau dans `data/annonces.json`. Puis `npm run contenu` pour régénérer ce fichier.",
);

h(2, "Titre du hero : trois propositions");
out.push(
  "1. **« Le café des gourmands. »** (retenu) : clin d'œil au nom, *shekamou* (شکمو) voulant dire « gourmand » en persan.",
  "2. « Latte art et âsh-e reshteh. » : les deux mondes de la maison en quatre mots.",
  "3. « Paris le matin, Téhéran à midi. » : le rythme de la journée, du café de spécialité au bol d'âsh.",
);

h(2, "Référencement (balises title et description)");
tri("Title de l'accueil", (d) => d.meta.title);
tri("Description de l'accueil", (d) => d.meta.description);
for (const id of Object.keys(fr.pages)) {
  tri(`Title · ${fr.pages[id].title}`, (d) => d.pages[id].metaTitle);
  tri(`Description · ${fr.pages[id].title}`, (d) => d.pages[id].metaDescription);
}

h(2, "Bandeau du haut");
out.push(`- **Par défaut** : ${annonces.default.fr} / ${annonces.default.en} / ${annonces.default.fa}`);
for (const a of annonces.items) out.push(`- **${a.id}** (du ${a.from} au ${a.to}) : ${a.fr} / ${a.en} / ${a.fa}`);

h(2, "Accueil");
tri("Petite ligne", (d) => d.hero.eyebrow);
tri("Titre", (d) => d.hero.title);
tri("Sous-titre", (d) => d.hero.sub);
h(3, "Tuiles");
for (const k of Object.keys(fr.tiles.items)) tri(k, (d) => d.tiles.items[k]);
h(3, "Services (4 pictos)");
fr.services.items.forEach((_, i) => tri(`Picto ${i + 1}`, (d) => `${d.services.items[i].t} — ${d.services.items[i].p}`));
h(3, "Carte (intro)");
tri("Titre", (d) => d.carte.title);
tri("Texte", (d) => d.carte.intro);
h(3, "Blocs alternés");
fr.blocks.forEach((_, i) => {
  tri(`Bloc ${i + 1} · titre`, (d) => d.blocks[i].title);
  tri(`Bloc ${i + 1} · texte`, (d) => d.blocks[i].text);
  tri(`Bloc ${i + 1} · bouton`, (d) => d.blocks[i].cta);
});
h(3, "Plateaux");
tri("Titre", (d) => d.trays.title);
tri("Texte", (d) => d.trays.intro);
tri("Mention", (d) => d.trays.note);
h(3, "Avis");
out.push("Aucun avis inventé : trois emplacements « Avis client à venir » tant que `data/avis.json` est vide.");
tri("Titre", (d) => d.reviews.title);
tri("Texte", (d) => d.reviews.intro);
h(3, "FAQ");
fr.faq.items.forEach((_, i) => {
  tri(`Q${i + 1}`, (d) => d.faq.items[i].q);
  tri(`R${i + 1}`, (d) => d.faq.items[i].a);
});
h(3, "Pied de page");
tri("Phrase", (d) => d.footer.tagline);

h(2, "Pages");
for (const id of ["iranien", "paris15"]) {
  h(3, fr.pages[id].title);
  tri("Titre", (d) => d.pages[id].h1);
  tri("Intro", (d) => d.pages[id].intro);
  fr.pages[id].sections.forEach((s, i) => {
    tri(`Section ${i + 1} · titre`, (d) => d.pages[id].sections[i].h);
    tri(`Section ${i + 1} · texte`, (d) => d.pages[id].sections[i].p.join(" "));
  });
}
for (const id of ["carte", "commander", "plateaux"]) {
  h(3, fr.pages[id].title);
  tri("Intro", (d) => d.pages[id].intro);
}

h(2, "La carte (data/carte.json)");
out.push("Prix connus : cafés d'après specialtycoffee.paris, sandwichs d'après la carte visible sur ses photos (Pastrami 12,90 €, Jambon de poulet 8,90 €, Tuna 8,90 €, Bandari 9,90 €). Tout est à confirmer avec le gérant ; les autres prix sont à remplir.");
for (const c of carte.categories) {
  h(3, `${c.fr} · ${c.en} · ${c.fa}`);
  out.push("| Article | Prix | Description (FR) | Mentions | Photo |", "|---|---|---|---|---|");
  for (const it of c.items) {
    const tags = [it.signature && "signature", it.veg && "végétarien", it.weekend && "week-end", it.isNew && "nouveau"].filter(Boolean).join(", ");
    out.push(`| ${it.fr.name} / ${it.en.name} / ${it.fa.name} | ${eur(it.price)} | ${it.fr.desc}${it.fr.about ? ` *C'est quoi ? ${it.fr.about}*` : ""} | ${tags} | ${it.photo ? "oui" : "à prendre"} |`);
  }
}

h(2, "Infos pratiques");
out.push(`- Adresse : ${site.address.street}, ${site.address.postalCode} ${site.address.city}`, `- Téléphone : ${site.phone} (fixe : pas de WhatsApp tant qu'il ne donne pas de portable)`, `- Instagram : ${site.instagramHandle}`, `- E-mail : ${site.email || TODO}`, "- Horaires :");
DAYS.forEach((day, i) => {
  const s = horaires.week[String(i + 1)];
  out.push(`  - ${day} : ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
});
out.push(`- Métro : ${fr.infos.stations.map((s) => `${s.name} (${s.line}, ${s.walk})`).join(" ; ")}`, `- Moyens de paiement : ${site.paymentMethods.fr || TODO}`, `- SIRET : ${site.legal.siret || TODO}`);

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n") + "\n");
console.log("CONTENU.md écrit");

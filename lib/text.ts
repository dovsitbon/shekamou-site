// Petits outils de texte, sans les dictionnaires : importables côté client sans embarquer les trois langues.

export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

/** Texte alternatif d'une image de public/media, d'après son nom de fichier (locales/*.json → alt). */
export function altOf(d: { alt: Record<string, string> }, src: string) {
  const key = src.split("/").pop()!.replace(/\.\w+$/, "");
  return d.alt[key] ?? "";
}

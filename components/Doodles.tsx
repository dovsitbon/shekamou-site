// Petits dessins au trait de la maison : la tasse du logo, le cœur de latte art, la pistache, le bol d'âsh,
// le sac à emporter, l'horloge, le Wi-Fi, et une étoile persane à huit branches pour les motifs discrets.
// Toujours en currentColor, trait arrondi.

type P = { className?: string };
const line = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

/** Tasse du logo (soucoupe, anse, deux volutes de vapeur), boîte 64 × 64. Mêmes tracés que scripts/draw.mjs. */
export const CUP_BODY = "M14 27h30v5c0 9.4-6.7 16-15 16s-15-6.6-15-16v-5Z";
export const CUP_HANDLE = "M44 30.5h3.2a5.3 5.3 0 0 1 0 10.6H42";
export const CUP_SAUCER = "M8 52c5 2.6 12.6 4 21 4s16-1.4 21-4";
export const CUP_STEAM = "M24 21c-3-3.4 3-5.6 0-9.6M33.5 21c-3-3.4 3-5.6 0-9.6";
export const LATTE_HEART = "M29 42.5c-5.4-3.2-8.6-5.9-8.6-9.1 0-2.2 1.7-3.8 3.8-3.8 1.9 0 3.5 1 4.8 2.7 1.3-1.7 2.9-2.7 4.8-2.7 2.1 0 3.8 1.6 3.8 3.8 0 3.2-3.2 5.9-8.6 9.1Z";

export const CupMark = ({ className = "h-10 w-10", heart = false }: P & { heart?: boolean }) => (
  <svg viewBox="0 0 64 64" className={className} {...line} strokeWidth={2.4}>
    <path d={CUP_BODY} />
    <path d={CUP_HANDLE} />
    <path d={CUP_SAUCER} />
    <path d={CUP_STEAM} />
    {heart && <path d="M29 39.5c-3.2-1.9-5-3.5-5-5.3 0-1.3 1-2.3 2.3-2.3 1.1 0 2 .6 2.7 1.6.7-1 1.6-1.6 2.7-1.6 1.3 0 2.3 1 2.3 2.3 0 1.8-1.8 3.4-5 5.3Z" fill="var(--color-ube)" stroke="none" />}
  </svg>
);

export const Heart = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line} strokeWidth={1.8}>
    <path d="M12 20.5C6.5 16.6 3 13.3 3 9.2 3 6.4 5.2 4.3 7.8 4.3c1.8 0 3.3 1 4.2 2.6.9-1.6 2.4-2.6 4.2-2.6 2.6 0 4.8 2.1 4.8 4.9 0 4.1-3.5 7.4-9 11.3Z" />
  </svg>
);

/** Étoile persane à huit branches (deux carrés croisés), pour les petits motifs. */
export const Star8 = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...line} strokeWidth={1.5}>
    <path d="M12 2.5 14.8 6h4.6v4.6L22.5 12l-3.1 1.4V18h-4.6L12 21.5 9.2 18H4.6v-4.6L1.5 12l3.1-1.4V6h4.6L12 2.5Z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);

export const Pistachio = ({ className = "h-8 w-8" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <path d="M9.5 25.5c-4-4-4.4-11 .6-16.5 5-5.4 11.8-5.8 14.6-3s2.4 9.6-3 14.6c-5.5 5-8.2 8.9-12.2 4.9Z" />
    <path d="M12 21c-1.6-3.6.2-8 4-10.6" />
  </svg>
);

export const Bowl = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <path d="M4 15h24c0 6.6-5.4 11-12 11S4 21.6 4 15Z" />
    <path d="M11 26.5h10M10.5 11c-1.4-1.6 1.4-2.8 0-4.6M16 11c-1.4-1.6 1.4-2.8 0-4.6M21.5 11c-1.4-1.6 1.4-2.8 0-4.6" />
  </svg>
);

export const Bag = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <path d="M7.5 11h17l-1.4 15.5H8.9L7.5 11Z" />
    <path d="M12 11V9a4 4 0 0 1 8 0v2" />
  </svg>
);

export const Clock = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <circle cx="16" cy="16" r="11.5" />
    <path d="M16 9v7l4.5 3" />
  </svg>
);

export const Wifi = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...line} strokeWidth={1.6}>
    <path d="M4.5 12.5a17 17 0 0 1 23 0M8.5 16.8a11 11 0 0 1 15 0M12.5 21a5 5 0 0 1 7 0" />
    <circle cx="16" cy="25" r="1" fill="currentColor" />
  </svg>
);

/** Bande de petits motifs persans, très discrète (séparateur). */
export function MotifRule({ className = "" }: P) {
  return (
    <div className={`flex items-center gap-3 text-brass/60 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current opacity-50" />
      <Star8 className="h-3.5 w-3.5" />
      <Star8 className="h-2.5 w-2.5" />
      <Star8 className="h-3.5 w-3.5" />
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  );
}

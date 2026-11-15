// Le logo de Shekamou, redessiné d'après son badge (photo de profil Instagram et enseigne) :
// « L'ART DU BON CAFÉ » en arc, une tasse fumante au trait, « SHEKAMOU » en capitales à empattements.
// Version horizontale pour l'en-tête, badge rond pour le pied de page. Fichiers complets : « npm run logo ».
import { CupMark } from "@/components/Doodles";

/** Logo horizontal de l'en-tête : la tasse, puis « SHEKAMOU » et « L'art du bon café » empilés. */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span dir="ltr" className={`inline-flex items-center gap-2 ${light ? "text-paper" : "text-green"} ${className}`}>
      <CupMark className="h-9 w-9 md:h-10 md:w-10" heart />
      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-display)] text-[1.3125rem] font-semibold tracking-[0.1em] md:text-[1.4375rem]">SHEKAMOU</span>
        <span className={`mt-1 text-[0.5625rem] font-medium tracking-[0.3em] uppercase ${light ? "text-saffron-soft" : "text-brass"}`}>L&apos;art du bon café</span>
      </span>
    </span>
  );
}

/** Badge rond, comme le vrai logo : texte en arc, tasse au centre, nom dessous. */
export function Badge({ className = "h-28 w-28", ring = "var(--color-green)", ink = "var(--color-cream)" }: { className?: string; ring?: string; ink?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path id="badge-arc" d="M38 104a62 62 0 0 1 124 0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill={ring} />
      <circle cx="100" cy="100" r="86" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="1" />
      <text fill={ink} fontFamily="var(--font-display)" fontSize="15" letterSpacing="3.2" fontWeight="500">
        <textPath href="#badge-arc" startOffset="50%" textAnchor="middle">
          L&apos;ART DU BON CAFÉ
        </textPath>
      </text>
      <g transform="translate(70 66) scale(0.95)" fill="none" stroke={ink} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 27h30v5c0 9.4-6.7 16-15 16s-15-6.6-15-16v-5Z" />
        <path d="M44 30.5h3.2a5.3 5.3 0 0 1 0 10.6H42" />
        <path d="M8 52c5 2.6 12.6 4 21 4s16-1.4 21-4" />
        <path d="M24 21c-3-3.4 3-5.6 0-9.6M33.5 21c-3-3.4 3-5.6 0-9.6" />
      </g>
      <text x="100" y="146" textAnchor="middle" fill={ink} fontFamily="var(--font-display)" fontSize="23" fontWeight="600" letterSpacing="3.5">
        SHEKAMOU
      </text>
      <path d="M78 158c7 4 14-4 22 0s15-4 22 0" fill="none" stroke={ink} strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

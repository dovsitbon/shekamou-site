import Image from "next/image";
import type { Dict } from "@/lib/i18n";
import { altOf } from "@/lib/text";
import { has, img } from "@/lib/media";
import { CupMark } from "@/components/Doodles";

const TINTS = ["bg-pistachio-soft text-green", "bg-rose-soft text-ube-deep", "bg-saffron-soft text-brass", "bg-ube-soft text-ube"];

/**
 * Photo de public/media, recadrée dans son cadre. Si le fichier n'existe pas encore (photo à prendre sur place,
 * voir assets/A-PHOTOGRAPHIER.md), une tasse au trait sur un fond pastel tient la place : aucune fausse photo.
 */
export function Pic({ src, d, sizes, className = "", priority = false, position = "center", alt, label, tint = 0 }: { src: string; d: Dict; sizes: string; className?: string; priority?: boolean; position?: string; alt?: string; label?: string; tint?: number }) {
  if (!src || !has(src))
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${TINTS[tint % TINTS.length]} ${className}`} data-photo-slot={src || "vide"} aria-hidden="true">
        <CupMark className="h-1/3 max-h-16 w-auto opacity-70" />
        {label && <span className="text-[0.75rem] font-medium opacity-80">{label}</span>}
      </div>
    );
  const i = img(src);
  return (
    <div className={`zoom ${className}`}>
      <Image src={i.src} alt={alt ?? altOf(d, i.src)} width={i.width} height={i.height} sizes={sizes} quality={80} priority={priority} fetchPriority={priority ? "high" : undefined} className="h-full w-full object-cover" style={{ objectPosition: position }} />
    </div>
  );
}

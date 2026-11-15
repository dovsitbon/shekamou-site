"use client";

import { useEffect, useState } from "react";
import { CUP_BODY, CUP_HANDLE, CUP_SAUCER, CUP_STEAM } from "@/components/Doodles";

/**
 * Effet d'ouverture (1,2 s, une fois par session) : fond crème, une tasse se dessine au trait, un cœur de latte art
 * violet ube apparaît dedans, « SHEKAMOU » puis « CAFÉ · PARIS 15 », fondu sur le hero.
 * Styles dans globals.css (.intro-*). Masqué d'office si déjà vu ou si l'utilisateur préfère réduire les animations.
 */
export function Intro({ skipLabel, tagline }: { skipLabel: string; tagline: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem("shekamou-intro", "1");
    } catch {}
    const t = setTimeout(() => setGone(true), 1250);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;
  return (
    <div className="intro-curtain">
      <svg viewBox="0 0 64 64" className="h-28 w-28 text-green md:h-32 md:w-32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="intro-draw" d={CUP_BODY} pathLength={1} />
        <path className="intro-draw" d={CUP_HANDLE} pathLength={1} />
        <path className="intro-draw" d={CUP_SAUCER} pathLength={1} />
        <path className="intro-draw intro-draw-2" d={CUP_STEAM} pathLength={1} />
        <path className="intro-heart" d="M29 41c-3.8-2.3-6-4.2-6-6.4 0-1.6 1.2-2.8 2.8-2.8 1.3 0 2.4.7 3.2 1.9.8-1.2 1.9-1.9 3.2-1.9 1.6 0 2.8 1.2 2.8 2.8 0 2.2-2.2 4.1-6 6.4Z" fill="var(--color-ube)" stroke="none" />
      </svg>
      <p dir="ltr" className="intro-word mt-6 font-[family-name:var(--font-display)] text-[2.125rem] font-semibold tracking-[0.12em] text-green md:text-[2.625rem]" aria-hidden="true">
        SHEKAMOU
      </p>
      <p dir="ltr" className="intro-word intro-word-2 mt-1 text-[0.75rem] font-medium tracking-[0.4em] text-brass" aria-hidden="true">
        {tagline}
      </p>
      <button type="button" onClick={() => setGone(true)} className="absolute end-5 bottom-5 min-h-11 px-3 text-sm text-muted underline underline-offset-4">
        {skipLabel}
      </button>
    </div>
  );
}

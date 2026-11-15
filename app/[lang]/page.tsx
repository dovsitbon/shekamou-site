import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { homeJsonLd } from "@/lib/jsonld";
import { Blocks, Faq, Heading, Hero, Infos, Reviews, Services, Tiles, Trays } from "@/components/Sections";
import { MenuTabs } from "@/components/MenuTabs";

export const revalidate = 3600;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />
      <Hero lang={lang} d={d} />
      <Tiles lang={lang} d={d} />
      <Services lang={lang} d={d} />
      <section id="carte" aria-labelledby="carte-title" className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
        <Heading eyebrow={d.carte.eyebrow} title={d.carte.title} id="carte-title">
          <p className="lead mt-4 max-w-2xl">{d.carte.intro}</p>
        </Heading>
        <div className="mt-10">
          <MenuTabs limit={4} />
        </div>
      </section>
      <Blocks lang={lang} d={d} />
      <Trays lang={lang} d={d} />
      <Reviews lang={lang} d={d} />
      <Infos lang={lang} d={d} />
      <Faq lang={lang} d={d} />
    </>
  );
}

import { ArrowUpRight } from "lucide-react";
import Container from "../components/layout/Container";
import Heading from "../components/ui/Heading";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";

const PRODUCT_BG = { mint: "bg-mint", butter: "bg-butter", lilac: "bg-lilac", blush: "bg-blush" };

export default function AIntegra() {
  const { lang } = useLanguage();
  const a = portfolio.aintegra;
  const [demo, once, logo] = a.photos;

  return (
    <section id="aintegra" aria-labelledby="aintegra-title" className="px-3 py-10 sm:px-5">
      <div className="relative mx-auto max-w-[88rem] keep-colors overflow-hidden rounded-5xl border-2 border-ink bg-ink py-20 text-paper sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(currentColor_1.5px,transparent_1.7px)] [background-size:22px_22px]" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Heading
                id="aintegra-title"
                invert
                eyebrow={t(a.eyebrow, lang)}
                start={t(a.titleStart, lang)}
                highlight={t(a.titleHighlight, lang)}
                lead={t(a.lead, lang)}
              />

              <Reveal delay={0.05} className="mt-10">
                <h3 className="text-lg font-extrabold text-paper">{t(a.problem.label, lang)}</h3>
                <p className="mt-1 leading-relaxed text-paper/80">{t(a.problem.body, lang)}</p>
              </Reveal>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {a.products.map((prod, i) => (
                  <Reveal as="li" key={prod.name} delay={0.08 + i * 0.05} className={`rounded-4xl border-2 border-paper p-5 text-ink ${PRODUCT_BG[prod.color]}`}>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/75">{t(prod.tag, lang)}</p>
                    <h3 className="mt-1 text-3xl font-extrabold tracking-tight">{prod.name}</h3>
                    {prod.fullName ? <p className="serif text-lg leading-tight text-ink/80">{prod.fullName}</p> : null}
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/85">{t(prod.body, lang)}</p>
                    {prod.pillars ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={lang === "en" ? "Pillars" : "Pilares"}>
                        {prod.pillars.map((pl) => (
                          <li key={pl.en} className="rounded-full border-2 border-ink bg-surface px-2.5 py-0.5 text-xs font-extrabold">
                            {t(pl, lang)}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={0.12} className="mt-6">
                <h3 className="text-lg font-extrabold text-paper">{t(a.role.label, lang)}</h3>
                <p className="mt-1 leading-relaxed text-paper/80">{t(a.role.body, lang)}</p>
              </Reveal>

              <Reveal delay={0.15}>
                <ul className="mt-9 flex flex-wrap gap-2">
                  {a.recognition.map((r, i) => (
                    <li key={i} className="rounded-full border-2 border-paper/30 px-3.5 py-1.5 text-sm font-bold text-paper">
                      {t(r, lang)}
                    </li>
                  ))}
                </ul>
                <a href={a.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sun mt-8 !border-paper">
                  {t(a.websiteLabel, lang)} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Reveal>
            </div>

            {/* Collage */}
            <Reveal delay={0.1} className="relative mx-auto grid w-full max-w-lg grid-cols-5 grid-rows-[auto_auto] gap-4">
              <div className="col-span-3 row-span-2 overflow-hidden rounded-4xl border-2 border-paper" style={{ transform: "rotate(-2deg)" }}>
                <Img src={demo.src} alt={t(demo.alt, lang)} width={demo.width} height={demo.height} className="h-full w-full object-cover" />
              </div>
              <div className="col-span-2 grid aspect-square place-items-center rounded-4xl border-2 border-paper bg-[#fff] p-4" style={{ transform: "rotate(3deg)" }}>
                <Img src={logo.src} alt={t(logo.alt, lang)} width={logo.width} height={logo.height} className="h-full w-full object-contain" />
              </div>
              <div className="col-span-2 overflow-hidden rounded-4xl border-2 border-paper" style={{ transform: "rotate(2deg)" }}>
                <Img src={once.src} alt={t(once.alt, lang)} width={once.width} height={once.height} className="aspect-[3/4] h-full w-full object-cover" />
              </div>
              <p className="sticker absolute -bottom-4 left-1/2 -translate-x-1/2 !bg-butter" style={{ transform: "translateX(-50%) rotate(-3deg)" }}>
                CAT <span className="serif !font-normal">+</span> CATY <span aria-hidden="true">🐾</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}

import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Reveal from "../components/layout/Reveal";
import PastelCard from "../components/ui/PastelCard";
import SectionHeader from "../components/ui/SectionHeader";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";
import { motion } from "framer-motion";
import { assetUrl } from "../utils/assetUrl";

export default function About() {
  const { lang } = useLanguage();

  // ✅ blindaje
  const a = portfolio?.about ?? {};
  const pills = a?.pills ?? [];
  const highlights = a?.highlights ?? [];
  const nowPoints = a?.now?.points ?? [];
  const howPoints = a?.howIWork?.points ?? [];

  return (
    <Section id="about">
      <Container>
        <SectionHeader
          eyebrow={t(a?.eyebrow, lang)}
          title={t(a?.title, lang)}
          lead={t(a?.lead, lang)}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
          {/* Left - Portrait */}
          <div className="lg:col-span-5">
            <Reveal>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white via-white to-purple-50/30 backdrop-blur-sm p-6 shadow-2xl hover:shadow-purple-200/50 transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-2xl border-2 border-purple-200 shadow-lg">
                  {/* Subtle overlay for professional look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent z-10 pointer-events-none" />

                  {a?.portraitSrc ? (
                    <img
                      src={assetUrl(a.portraitSrc)}
                      alt={t(a?.portraitAlt, lang)}
                      className="w-full aspect-[3/4] object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] grid place-items-center text-sm text-ink/55 bg-gradient-to-br from-purple-50 to-pink-50">
                      Add portraitSrc in portfolio.js
                    </div>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(pills ?? []).map((p, i) => {
                    const variants = ["chip--lilac", "chip--sky", "chip--mint", "chip--butter"];
                    return (
                      <span key={i} className={`chip ${variants[i % variants.length]}`}>
                        {t(p, lang)}
                      </span>
                    );
                  })}
                </div>

                {a?.caption ? (
                  <p className="mt-5 text-sm text-ink/70 leading-relaxed">
                    {t(a.caption, lang)}
                  </p>
                ) : null}
              </motion.div>
            </Reveal>
          </div>

          {/* Right */}
          <div className="lg:col-span-7">
            <div className="grid gap-4">
              {(a?.story?.title || a?.story?.body) && (
                <Reveal delay={0.06}>
                  <PastelCard accent="mint">
                    {a?.story?.eyebrow ? (
                      <p className="text-xs uppercase tracking-[0.16em] text-ink/55">
                        {t(a.story.eyebrow, lang)}
                      </p>
                    ) : null}
                    {a?.story?.title ? (
                      <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                        {t(a.story.title, lang)}
                      </h3>
                    ) : null}
                    {a?.story?.body ? (
                      <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-ink/80">
                        {t(a.story.body, lang)}
                      </p>
                    ) : null}
                  </PastelCard>
                </Reveal>
              )}

              <div className="grid gap-4 md:grid-cols-2 auto-rows-fr items-stretch">
                <Reveal delay={0.1}>
                  <PastelCard accent="lilac" className="h-full">
                    <p className="font-medium text-ink">{t(a?.now?.title, lang)}</p>
                    <ul className="mt-3 space-y-2 text-sm text-ink/80">
                      {(nowPoints ?? []).map((x, i) => (
                        <li key={i}>• {t(x, lang)}</li>
                      ))}
                    </ul>
                  </PastelCard>
                </Reveal>

                <Reveal delay={0.13}>
                  <PastelCard accent="sky" className="h-full">
                    <p className="font-medium text-ink">{t(a?.howIWork?.title, lang)}</p>
                    <ul className="mt-3 space-y-2 text-sm text-ink/80">
                      {(howPoints ?? []).map((x, i) => (
                        <li key={i}>• {t(x, lang)}</li>
                      ))}
                    </ul>
                  </PastelCard>
                </Reveal>
              </div>

              {!!highlights.length && (
                <Reveal delay={0.16}>
                  <div className="grid gap-4 md:grid-cols-3">
                    {(highlights ?? []).map((h, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-ink/10 bg-paper/70 p-5 shadow-soft"
                      >
                        <p className="text-xs uppercase tracking-[0.16em] text-ink/55">
                          {t(h.kicker, lang)}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-ink">
                          {t(h.title, lang)}
                        </p>
                        <p className="mt-2 text-sm text-ink/70 leading-relaxed">
                          {t(h.body, lang)}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {(a?.next?.title || a?.next?.body) && (
                <Reveal delay={0.2}>
                  <PastelCard accent="peach">
                    <p className="font-medium text-ink">{t(a.next.title, lang)}</p>
                    <p className="mt-2 text-sm text-ink/80 leading-relaxed">
                      {t(a.next.body, lang)}
                    </p>
                  </PastelCard>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

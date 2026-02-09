import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Reveal from "../components/layout/Reveal";
import PastelCard from "../components/ui/PastelCard";
import MediaCarousel from "../components/ui/MediaCarousel";
import SectionHeader from "../components/ui/SectionHeader";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";
import { motion } from "framer-motion";

export default function AIntegra() {
  const { lang } = useLanguage();
  const a = portfolio?.aintegra ?? {};

  const images = (a?.media?.gallery ?? []).map((img) => ({
    src: img.src,
    alt: t(img.alt, lang),
  }));

  const chips = a?.chips ?? [];
  const whatIDo = a?.whatIDo ?? [];
  const impactGoals = a?.impactGoals ?? [];
  const upcoming = a?.upcoming ?? [];

  return (
    <Section id="aintegra">
      <Container>
        <SectionHeader
          eyebrow={lang === "en" ? "Main venture" : "Proyecto principal"}
          title={t(a?.title, lang)}
          lead={t(a?.focus, lang)}
          right={
            a?.websiteUrl ? (
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={a.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper shadow-soft"
              >
                {t(a?.websiteLabel, lang)}
              </motion.a>
            ) : null
          }
        />


        {/* Prominent Carousel at Top */}
        <div className="mt-10">
          <Reveal delay={0.06}>
            <motion.div
              whileHover={{ y: -4, scale: 1.005 }}
              className="rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white via-white to-purple-50/30 p-6 shadow-2xl hover:shadow-purple-200/50 transition-all duration-300 overflow-hidden"
            >
              <div className="relative rounded-2xl overflow-hidden border-2 border-purple-200 shadow-lg">
                {/* Gradient overlay for depth and text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none" />

                <MediaCarousel
                  images={images}
                  aspect="video"
                  className="[&_img]:object-cover [&_img]:aspect-video"
                />

                {!!chips.length && (
                  <div className="absolute inset-x-0 bottom-0 p-4 z-20">
                    <div className="relative flex flex-wrap gap-2">
                      {chips.map((chip, i) => {
                        const variants = [
                          "chip--lilac",
                          "chip--sky",
                          "chip--mint",
                          "chip--butter",
                        ];
                        return (
                          <span
                            key={i}
                            className={`chip ${variants[i % variants.length]} shadow-lg`}
                          >
                            {t(chip, lang)}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* Content cards below - Well-aligned grid */}
        <div className="mt-12 grid gap-4">
          <Reveal delay={0.15}>
            <PastelCard accent="mint">
              <p className="text-xs uppercase tracking-[0.16em] text-ink/55 font-semibold">
                {t(a?.role, lang)}
              </p>
              <p className="mt-2 text-sm text-ink/80 leading-relaxed">
                {t(a?.focus, lang)}
              </p>
            </PastelCard>
          </Reveal>

          <Reveal delay={0.2}>
            <PastelCard accent="sky">
              <p className="font-medium text-ink">{t(a?.missionTitle, lang)}</p>
              <p className="mt-2 text-sm text-ink/80 leading-relaxed">
                {t(a?.mission, lang)}
              </p>
            </PastelCard>
          </Reveal>

          {/* Context + Accelerator in 2-column grid */}
          <div className="grid gap-4 md:grid-cols-2 items-start">
            <Reveal delay={0.25}>
              <PastelCard accent="lilac">
                <p className="font-medium text-ink">{t(a?.storyTitle, lang)}</p>
                <p className="mt-2 text-sm text-ink/80 leading-relaxed">
                  {t(a?.story, lang)}
                </p>
              </PastelCard>
            </Reveal>

            <Reveal delay={0.3}>
              <PastelCard accent="peach">
                <p className="font-medium text-ink">{t(a?.acceleratorTitle, lang)}</p>
                <p className="mt-2 text-sm text-ink/80 leading-relaxed">
                  {t(a?.accelerator, lang)}
                </p>
              </PastelCard>
            </Reveal>
          </div>

          {/* Upcoming / International */}
          {!!upcoming.length && (
            <Reveal delay={0.35}>
              <PastelCard accent="butter">
                <p className="font-medium text-ink">{t(a?.upcomingTitle, lang)}</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/80">
                  {upcoming.map((it, i) => (
                    <li key={i}>• {t(it, lang)}</li>
                  ))}
                </ul>
              </PastelCard>
            </Reveal>
          )}

          {/* What I do + Impact goals in 2-column grid */}
          <div className="grid gap-4 md:grid-cols-2 items-start">
            <Reveal delay={0.4}>
              <PastelCard accent="mint">
                <p className="font-medium text-ink">{t(a?.whatIDoTitle, lang)}</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/80">
                  {whatIDo.map((it, i) => (
                    <li key={i}>• {t(it, lang)}</li>
                  ))}
                </ul>
              </PastelCard>
            </Reveal>

            <Reveal delay={0.45}>
              <PastelCard accent="lilac">
                <p className="font-medium text-ink">{t(a?.impactGoalsTitle, lang)}</p>
                <ul className="mt-3 space-y-2 text-sm text-ink/80">
                  {impactGoals.map((it, i) => (
                    <li key={i}>• {t(it, lang)}</li>
                  ))}
                </ul>
              </PastelCard>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Reveal from "../components/layout/Reveal";
import MediaCarousel from "../components/ui/MediaCarousel";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";
import { assetUrl } from "../utils/assetUrl";

export default function Hero() {
  const { lang } = useLanguage();
  const h = portfolio.hero;

  const images = (h.media?.gallery || []).map((img) => ({
    src: assetUrl(img.src),
    alt: t(img.alt, lang),
  }));

  const cvUrl = h.cvUrl?.[lang] || h.cvUrl?.en || null;

  return (
    <Section id="home" className="pt-20 pb-16 relative overflow-hidden">
      {/* Blobs gradient background */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-lilac/18 blur-3xl" />
        <div className="absolute top-24 -right-24 h-72 w-72 rounded-full bg-mint/14 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 rounded-full bg-peach/12 blur-3xl" />
      </div>

      <Container>
        <div className="relative grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/70 px-4 py-2 text-xs text-ink/70 shadow-soft">
                <span className="inline-block h-2 w-2 rounded-full bg-lilac/70 animate-pulse" />
                {t(h.badge, lang)}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
                <span className="relative inline-block">
                  <span className="relative z-10">{h.name}</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-4 rounded-full bg-mint/35 blur-[1px]" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl text-ink/85 max-w-xl leading-relaxed">
                {t(h.headline, lang)}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="max-w-xl text-base text-ink/70 leading-relaxed">{t(h.subtext, lang)}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3 pt-2">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {t(h.ctaProjects, lang)}
                </motion.button>

                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-full border border-ink/15 bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-ink shadow-soft hover:shadow-md transition-all"
                >
                  {t(h.ctaContact, lang)}
                </motion.button>

                {cvUrl && (
                  <motion.a
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-ink/15 bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-ink shadow-soft hover:shadow-md transition-all"
                  >
                    {t(h.ctaCV, lang)}
                  </motion.a>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="grid gap-3 sm:grid-cols-3 max-w-xl pt-4">
                {h.sideCards.map((c, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-ink/10 bg-white/80 backdrop-blur-sm p-4 shadow-soft hover:shadow-md transition-all"
                  >
                    <p className="text-xs text-ink/60 font-medium">{t(c.label, lang)}</p>
                    <p className="mt-1 text-sm font-bold text-ink">
                      {t(c.value, lang)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column - Prominent Image */}
          <Reveal delay={0.3}>
            <div className="flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
              >
                {/* Full-width image without card wrapper */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-200">
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent z-10 pointer-events-none" />

                  {/* Use second image from gallery (natural.jpeg) */}
                  {images[1] ? (
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={images[1].src}
                      alt={images[1].alt}
                      className="w-full aspect-[4/5] object-cover"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] grid place-items-center bg-gradient-to-br from-purple-50 to-pink-50">
                      <p className="text-sm text-ink/60">Add image to gallery</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

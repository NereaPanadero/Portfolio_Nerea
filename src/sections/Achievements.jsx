import Section from "../components/layout/Section";
import Container from "../components/layout/Container";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/layout/Reveal";
import MediaCarousel from "../components/ui/MediaCarousel";
import { portfolio } from "../data/portfolio";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/t";
import { motion } from "framer-motion";
import { Trophy, Award, Star, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={countRef}>{count}</span>;
}

export default function Achievements() {
  const { lang } = useLanguage();

  const a =
    portfolio?.achievements ??
    portfolio?.aachievements ??
    { title: { en: "Achievements", es: "Logros" }, lead: { en: "", es: "" }, items: [] };

  const items = Array.isArray(a.items) ? a.items : [];
  const awardPhotos = a.photos || [];

  // Achievement categories for icons
  const getCategoryIcon = (index) => {
    const icons = [Trophy, Award, Star, Target];
    return icons[index % icons.length];
  };

  return (
    <Section id="achievements" className="bg-gradient-to-b from-transparent via-purple-50/20 to-transparent">
      <Container>
        <SectionHeader
          eyebrow={lang === "en" ? "Milestones" : "Hitos"}
          title={t(a.title, lang)}
          lead={t(a.lead, lang)}
          center
        />

        {/* Statistics Counter */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={items.length} />+
              </div>
              <div className="text-sm opacity-90">
                {lang === "en" ? "Achievements" : "Logros"}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={7} />+
              </div>
              <div className="text-sm opacity-90">
                {lang === "en" ? "Awards" : "Premios"}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={5} />+
              </div>
              <div className="text-sm opacity-90">
                {lang === "en" ? "Programs" : "Programas"}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl"
            >
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={4} />
              </div>
              <div className="text-sm opacity-90">
                {lang === "en" ? "Projects" : "Proyectos"}
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* Enhanced Timeline */}
        <div className="mt-20 relative">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute inset-0"
            />
          </div>

          <div className="relative">
            {/* Center Timeline Line - Enhanced */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full w-full rounded-full bg-gradient-to-b from-purple-400 via-pink-400 to-purple-400 opacity-80 shadow-lg shadow-purple-300/50"
                style={{ transformOrigin: "top" }}
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {items.map((it, i) => {
                const side = i % 2 === 0 ? "left" : "right";
                const number = i + 1;
                const Icon = getCategoryIcon(i);

                return (
                  <Reveal key={`${it?.date ?? "date"}-${i}`} delay={i * 0.1}>
                    <div className="relative grid md:grid-cols-2 gap-20 items-center">
                      {/* Animated Circle Dot with Number */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-purple-300/50 flex items-center justify-center text-2xl font-bold text-white z-20 hidden md:flex"
                      >
                        {number}
                      </motion.div>

                      {/* Content Card - Enhanced */}
                      <motion.div
                        initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -6, scale: 1.03 }}
                        transition={{ duration: 0.5 }}
                        className={`relative max-w-md ${side === "right" ? "md:col-start-2 ml-auto" : "md:col-start-1 mr-auto"}`}
                      >
                        <div className="group relative rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 backdrop-blur-sm p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-200/60 transition-all duration-300 overflow-hidden">
                          {/* Number for mobile */}
                          <div className="md:hidden absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg flex items-center justify-center text-lg font-bold text-white z-10">
                            {number}
                          </div>

                          {/* Icon Badge */}
                          <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Icon className="w-7 h-7 text-white" />
                          </div>

                          {/* Date Badge */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 mb-4"
                          >
                            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                              {it?.date ?? ""}
                            </span>
                          </motion.div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-ink/90 mb-3 pr-12 group-hover:text-purple-700 transition-colors leading-tight">
                            {t(it?.title, lang)}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-ink/70 leading-relaxed">
                            {t(it?.text, lang)}
                          </p>

                          {/* Animated Gradient Border */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
                            }}
                          />

                          {/* Decorative Corner */}
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/40 to-transparent rounded-tr-3xl opacity-60" />
                        </div>
                      </motion.div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-center text-sm text-purple-600/70 font-medium"
          >
            {lang === "en"
              ? "✨ Journey of excellence and recognition"
              : "✨ Trayectoria de excelencia y reconocimiento"}
          </motion.p>
        </div>

        {/* Awards Photo Carousel */}
        {awardPhotos.length > 0 && (
          <Reveal delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-20"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 mb-4"
                >
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">
                    {lang === "en" ? "Photo Gallery" : "Galería de Fotos"}
                  </span>
                </motion.div>
                <h3 className="text-3xl font-bold text-ink/90 mb-3">
                  {lang === "en" ? "Award Moments" : "Momentos de Premios"}
                </h3>
                <p className="text-base text-ink/70">
                  {lang === "en"
                    ? "Celebrating achievements and recognitions"
                    : "Celebrando logros y reconocimientos"}
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="max-w-3xl mx-auto rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white via-white to-purple-50/30 p-4 shadow-2xl"
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-purple-200 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
                  <MediaCarousel
                    images={awardPhotos}
                    aspect="video"
                    className="[&_img]:object-cover [&_img]:aspect-video [&_img]:w-full [&_img]:h-auto"
                  />
                </div>
              </motion.div>
            </motion.div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}

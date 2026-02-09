import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Reveal from "../components/layout/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";

export default function Partners() {
    const { lang } = useLanguage();
    const p = portfolio?.partners ?? {
        title: { en: "Partners & Collaborators", es: "Partners y Colaboradores" },
        lead: { en: "Organizations I collaborate with", es: "Organizaciones con las que colaboro" },
        logos: []
    };

    const logos = p?.logos ?? [];

    return (
        <Section id="partners" className="bg-gradient-to-b from-purple-50/20 via-transparent to-transparent">
            <Container>
                <SectionHeader
                    eyebrow={lang === "en" ? "Collaboration" : "Colaboración"}
                    title={t(p?.title, lang)}
                    lead={t(p?.lead, lang)}
                    center
                />

                {/* Partners Grid */}
                <div className="mt-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {logos.length > 0 ? (
                            logos.map((logo, i) => (
                                <Reveal key={i} delay={i * 0.08}>
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        className="group relative rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-white via-white to-purple-50/30 p-8 shadow-lg hover:shadow-xl transition-all duration-300 aspect-square flex items-center justify-center"
                                    >
                                        {logo.src ? (
                                            <img
                                                src={logo.src}
                                                alt={t(logo.alt, lang)}
                                                className="max-w-[85%] max-h-[85%] object-contain transition-all grayscale group-hover:grayscale-0"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <p className="text-sm text-ink/60">{t(logo.name, lang)}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                </Reveal>
                            ))
                        ) : (
                            /* Placeholder boxes for 8 logos */
                            Array.from({ length: 8 }).map((_, i) => (
                                <Reveal key={i} delay={i * 0.08}>
                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        className="rounded-2xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50/50 to-transparent p-6 aspect-square flex items-center justify-center"
                                    >
                                        <div className="text-center">
                                            <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-purple-100 flex items-center justify-center">
                                                <span className="text-lg font-bold text-purple-400">{i + 1}</span>
                                            </div>
                                            <p className="text-xs text-ink/40">
                                                {lang === "en" ? "Logo placeholder" : "Logo de empresa"}
                                            </p>
                                        </div>
                                    </motion.div>
                                </Reveal>
                            ))
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}

import { useState, useEffect } from "react";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Reveal from "../components/layout/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import { useLanguage } from "../context/LanguageContext";
import { Trophy, Rocket, Users, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Counter({ end, duration = 2000, suffix = "" }) {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const isInView = useInView(countRef, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        const startCount = 0;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * (end - startCount) + startCount));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return (
        <span ref={countRef} className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

export default function Impact() {
    const { lang } = useLanguage();

    const stats = [
        {
            icon: Trophy,
            value: 7,
            suffix: "+",
            label: {
                en: "Awards & Recognitions",
                es: "Premios y Reconocimientos"
            },
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: Rocket,
            value: 4,
            suffix: "",
            label: {
                en: "Projects Launched",
                es: "Proyectos Lanzados"
            },
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Users,
            value: 5,
            suffix: "+",
            label: {
                en: "Programs & Incubators",
                es: "Programas e Incubadoras"
            },
            color: "from-cyan-500 to-blue-500"
        },
        {
            icon: TrendingUp,
            value: 100,
            suffix: "%",
            label: {
                en: "Focused on Impact",
                es: "Enfocada en Impacto"
            },
            color: "from-teal-500 to-emerald-500"
        }
    ];

    const highlights = [
        {
            title: { en: "1st Prize", es: "1er Premio" },
            subtitle: { en: "Dedalus Datathon 2025", es: "Dedalus Datathon 2025" },
            description: {
                en: "Healthcare automation platform",
                es: "Plataforma de automatización sanitaria"
            }
        },
        {
            title: { en: "Finalist", es: "Finalista" },
            subtitle: { en: "VDS The Challenge 2025", es: "VDS The Challenge 2025" },
            description: {
                en: "Secure collaborative editor",
                es: "Editor colaborativo seguro"
            }
        },
        {
            title: { en: "Selected", es: "Seleccionada" },
            subtitle: { en: "3 Accelerator Programs", es: "3 Programas de Aceleración" },
            description: {
                en: "IAtech, Startup Valencia, Health2Innovation",
                es: "IAtech, Startup Valencia, Health2Innovation"
            }
        }
    ];

    return (
        <Section id="impact" className="bg-gradient-to-b from-purple-50/30 to-transparent">
            <Container>
                <SectionHeader
                    eyebrow={lang === "en" ? "Impact" : "Impacto"}
                    title={lang === "en" ? "Building with Purpose" : "Construyendo con Propósito"}
                    lead={
                        lang === "en"
                            ? "Turning ideas into reality through inclusive technology and meaningful innovation."
                            : "Convirtiendo ideas en realidad a través de tecnología inclusiva e innovación significativa."
                    }
                    center
                />

                {/* Stats Grid */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <Reveal key={idx} delay={0.05 + idx * 0.05}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white/90 backdrop-blur-sm p-6 shadow-soft hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Gradient background */}
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl rounded-full`} />

                                    {/* Icon */}
                                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>

                                    {/* Number */}
                                    <div className="text-4xl font-bold bg-gradient-to-br bg-clip-text text-transparent ${stat.color} mb-2">
                                        <Counter end={stat.value} suffix={stat.suffix} />
                                    </div>

                                    {/* Label */}
                                    <p className="text-sm text-ink/70 font-medium">
                                        {stat.label[lang]}
                                    </p>
                                </motion.div>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Recent Highlights */}
                <Reveal delay={0.3}>
                    <div className="mt-16">
                        <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-ink/60 mb-8">
                            {lang === "en" ? "Recent Highlights" : "Destacados Recientes"}
                        </h3>

                        <div className="grid gap-6 md:grid-cols-3">
                            {highlights.map((highlight, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -4 }}
                                    className="relative rounded-2xl border border-ink/10 bg-white/80 backdrop-blur-sm p-6 shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden"
                                >
                                    {/* Decorative corner */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-3xl" />

                                    <div className="relative">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-3">
                                            <span className="text-xs font-bold text-purple-600">{highlight.title[lang]}</span>
                                        </div>

                                        <h4 className="text-base font-bold text-ink/90 mb-2">
                                            {highlight.subtitle[lang]}
                                        </h4>

                                        <p className="text-sm text-ink/70">
                                            {highlight.description[lang]}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* Mission Statement */}
                <Reveal delay={0.5}>
                    <div className="mt-16 rounded-3xl border border-ink/10 bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm p-10 md:p-12 shadow-lg text-center">
                        <div className="max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-ink/10 mb-6">
                                <span className="inline-block w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-ink/70">
                                    {lang === "en" ? "Mission" : "Misión"}
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-ink/90 mb-4 leading-tight">
                                {lang === "en"
                                    ? "Making technology more accessible and inclusive for everyone"
                                    : "Haciendo la tecnología más accesible e inclusiva para todos"}
                            </h3>

                            <p className="text-base md:text-lg text-ink/70 leading-relaxed">
                                {lang === "en"
                                    ? "Through AIntegra and other initiatives, I'm working to democratize technology and support cognitive diversity in digital environments."
                                    : "A través de AIntegra y otras iniciativas, trabajo para democratizar la tecnología y apoyar la diversidad cognitiva en entornos digitales."}
                            </p>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}

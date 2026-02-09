import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Reveal from "../components/layout/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import { useLanguage } from "../context/LanguageContext";
import { Code2, Palette, BrainCircuit, Shield, Database, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Skills() {
    const { lang } = useLanguage();

    const skills = [
        {
            icon: Palette,
            title: { en: "Product & UX", es: "Producto y UX" },
            items: {
                en: ["Product Strategy", "UX Research", "User-Centered Design", "Prototyping", "Wireframing"],
                es: ["Estrategia de Producto", "Investigación UX", "Diseño Centrado en Usuario", "Prototipado", "Wireframing"]
            },
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: BrainCircuit,
            title: { en: "AI & Technology", es: "IA y Tecnología" },
            items: {
                en: ["AI Integration", "Machine Learning", "Accessibility Tech", "Cognitive Support Systems"],
                es: ["Integración de IA", "Machine Learning", "Tecnología de Accesibilidad", "Sistemas de Apoyo Cognitivo"]
            },
            color: "from-cyan-500 to-blue-500"
        },
        {
            icon: Code2,
            title: { en: "Development", es: "Desarrollo" },
            items: {
                en: ["React", "JavaScript", "Python", "Product Development", "System Architecture"],
                es: ["React", "JavaScript", "Python", "Desarrollo de Producto", "Arquitectura de Sistemas"]
            },
            color: "from-teal-500 to-emerald-500"
        },
        {
            icon: Shield,
            title: { en: "Security & Privacy", es: "Seguridad y Privacidad" },
            items: {
                en: ["Privacy by Design", "Security Architecture", "Access Control", "Data Encryption"],
                es: ["Privacidad por Diseño", "Arquitectura de Seguridad", "Control de Acceso", "Encriptación de Datos"]
            },
            color: "from-orange-500 to-red-500"
        },
        {
            icon: Database,
            title: { en: "Data & Systems", es: "Datos y Sistemas" },
            items: {
                en: ["Database Design", "Healthcare Systems", "Automation", "Data Flow Design"],
                es: ["Diseño de Bases de Datos", "Sistemas Sanitarios", "Automatización", "Diseño de Flujo de Datos"]
            },
            color: "from-violet-500 to-purple-500"
        },
        {
            icon: Sparkles,
            title: { en: "Innovation", es: "Innovación" },
            items: {
                en: ["Inclusive Design", "Social Impact", "International Growth", "Entrepreneurship"],
                es: ["Diseño Inclusivo", "Impacto Social", "Crecimiento Internacional", "Emprendimiento"]
            },
            color: "from-pink-500 to-rose-500"
        }
    ];

    return (
        <Section id="skills" className="bg-gradient-to-b from-transparent to-purple-50/30">
            <Container>
                <SectionHeader
                    eyebrow={lang === "en" ? "Expertise" : "Experiencia"}
                    title={lang === "en" ? "Skills & Technologies" : "Habilidades y Tecnologías"}
                    lead={
                        lang === "en"
                            ? "A comprehensive skill set combining product thinking, technical execution, and inclusive design principles."
                            : "Un conjunto integral de habilidades que combina pensamiento de producto, ejecución técnica y principios de diseño inclusivo."
                    }
                />

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill, idx) => {
                        const Icon = skill.icon;
                        return (
                            <Reveal key={idx} delay={0.05 + idx * 0.05}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="group h-full rounded-2xl border border-ink/10 bg-white/80 backdrop-blur-sm p-6 shadow-soft hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Icon with gradient */}
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${skill.color} mb-4`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-ink/90 mb-3">
                                        {skill.title[lang]}
                                    </h3>

                                    {/* Skills list */}
                                    <ul className="space-y-2">
                                        {skill.items[lang].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Technologies */}
                <Reveal delay={0.4}>
                    <div className="mt-12 rounded-2xl border border-ink/10 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm p-8 shadow-soft">
                        <p className="text-center text-sm font-medium text-ink/60 mb-6">
                            {lang === "en" ? "Technologies & Tools" : "Tecnologías y Herramientas"}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                "React", "JavaScript", "Python", "Figma", "TailwindCSS",
                                "Git", "Node.js", "AI/ML", "PostgreSQL", "REST APIs",
                                "Framer Motion", "Accessibility", "Healthcare IT", "Security"
                            ].map((tech, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="chip chip--lilac hover:scale-105"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}

import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Reveal from "../components/layout/Reveal";
import SectionHeader from "../components/ui/SectionHeader";
import PastelCard from "../components/ui/PastelCard";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";
import { useState } from "react";
import { Send, CheckCircle, Mail, Linkedin } from "lucide-react";

export default function Contact() {
  const { lang } = useLanguage();
  const c = portfolio?.contact ?? {};

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("submitting");

    try {
      // Using FormSubmit.co for email forwarding
      const response = await fetch("https://formsubmit.co/nerepanaifo@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `Portfolio Contact from ${formState.name}`,
          _captcha: "false",
          _template: "box"
        })
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (e) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Section id="contact" className="bg-gradient-to-b from-transparent via-purple-50/20 to-transparent">
      <Container>
        <SectionHeader
          eyebrow={lang === "en" ? "Let's connect" : "Conectemos"}
          title={t(c?.title, lang)}
          lead={t(c?.intro, lang)}
          center
        />

        <div className="mt-10 space-y-8">
          {/* Contact Form - Centered and Expanded */}
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ y: -2 }}
              className="max-w-3xl mx-auto rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white via-white to-purple-50/40 backdrop-blur-sm p-8 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink/90">
                    {lang === "en" ? "Send me a message" : "Envíame un mensaje"}
                  </h3>
                  <p className="text-sm text-ink/60">
                    {lang === "en" ? "I'll get back to you soon" : "Te responderé pronto"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink/80 mb-2">
                    {lang === "en" ? "Name" : "Nombre"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    placeholder={lang === "en" ? "Your name" : "Tu nombre"}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-2">
                    {lang === "en" ? "Email" : "Correo electrónico"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                    placeholder={lang === "en" ? "your.email@example.com" : "tu.email@ejemplo.com"}
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink/80 mb-2">
                    {lang === "en" ? "Message" : "Mensaje"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                    placeholder={lang === "en" ? "Tell me about your project or question..." : "Cuéntame sobre tu proyecto o pregunta..."}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={submitStatus === "submitting" || submitStatus === "success"}
                  whileHover={{ scale: submitStatus === "idle" ? 1.02 : 1 }}
                  whileTap={{ scale: submitStatus === "idle" ? 0.98 : 1 }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${submitStatus === "success"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : submitStatus === "error"
                      ? "bg-gradient-to-r from-red-500 to-pink-500"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl"
                    } ${submitStatus === "submitting" ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {submitStatus === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {lang === "en" ? "Sending..." : "Enviando..."}
                    </span>
                  ) : submitStatus === "success" ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {lang === "en" ? "Message sent!" : "¡Mensaje enviado!"}
                    </span>
                  ) : submitStatus === "error" ? (
                    <span>{lang === "en" ? "Error. Please try email" : "Error. Usa el email"}</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      {lang === "en" ? "Send message" : "Enviar mensaje"}
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </Reveal>

          {/* Social Links - Horizontal Below */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Email Card */}
            <Reveal delay={0.15}>
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block"
                href={c?.email ? `mailto:${c.email}` : "#"}
              >
                <div className="relative rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-white via-white to-purple-50/40 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-ink/60 font-semibold">
                      {lang === "en" ? "Direct Email" : "Email Directo"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-ink/90">
                    {c?.email ?? "—"}
                  </p>
                  <p className="mt-2 text-xs text-ink/60">
                    {lang === "en" ? "Quick reply" : "Respuesta rápida"}
                  </p>
                </div>
              </motion.a>
            </Reveal>

            {/* LinkedIn Card */}
            <Reveal delay={0.2}>
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block"
                href={c?.linkedinUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
              >
                <div className="relative rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-white via-white to-purple-50/40 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-ink/60 font-semibold">
                      LinkedIn
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-ink/90">
                    /in/nerea-panadero-alfonso
                  </p>
                  <p className="mt-2 text-xs text-ink/60">
                    {lang === "en" ? "Let's connect" : "Conectemos"}
                  </p>
                </div>
              </motion.a>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

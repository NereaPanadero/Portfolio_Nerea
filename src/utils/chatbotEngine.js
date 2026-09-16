import { portfolio } from "../data/portfolio.js";

/**
 * Nerea's on-device assistant.
 * No external API: everything runs in the visitor's browser, so no data leaves the page
 * and there is no API key to leak. Intent detection = keyword scoring with accent-folding,
 * light stemming and typo tolerance, plus conversational memory for follow-ups.
 */

const P = portfolio;
const L = (en, es) => ({ en, es });

// ---------- text helpers ----------
export const normalize = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9+#\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function lev(a, b) {
  if (Math.abs(a.length - b.length) > 1) return 2;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

const ES_HINTS = ["que", "quien", "como", "donde", "cuando", "cual", "cuales", "por", "para", "sobre", "hola", "gracias", "cuentame", "tiene", "tu", "eres", "has", "es", "su", "sus", "de", "la", "el", "los", "las", "y", "mas", "puedo", "estudios", "trabajo", "premios", "busca", "habla"];
const EN_HINTS = ["what", "who", "how", "where", "when", "which", "why", "about", "hello", "hi", "thanks", "tell", "does", "she", "her", "you", "your", "is", "are", "the", "and", "more", "can", "i", "do", "work", "awards", "looking", "speak"];

export function detectLanguage(text, fallback = "en") {
  const words = normalize(text).split(" ");
  const es = words.filter((w) => ES_HINTS.includes(w)).length;
  const en = words.filter((w) => EN_HINTS.includes(w)).length;
  if (es === en) return fallback;
  return es > en ? "es" : "en";
}

// ---------- reusable snippets ----------
const awardsList = (lang) =>
  P.awards.items
    .filter((i) => i.type === "award")
    .map((i) => `• **${i.title[lang]}** (${i.date[lang]})`)
    .join("\n");

const jobsList = (lang) =>
  P.experience.items.map((j) => `• **${j.role[lang]}** — ${j.org} · ${j.dates[lang]}`).join("\n");

const orgText = (org, lang) => (typeof org === "string" ? org : org[lang]);
const tx = (v, lang) => (typeof v === "string" ? v : v[lang]);

// ---------- intents ----------
// keywords are normalized; multi-word phrases score higher than single words.
const INTENTS = [
  {
    id: "greeting",
    keywords: ["hola", "hi", "hello", "hey", "buenas", "buenos dias", "good morning", "saludos", "que tal"],
    answer: () => ({
      text: L(
        "Hi! 👋 I’m Nerea’s assistant. Ask me about her experience, AIntegra, awards, skills — or what kind of role she’s looking for.",
        "¡Hola! 👋 Soy el asistente de Nerea. Pregúntame por su experiencia, AIntegra, premios, habilidades — o qué tipo de puesto busca."
      ),
      suggestions: ["about", "lookingFor", "awards"],
    }),
  },
  {
    id: "thanks",
    keywords: ["gracias", "thanks", "thank you", "thx", "genial", "perfecto", "great", "awesome", "guay"],
    answer: () => ({
      text: L("You’re welcome! 💜 Anything else you’d like to know?", "¡De nada! 💜 ¿Quieres saber algo más?"),
      suggestions: ["contact", "projects", "whyHire"],
    }),
  },
  {
    id: "bye",
    keywords: ["adios", "bye", "chao", "hasta luego", "see you", "goodbye", "nos vemos"],
    answer: () => ({
      text: L("Bye! If you want to talk to Nerea herself, her inbox is open ✉️", "¡Hasta pronto! Si quieres hablar con Nerea en persona, escríbele ✉️"),
      actions: ["email"],
    }),
  },
  {
    id: "bot",
    keywords: ["bot", "robot", "chatgpt", "eres una ia", "are you ai", "are you an ai", "are you real", "eres real", "humano", "human", "privacidad", "privacy", "mis datos", "my data", "como funcionas", "how do you work"],
    answer: () => ({
      text: L(
        "I’m a small assistant Nerea built into this site. I run **entirely in your browser** — no external AI service, no tracking, nothing you type is sent anywhere. I only know what’s in her portfolio.",
        "Soy un pequeño asistente que Nerea integró en su web. Funciono **entero en tu navegador** — sin servicios de IA externos, sin rastreo, nada de lo que escribes se envía. Solo sé lo que hay en su portfolio."
      ),
      suggestions: ["about", "a11ySite"],
    }),
  },
  {
    id: "about",
    keywords: ["quien es", "quien eres", "who is", "who are you", "about her", "sobre ella", "sobre nerea", "presentate", "introduce", "resumen", "summary", "perfil", "profile", "nerea", "cuentame sobre ti", "tell me about yourself", "tell me about you"],
    answer: () => ({
      text: L(
        "**Nerea Panadero Alfonso** is a Telematics Engineer and CEO & co-founder of **AIntegra**, where she builds technology that adapts to each person — AIntegra was born for blind people and now designs for every kind of diversity and digital skill level.\n\nShe’s currently an **XR Accessibility Specialist at XR4Europe** (Brussels), was an **Innovation & AI Intern at Ford** (where she built Fordy, a multi-agent AI system, and Pharos), and has collected **6 awards & finalist spots** — including 1st Prize at the Ford Smart Mobility Challenge.",
        "**Nerea Panadero Alfonso** es Ingeniera Telemática y CEO y cofundadora de **AIntegra**, donde crea tecnología que se adapta a cada persona — AIntegra nació para las personas ciegas y hoy diseña para cualquier diversidad y nivel de conocimiento tecnológico.\n\nAhora es **XR Accessibility Specialist en XR4Europe** (Bruselas), fue **becaria de Innovación e IA en Ford** (donde creó Fordy, un sistema de IA multiagente, y Pharos) y suma **6 premios y finales** — entre ellos el 1er premio del Ford Smart Mobility Challenge."
      ),
      actions: ["about", "cv"],
      suggestions: ["whyHire", "fordy", "vds"],
    }),
    more: () => ({
      text: L(`In her own words: “${P.about.quote.en}”\n\n${P.about.bio.en}`, `En sus palabras: «${P.about.quote.es}»\n\n${P.about.bio.es}`),
      suggestions: ["lookingFor", "skills"],
    }),
  },
  {
    id: "now",
    keywords: ["ahora", "now", "actualmente", "currently", "current", "actual", "haciendo", "doing", "working on", "trabajando en", "estos dias", "these days", "hoy en dia"],
    answer: () => ({
      text: L(
        `Right now Nerea is:\n${P.about.now.points.map((p) => `• ${p.en}`).join("\n")}`,
        `Ahora mismo Nerea está:\n${P.about.now.points.map((p) => `• ${p.es}`).join("\n")}`
      ),
      suggestions: ["xr4europe", "aintegra", "lookingFor"],
    }),
  },
  {
    id: "xr4europe",
    keywords: ["xr4europe", "xr", "vr", "realidad virtual", "virtual reality", "inmersiva", "immersive", "bruselas", "brussels", "erasmus", "young entrepreneurs", "eye", "ajev", "ethics", "certification", "certificacion", "europa", "europe", "belgica", "belgium"],
    answer: () => {
      const j = P.experience.items[0];
      return {
        text: L(
          `**${j.role.en} · XR4Europe** (${j.dates.en}, Brussels)\n${j.bullets.map((b) => `• ${b.en}`).join("\n")}\n\n🇪🇺 ${j.note.en}`,
          `**${j.role.es} · XR4Europe** (${j.dates.es}, Bruselas)\n${j.bullets.map((b) => `• ${b.es}`).join("\n")}\n\n🇪🇺 ${j.note.es}`
        ),
        actions: ["experience"],
        suggestions: ["ford", "aintegra"],
      };
    },
  },
  {
    id: "ford",
    keywords: ["ford", "intern", "internship", "practicas", "becaria", "automation", "automatizacion", "smart mobility"],
    answer: () => ({
      text: L(
        "Nerea has two Ford stories 🚗\n\n**1. Innovation & AI Intern at Ford** (Feb – Jul 2026), working on two projects:\n• **Fordy** — a multi-agent, multimodal AI system connecting Microsoft Teams with BigQuery (also her Bachelor’s thesis)\n• **Pharos** — a centralised platform for documents and guides with organisational accounts\nBoth are confidential, so no screenshots can be shared.\n\n**2. 1st Prize at the Ford Smart Mobility Challenge** (2026) with AIntegra — by Ford Philanthropy and the University of Valencia (€12,500).",
        "Nerea tiene dos historias con Ford 🚗\n\n**1. Becaria de Innovación e IA en Ford** (feb – jul 2026), en dos proyectos:\n• **Fordy** — sistema de IA multiagente y multimodal que conecta Microsoft Teams con BigQuery (también su TFG)\n• **Pharos** — plataforma centralizada de documentos y guías con cuentas organizacionales\nAmbos son confidenciales, así que no se pueden mostrar capturas.\n\n**2. 1er premio en el Ford Smart Mobility Challenge** (2026) con AIntegra — de Ford Philanthropy y la Universitat de València (12.500 €)."
      ),
      actions: ["projects", "experience"],
      suggestions: ["fordy", "pharos", "aintegra"],
    }),
  },
  {
    id: "fordy",
    keywords: ["fordy", "tfg", "thesis", "tesis", "trabajo de fin de grado", "final project", "bigquery", "teams", "microsoft teams", "multiagente", "multi agent", "multiagent", "multimodal", "agentes", "agents", "ai agents", "agentes de ia"],
    answer: () => projectAnswer("fordy"),
  },
  {
    id: "pharos",
    keywords: ["pharos", "documentos", "documents", "guias", "guides", "cuentas organizacionales", "organisational accounts", "organizational accounts"],
    answer: () => projectAnswer("pharos"),
  },
  {
    id: "h2i",
    keywords: ["health2innovation", "health 2 innovation", "cima", "aemps", "medicamentos", "medicines", "medication", "nutricion", "nutrition", "nutricional", "alimentos", "food", "comidas", "interaccion", "interaction", "erasmus+"],
    answer: () => projectAnswer("h2i"),
  },
  {
    id: "smile",
    keywords: ["smile", "suecia", "sweden", "smile incubator", "incubadora smile"],
    answer: () => ({
      text: L(
        "🇸🇪 In February 2026 Nerea joined the incubation programme at **SMILE** in Sweden — another step in her international entrepreneurial path, alongside IAtecUV and Erasmus+ Health2Innovation.",
        "🇸🇪 En febrero de 2026 Nerea participó en el programa de incubación de **SMILE**, en Suecia — un paso más en su trayectoria emprendedora internacional, junto a IAtecUV y Erasmus+ Health2Innovation."
      ),
      actions: ["awards"],
      suggestions: ["h2i", "aintegra"],
    }),
  },
  {
    id: "aintegra",
    keywords: ["aintegra", "startup", "empresa", "company", "cofundadora", "co founder", "cofounder", "founder", "fundadora", "emprendimiento", "entrepreneur", "emprendedora", "iatec", "iatecuv", "aceleradora", "accelerator"],
    answer: () => ({
      text: L(
        `**AIntegra Limited** (since 2022) is Nerea’s startup. ${P.aintegra.lead.en}\n\n• **CAT:** ${P.aintegra.products[0].body.en}\n• **CATY:** ${P.aintegra.products[1].body.en} Pillars: communication, adaptation and cybersecurity.\n• **Her role:** ${P.aintegra.role.body.en}\n• **Backed by:** IAtecUV accelerator · 1st Prize Ford Smart Mobility · Best Pitch Startup Valencia × INCIBE`,
        `**AIntegra Limited** (desde 2022) es la startup de Nerea. ${P.aintegra.lead.es}\n\n• **CAT:** ${P.aintegra.products[0].body.es}\n• **CATY:** ${P.aintegra.products[1].body.es} Pilares: comunicación, adaptación y ciberseguridad.\n• **Su papel:** ${P.aintegra.role.body.es}\n• **Respaldo:** aceleradora IAtecUV · 1er premio Ford Smart Mobility · Mejor Pitch Startup Valencia × INCIBE`
      ),
      actions: ["aintegra", "aintegraWeb"],
      suggestions: ["caty", "cat", "security"],
    }),
    more: () => ({
      text: L(`**Why it matters:** ${P.aintegra.problem.body.en}`, `**Por qué importa:** ${P.aintegra.problem.body.es}`),
      suggestions: ["cat", "contact"],
    }),
  },
  {
    id: "cat",
    keywords: ["cat", "c a t", "trackpad", "producto", "product", "productos", "products", "dispositivo", "device", "gestos", "gesture", "gestures", "ciegos", "ciega", "blind", "baja vision", "low vision", "discapacidad visual", "visual impairment", "visually impaired", "once", "ong", "ngo"],
    answer: () => ({
      text: L(
        "AIntegra has two products 🐾\n\n**CAT** — Cognitive Assistive Trackpad: navigate the computer with simple gestures.\n\n**CATY** (Cognitive Assistive Technology for You) — an AI assistant that adapts to each person and runs **100% locally**, built on three pillars: communication, adaptation and cybersecurity.\n\nAIntegra was born for blind people; today it designs for every kind of diversity, whatever someone’s abilities or digital skills. Everything is validated with NGOs, institutions and real users (including ONCE).",
        "AIntegra tiene dos productos 🐾\n\n**CAT** — Cognitive Assistive Trackpad: navega por el ordenador con gestos sencillos.\n\n**CATY** (Cognitive Assistive Technology for You) — un asistente de IA que se adapta a cada persona y funciona **100% en local**, con tres pilares: comunicación, adaptación y ciberseguridad.\n\nAIntegra nació para las personas ciegas; hoy diseña para cualquier diversidad, sean cuales sean las capacidades o el nivel digital. Todo se valida con ONGs, instituciones y usuarios reales (incluida la ONCE)."
      ),
      actions: ["aintegra", "aintegraWeb"],
      suggestions: ["caty", "security", "contact"],
    }),
  },
  {
    id: "caty",
    keywords: ["caty", "asistente local", "local", "en local", "on device", "offline", "sin nube", "no cloud", "pilares", "pillars", "comunicacion", "communication", "adaptacion", "adaptation"],
    answer: () => ({
      text: L(
        "**CATY** (Cognitive Assistive Technology for You) is AIntegra’s AI assistant. It adapts to each person — and what makes it different: it runs **entirely locally**, nothing goes to the cloud.\n\nIts three pillars:\n• **Communication**\n• **Adaptation**\n• **Cybersecurity** — including an accessible gesture CAPTCHA and safe modes like a black privacy curtain while blind users type sensitive data.",
        "**CATY** (Cognitive Assistive Technology for You) es el asistente de IA de AIntegra. Se adapta a cada persona — y lo que lo hace distinto: funciona **entero en local**, nada va a la nube.\n\nSus tres pilares:\n• **Comunicación**\n• **Adaptación**\n• **Ciberseguridad** — con un CAPTCHA accesible por gestos y modos seguros como una cortina negra de privacidad mientras personas ciegas escriben datos sensibles."
      ),
      actions: ["aintegra", "projects"],
      suggestions: ["security", "cat"],
    }),
  },
  {
    id: "vds",
    keywords: ["vds 2026", "vds2026", "expoinnova", "parc cientific", "foro plaza", "valencia plaza", "ponente", "ponencia", "ponencias", "charla", "charlas", "speaker", "speaking", "talk at", "talks", "conferencia", "conference", "evento", "events", "prensa", "press", "media"],
    answer: () => ({
      text: L(
        "🎤 Where to catch Nerea:\n• **ExpoInnova 2026** — 15 Oct 2026, Parc Científic de la Universitat de València\n• **VDS 2026** — 21–22 Oct 2026, City of Arts and Sciences (Valencia), as CEO & Co-Founder of AIntegra\n\nShe also took part in **Foro Plaza** by the newspaper Valencia Plaza (Jul 2026) and won **Best Pitch** at the Cybersecurity Startup Program Demo Day (Apr 2026).",
        "🎤 Dónde ver a Nerea:\n• **ExpoInnova 2026** — 15 oct 2026, Parc Científic de la Universitat de València\n• **VDS 2026** — 21–22 oct 2026, Ciudad de las Artes y las Ciencias (Valencia), como CEO y cofundadora de AIntegra\n\nAdemás participó en **Foro Plaza** del periódico Valencia Plaza (jul 2026) y ganó el **Mejor Pitch** en el Demo Day del Cybersecurity Startup Program (abr 2026)."
      ),
      actions: ["talks", "pitch"],
      suggestions: ["aintegra", "awards"],
    }),
  },
  {
    id: "experience",
    keywords: ["experiencia", "experience", "trabajado", "worked", "jobs", "empleos", "career", "trayectoria", "background", "previous roles", "laboral", "work experience", "trabajos"],
    answer: () => ({
      text: L(`Nerea’s experience:\n${jobsList("en")}\n\nBefore that: customer-facing jobs (Mercadona, Amazon, restaurants) while studying.`, `Experiencia de Nerea:\n${jobsList("es")}\n\nAntes: trabajos de cara al público (Mercadona, Amazon, restauración) mientras estudiaba.`),
      actions: ["experience", "cv"],
      suggestions: ["education", "skills", "xr4europe"],
    }),
  },
  {
    id: "education",
    keywords: ["estudios", "estudiado", "studied", "study", "education", "formacion", "degree", "grado", "universidad", "university", "telematica", "telematics", "ingenieria", "engineering", "capgemini", "certificado", "certificate", "titulacion"],
    answer: () => ({
      text: L(
        P.experience.education.items.map((e) => `🎓 **${e.title.en}** — ${orgText(e.org, "en")}${e.dates ? ` (${e.dates})` : ""}`).join("\n"),
        P.experience.education.items.map((e) => `🎓 **${e.title.es}** — ${orgText(e.org, "es")}${e.dates ? ` (${e.dates})` : ""}`).join("\n")
      ),
      actions: ["experience"],
      suggestions: ["languages", "skills"],
    }),
  },
  {
    id: "languages",
    keywords: ["idiomas", "languages", "language", "ingles", "english", "catalan", "valenciano", "espanol", "spanish", "habla", "speak", "speaks", "b2"],
    answer: () => ({
      text: L("🗣️ **Spanish** — native\n🗣️ **Catalan / Valencian** — native\n🗣️ **English** — B2 (working in English at XR4Europe, Brussels)", "🗣️ **Español** — nativo\n🗣️ **Valenciano / catalán** — nativo\n🗣️ **Inglés** — B2 (trabaja en inglés en XR4Europe, Bruselas)"),
      suggestions: ["location", "lookingFor"],
    }),
  },
  {
    id: "skills",
    keywords: ["programming languages", "lenguajes de programacion", "skills", "habilidades", "tecnologias", "technologies", "tech stack", "stack", "python", "java", "c++", "matlab", "programar", "programming", "code", "codigo", "herramientas", "tools", "hardware", "llm", "llms", "react", "sabe hacer", "can she do", "competencias"],
    answer: () => ({
      text: L(
        P.skills.groups.map((g) => `• **${g.title.en}:** ${g.items.en.join(", ")}`).join("\n"),
        P.skills.groups.map((g) => `• **${g.title.es}:** ${g.items.es.join(", ")}`).join("\n")
      ),
      actions: ["skills"],
      suggestions: ["projects", "whyHire"],
    }),
  },
  {
    id: "projects",
    keywords: ["proyectos", "projects", "project", "proyecto", "portfolio", "casos", "case studies", "built", "construido"],
    answer: () => ({
      text: L(
        `Beyond AIntegra (CAT & CATY), Nerea has built:\n${P.projects.items.map((p) => `• **${tx(p.title, "en")}** — ${p.oneLiner.en} (${p.meta.en})`).join("\n")}`,
        `Además de AIntegra (CAT y CATY), Nerea ha creado:\n${P.projects.items.map((p) => `• **${tx(p.title, "es")}** — ${p.oneLiner.es} (${p.meta.es})`).join("\n")}`
      ),
      actions: ["projects"],
      suggestions: ["fordy", "security", "h2i"],
    }),
  },
  {
    id: "health",
    keywords: ["aintegra health", "health", "salud", "dedalus", "datathon", "sanitario", "sanitaria", "healthcare", "hospital", "pacientes", "patients"],
    answer: () => projectAnswer("health"),
  },
  {
    id: "security",
    keywords: ["pitch ganador", "winning pitch", "demo day", "captcha por gestos", "gesture captcha", "security", "seguridad", "ciberseguridad", "cybersecurity", "captcha", "cortina", "curtain", "modos seguros", "safe modes", "incibe", "startup valencia", "cifrado", "encryption", "best pitch", "mejor pitch", "pitch"],
    answer: () => ({ ...projectAnswer("security"), actions: ["pitch", "projects"] }),
  },
  {
    id: "cypherdoc",
    keywords: ["cypherdoc", "cipherdoc", "vds", "vds+", "editor", "the challenge", "colaborativo", "collaborative"],
    answer: () => projectAnswer("cypherdoc"),
  },
  {
    id: "awards",
    keywords: ["premios", "premio", "awards", "award", "prize", "prizes", "logros", "achievements", "ganado", "won", "win", "reconocimientos", "recognition", "finalista", "finalist", "galardones"],
    answer: () => ({
      text: L(`🏆 Awards & finalist spots:\n${awardsList("en")}\n\nPlus: selected for IAtecUV, Erasmus+ Health2Innovation and the Cybersecurity Startup Program.`, `🏆 Premios y finales:\n${awardsList("es")}\n\nAdemás: seleccionada para IAtecUV, Erasmus+ Health2Innovation y el Cybersecurity Startup Program.`),
      actions: ["awards"],
      suggestions: ["ford", "health", "security"],
    }),
  },
  {
    id: "whyHire",
    keywords: ["contratar", "contratarla", "hire", "hire her", "hiring", "por que", "why", "strengths", "fortalezas", "puntos fuertes", "aporta", "bring", "value", "valor", "diferencia", "destaca", "stand out", "best at", "good fit", "encaja"],
    answer: () => ({
      text: L(
        "Why Nerea? ✨\n• **Builds real things** — hardware + software, from prototype to validation with users.\n• **Accessibility is her native language** — not a checklist, the starting point.\n• **Proven under pressure** — 6 awards & finals, incl. Best Pitch 2026, and speaker at ExpoInnova & VDS 2026.\n• **Builds AI for real** — Fordy, a multi-agent & multimodal system at Ford (her thesis), and CATY, a 100% local assistant.\n• **International & multidisciplinary** — XR4Europe in Brussels, NGOs, juries, engineers.",
        "¿Por qué Nerea? ✨\n• **Construye cosas reales** — hardware + software, del prototipo a la validación con usuarios.\n• **La accesibilidad es su idioma nativo** — no un checklist, el punto de partida.\n• **Probada bajo presión** — 6 premios y finales, incluido Mejor Pitch 2026, y ponente en ExpoInnova y VDS 2026.\n• **Construye IA de verdad** — Fordy, sistema multiagente y multimodal en Ford (su TFG), y CATY, un asistente 100% local.\n• **Internacional y multidisciplinar** — XR4Europe en Bruselas, ONGs, jurados, ingenieros."
      ),
      actions: ["contact", "cv"],
      suggestions: ["lookingFor", "awards"],
    }),
  },
  {
    id: "lookingFor",
    keywords: ["busca", "buscando", "looking for", "looking", "puesto", "role", "roles", "oportunidad", "oportunidades", "opportunity", "opportunities", "disponible", "available", "availability", "disponibilidad", "open to work", "abierta", "empleo", "job", "vacante", "position", "incorporacion", "start date"],
    answer: () => ({
      text: L(
        `${P.about.lookingFor.body.en}\n\nRoles she’s excited about:\n${P.about.lookingFor.roles.en.map((r) => `• ${r}`).join("\n")}\n\nFor dates and details, the best is to write to her directly 🙂`,
        `${P.about.lookingFor.body.es}\n\nPuestos que le ilusionan:\n${P.about.lookingFor.roles.es.map((r) => `• ${r}`).join("\n")}\n\nPara fechas y detalles, lo mejor es escribirle directamente 🙂`
      ),
      actions: ["contact", "cv"],
      suggestions: ["whyHire", "location"],
    }),
  },
  {
    id: "location",
    keywords: ["donde", "where", "vive", "lives", "based", "ubicacion", "location", "ciudad", "city", "relocate", "relocation", "reubicacion", "remoto", "remote", "mudarse", "move", "viajar", "travel", "valencia", "spain", "espana"],
    answer: () => ({
      text: L(
        "📍 Based in **Valencia, Spain** — currently in **Brussels** with XR4Europe until December 2026.\nShe’s used to international teams and would love roles with international scope. For remote/relocation specifics, ask her directly!",
        "📍 Vive en **Valencia, España** — ahora en **Bruselas** con XR4Europe hasta diciembre de 2026.\nEstá acostumbrada a equipos internacionales y le encantan los puestos con alcance internacional. Para detalles de remoto o reubicación, ¡pregúntale directamente!"
      ),
      actions: ["contact"],
      suggestions: ["languages", "lookingFor"],
    }),
  },
  {
    id: "contact",
    keywords: ["contacto", "contact", "contactar", "contacto", "email", "correo", "mail", "linkedin", "escribir", "escribirle", "reach", "llamar", "call", "hablar con", "talk to", "meet", "reunion", "meeting", "entrevista", "interview"],
    answer: () => ({
      text: L(`The fastest way:\n✉️ **${P.person.email}**\n💼 LinkedIn: nerea-panadero-alfonso\n\nOr use the form at the bottom: it prepares the email for you (the site stores nothing).`, `La forma más rápida:\n✉️ **${P.person.email}**\n💼 LinkedIn: nerea-panadero-alfonso\n\nO usa el formulario del final: te prepara el correo (la web no guarda nada).`),
      actions: ["email", "linkedin", "contact"],
    }),
  },
  {
    id: "cv",
    keywords: ["cv", "curriculum", "resume", "descargar", "download", "pdf", "hoja de vida"],
    answer: () => ({
      text: L("Here’s Nerea’s CV 📄 — it opens in a new tab.", "Aquí tienes el CV de Nerea 📄 — se abre en otra pestaña."),
      actions: ["cv", "linkedin"],
    }),
  },
  {
    id: "salary",
    keywords: ["salario", "salary", "sueldo", "pay", "cobra", "cobrar", "rate", "tarifa", "expectativas salariales", "compensation", "precio", "price"],
    answer: () => ({
      text: L("That’s a conversation for Nerea herself 🙂 Drop her a line and she’ll be happy to talk.", "Eso mejor hablarlo con Nerea directamente 🙂 Escríbele y lo comentáis."),
      actions: ["email", "contact"],
    }),
  },
  {
    id: "a11ySite",
    keywords: ["accesibilidad de la web", "this site", "esta web", "panel", "wcag", "a11y", "lector de pantalla", "screen reader", "alt a", "modo oscuro", "dark mode", "alto contraste", "high contrast", "dislexia", "dyslexia", "tamano de letra", "font size", "accesible", "accessible"],
    answer: () => ({
      text: L(
        "This portfolio practises what Nerea preaches ♿\n• Accessibility panel (**Alt + A**): text size, high contrast, dark mode, dyslexia-friendly font, reading guide, read aloud, big cursor, pause animations…\n• Quick profiles: low vision, dyslexia, focus/ADHD, seizure-safe\n• Keyboard navigation, visible focus, respects reduced motion\n• Targets WCAG 2.2 AA",
        "Este portfolio aplica lo que Nerea defiende ♿\n• Panel de accesibilidad (**Alt + A**): tamaño de texto, alto contraste, modo oscuro, fuente para dislexia, guía de lectura, lectura en voz alta, cursor grande, pausar animaciones…\n• Perfiles rápidos: baja visión, dislexia, concentración/TDAH, sin destellos\n• Navegable con teclado, foco visible, respeta el movimiento reducido\n• Objetivo: WCAG 2.2 AA"
      ),
      actions: ["a11y"],
      suggestions: ["aintegra", "whyHire"],
    }),
  },
  {
    id: "personal",
    keywords: ["hobbies", "hobby", "tiempo libre", "free time", "gustos", "le gusta", "does she like", "fun fact", "curiosidad", "edad", "age", "cuantos anos", "how old"],
    answer: () => ({
      text: L("I stick to professional topics — but here’s a fun one: her name is written in **Braille** on this site ⠝⠑⠗⠑⠁. For anything personal, ask Nerea herself 🙂", "Me ciño a temas profesionales — pero una curiosidad: su nombre está escrito en **braille** en esta web ⠝⠑⠗⠑⠁. Para lo personal, ¡pregúntale a Nerea! 🙂"),
      suggestions: ["about", "contact"],
    }),
  },
];

function projectAnswer(id) {
  const p = P.projects.items.find((x) => x.id === id);
  return {
    text: L(
      `**${tx(p.title, "en")}** — ${p.badge.en} · ${p.meta.en}\n\n**Problem:** ${p.problem.en}\n**Solution:** ${p.solution.en}\n\n**What Nerea did:**\n${p.role.map((r) => `• ${r.en}`).join("\n")}${p.confidential ? "\n\n🔒 Confidential project — no screenshots or examples can be shared." : ""}`,
      `**${tx(p.title, "es")}** — ${p.badge.es} · ${p.meta.es}\n\n**Problema:** ${p.problem.es}\n**Solución:** ${p.solution.es}\n\n**Qué hizo Nerea:**\n${p.role.map((r) => `• ${r.es}`).join("\n")}${p.confidential ? "\n\n🔒 Proyecto confidencial — no se pueden compartir capturas ni ejemplos." : ""}`
    ),
    actions: ["projects"],
    suggestions: ["projects", "awards"],
  };
}

const BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));

const SUGGESTION_LABELS = {
  about: L("Who is Nerea?", "¿Quién es Nerea?"),
  whyHire: L("Why hire her?", "¿Por qué contratarla?"),
  lookingFor: L("What role is she looking for?", "¿Qué puesto busca?"),
  experience: L("Work experience", "Experiencia"),
  aintegra: L("Tell me about AIntegra", "Cuéntame sobre AIntegra"),
  cat: L("CAT & CATY", "CAT y CATY"),
  awards: L("Awards", "Premios"),
  skills: L("Skills & tech", "Habilidades"),
  projects: L("Projects", "Proyectos"),
  health: L("AIntegra Health", "AIntegra Health"),
  security: L("CATY cybersecurity", "Ciberseguridad de CATY"),
  cypherdoc: L("CypherDoc", "CypherDoc"),
  education: L("Education", "Formación"),
  languages: L("Languages", "Idiomas"),
  location: L("Where is she based?", "¿Dónde vive?"),
  contact: L("How do I contact her?", "¿Cómo la contacto?"),
  xr4europe: L("XR4Europe", "XR4Europe"),
  fordy: L("What is Fordy?", "¿Qué es Fordy?"),
  pharos: L("What is Pharos?", "¿Qué es Pharos?"),
  caty: L("What is CATY?", "¿Qué es CATY?"),
  h2i: L("Health2Innovation project", "Proyecto Health2Innovation"),
  smile: L("SMILE Incubator", "Incubadora SMILE"),
  vds: L("Talks & events", "Ponencias y eventos"),
  ford: L("Ford", "Ford"),
  a11ySite: L("Is this site accessible?", "¿Esta web es accesible?"),
};

export const ACTIONS = {
  about: { kind: "scroll", to: "about", label: L("See ‘About’", "Ver ‘Sobre mí’") },
  experience: { kind: "scroll", to: "experience", label: L("Open experience", "Ver experiencia") },
  aintegra: { kind: "scroll", to: "aintegra", label: L("Go to AIntegra", "Ir a AIntegra") },
  projects: { kind: "scroll", to: "projects", label: L("See projects", "Ver proyectos") },
  talks: { kind: "scroll", to: "talks", label: L("See talks", "Ver ponencias") },
  awards: { kind: "scroll", to: "awards", label: L("See awards", "Ver premios") },
  skills: { kind: "scroll", to: "skills", label: L("See skills", "Ver habilidades") },
  contact: { kind: "scroll", to: "contact", label: L("Contact form", "Formulario") },
  cv: { kind: "link", asset: true, href: (lang) => P.person.cvUrl[lang], label: L("Download CV", "Descargar CV") },
  email: { kind: "link", href: () => `mailto:${P.person.email}`, label: L("Send email", "Enviar email") },
  linkedin: { kind: "link", href: () => P.person.linkedinUrl, label: L("LinkedIn", "LinkedIn") },
  aintegraWeb: { kind: "link", href: () => P.aintegra.websiteUrl, label: L("aintegralimited.com", "aintegralimited.com") },
  pitch: { kind: "link", href: () => P.projects.items.find((p) => p.id === "security").pitchUrl, label: L("Watch the winning pitch", "Ver el pitch ganador") },
  linkedinPosts: { kind: "link", href: () => P.person.linkedinActivityUrl, label: L("Her LinkedIn posts", "Sus posts en LinkedIn") },
  a11y: { kind: "a11y", label: L("Open accessibility panel", "Abrir panel de accesibilidad") },
};

const MORE = ["mas", "more", "tell me more", "cuentame mas", "y que mas", "detalles", "details", "amplia", "expand", "go on", "sigue", "continua", "what else", "anything else"];

function scoreIntent(intent, tokens, text) {
  let score = 0;
  for (const kw of intent.keywords) {
    if (kw.includes(" ")) {
      if (text.includes(` ${kw} `)) score += 4;
      continue;
    }
    for (const tok of tokens) {
      if (tok === kw) score += 3;
      else if (kw.length >= 4 && tok.length >= 4 && (tok.startsWith(kw) || kw.startsWith(tok))) score += 2;
      else if (kw.length >= 5 && tok.length >= 5 && lev(tok, kw) <= 1) score += 1.5;
    }
  }
  return score;
}

export function suggestionLabel(id, lang) {
  return SUGGESTION_LABELS[id]?.[lang] ?? id;
}

export function starterSuggestions() {
  return ["about", "whyHire", "lookingFor", "fordy", "caty", "a11ySite"];
}

export function generateResponse(message, { lang: uiLang = "en", lastIntent = null } = {}) {
  const lang = detectLanguage(message, uiLang);
  const text = ` ${normalize(message)} `;
  const tokens = text.trim().split(" ").filter(Boolean);

  const pick = (intent, which = "answer") => {
    const r = intent[which]();
    return {
      intent: intent.id,
      lang,
      text: r.text[lang],
      actions: r.actions || [],
      suggestions: (r.suggestions || []).filter((s) => s !== intent.id),
    };
  };

  // Follow-up: "tell me more"
  const isMore = tokens.length <= 5 && MORE.some((m) => text.includes(` ${m} `));
  if (isMore && lastIntent && BY_ID[lastIntent]) {
    const prev = BY_ID[lastIntent];
    if (prev.more) return pick(prev, "more");
    const next = (prev.answer().suggestions || [])[0];
    if (next && BY_ID[next]) return pick(BY_ID[next]);
  }

  let best = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const s = scoreIntent(intent, tokens, text);
    if (s > bestScore) {
      best = intent;
      bestScore = s;
    }
  }

  if (best && bestScore >= 1.5) return pick(best);

  return {
    intent: null,
    lang,
    text: L(
      "Hmm, I’m not sure about that one 🤔 I know about Nerea’s experience, AIntegra (CAT & CATY), Ford projects, awards, skills and what she’s looking for. Try one of these:",
      "Mmm, de eso no estoy seguro 🤔 Sé sobre la experiencia de Nerea, AIntegra (CAT y CATY), proyectos en Ford, premios, habilidades y qué busca. Prueba con una de estas:"
    )[lang],
    actions: ["email"],
    suggestions: ["about", "whyHire", "lookingFor", "awards"],
  };
}

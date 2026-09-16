// All site content lives here (EN / ES). Components only render it.

export const portfolio = {
  person: {
    name: "Nerea Panadero Alfonso",
    shortName: "Nerea",
    email: "nerepanaifo@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/nerea-panadero-alfonso/",
    linkedinActivityUrl: "https://www.linkedin.com/in/nerea-panadero-alfonso/recent-activity/all/",
    cvUrl: {
      en: "/cv/CV_Nerea_Panadero_i.pdf",
      es: "/cv/CV_Nerea_Panadero_i.pdf",
    },
  },

  nav: [
    { id: "about", label: { en: "About", es: "Sobre mí" } },
    { id: "experience", label: { en: "Experience", es: "Experiencia" } },
    { id: "aintegra", label: { en: "AIntegra", es: "AIntegra" } },
    { id: "projects", label: { en: "Projects", es: "Proyectos" } },
    { id: "awards", label: { en: "Awards", es: "Premios" } },
    { id: "talks", label: { en: "Talks", es: "Ponencias" } },
  ],

  ui: {
    skip: { en: "Skip to content", es: "Saltar al contenido" },
    letsTalk: { en: "Let’s talk", es: "Hablemos" },
    downloadCV: { en: "Download CV", es: "Descargar CV" },
    askAI: { en: "Ask my AI assistant", es: "Pregunta a mi asistente IA" },
    menu: { en: "Menu", es: "Menú" },
    closeMenu: { en: "Close menu", es: "Cerrar menú" },
    language: { en: "Language", es: "Idioma" },
    a11y: { en: "Accessibility options", es: "Opciones de accesibilidad" },
    brailleTitle: { en: "“Nerea” written in Braille", es: "«Nerea» escrito en braille" },
    current: { en: "Now", es: "Ahora" },
    caseStudy: { en: "Case study", es: "Ver caso" },
    close: { en: "Close", es: "Cerrar" },
  },

  hero: {
    openToWork: {
      en: "Open to new roles in accessibility, AI & emerging tech",
      es: "Abierta a nuevos retos en accesibilidad, IA y tecnologías emergentes",
    },
    hello: { en: "Hi, I’m Nerea", es: "Hola, soy Nerea" },
    titleStart: { en: "I make technology work for", es: "Hago que la tecnología funcione para" },
    titleHighlight: { en: "everyone.", es: "todo el mundo." },
    sub: {
      en: "Telematics Engineer and CEO & co-founder of AIntegra, where I build technology that adapts to each person — whatever their abilities or digital skills. I’ve built multi-agent AI at Ford and help set XR accessibility standards in Europe.",
      es: "Ingeniera Telemática y CEO y cofundadora de AIntegra, donde creo tecnología que se adapta a cada persona — sean cuales sean sus capacidades o su nivel digital. He construido IA multiagente en Ford y ayudo a definir estándares de accesibilidad XR en Europa.",
    },
    proofLabel: { en: "Recognised by", es: "Reconocida por" },
    proof: ["Ford", "INCIBE", "Dedalus", "Universitat de València", "VDS+"],
    photo: { src: "/img/hero-nerea.webp", alt: { en: "Nerea Panadero smiling", es: "Nerea Panadero sonriendo" }, width: 720, height: 900 },
    stickers: {
      award: { en: "1st Prize · Ford Smart Mobility", es: "1er premio · Ford Smart Mobility" },
      role: { en: "Speaker · VDS 2026", es: "Ponente · VDS 2026" },
      now: { en: "Now in Brussels · XR4Europe", es: "Ahora en Bruselas · XR4Europe" },
    },
  },

  marquee: {
    en: ["Digital accessibility", "Multi-agent AI", "Local-first AI", "XR / VR accessibility", "Hardware prototyping", "Inclusive design", "User validation", "Public speaking", "Python · Java · C++"],
    es: ["Accesibilidad digital", "IA multiagente", "IA en local", "Accesibilidad XR / VR", "Prototipado hardware", "Diseño inclusivo", "Validación con usuarios", "Hablar en público", "Python · Java · C++"],
  },

  about: {
    eyebrow: { en: "What I bring", es: "Lo que aporto" },
    titleStart: { en: "Engineering with a", es: "Ingeniería con" },
    titleHighlight: { en: "social vocation.", es: "vocación social." },
    bio: {
      en: "I’m a Telematics Engineer passionate about digital accessibility, artificial intelligence and educational innovation. I co-founded AIntegra to build award-winning technology that adapts to people of every ability — it started with blind users and now embraces every kind of diversity. I’m known for adaptability, entrepreneurial vision and leading multidisciplinary projects.",
      es: "Soy Ingeniera Telemática apasionada por la accesibilidad digital, la inteligencia artificial y la innovación educativa. Cofundé AIntegra para crear tecnología premiada que se adapta a personas de cualquier capacidad — nació para personas ciegas y hoy abraza cualquier tipo de diversidad. Destaco por mi adaptabilidad, visión emprendedora y liderazgo de proyectos multidisciplinares.",
    },
    quote: {
      en: "Accessibility isn’t a feature I add at the end. It’s where I start.",
      es: "La accesibilidad no es algo que añado al final. Es por donde empiezo.",
    },
    photo: { src: "/img/nerea-working-session.webp", alt: { en: "Nerea speaking during a working session with her team", es: "Nerea hablando en una sesión de trabajo con su equipo" }, width: 1100, height: 732 },
    photoCaption: { en: "bringing ideas to the table ✎", es: "poniendo ideas sobre la mesa ✎" },
    strengths: [
      {
        color: "mint",
        kicker: { en: "Builder", es: "Constructora" },
        title: { en: "I build the real thing", es: "Construyo lo real" },
        body: {
          en: "Hardware and software, from prototype to validation with users.",
          es: "Hardware y software, del prototipo a la validación con usuarios.",
        },
        chips: ["Python", "Multi-agent AI", "BigQuery", "Java", "C++"],
      },
      {
        color: "blush",
        kicker: { en: "Communicator", es: "Comunicadora" },
        title: { en: "Founder who pitches & wins", es: "Founder que presenta y gana" },
        body: {
          en: "Best Pitch Award 2026. Comfortable on stage, with juries, NGOs and engineers.",
          es: "Premio al Mejor Pitch 2026. Cómoda en escenarios, con jurados, ONGs e ingenieros.",
        },
      },
      {
        color: "sky",
        kicker: { en: "International", es: "Internacional" },
        title: { en: "Valencia ⇄ Brussels", es: "Valencia ⇄ Bruselas" },
        body: {
          en: "Spanish & Catalan (native), English (B2). Used to European, multidisciplinary teams.",
          es: "Español y valenciano (nativo), inglés (B2). Acostumbrada a equipos europeos y multidisciplinares.",
        },
      },
    ],
    awardsStat: {
      label: { en: "awards & finalist spots", es: "premios y finales" },
      body: { en: "Ford · INCIBE · Dedalus · VDS+ · UV", es: "Ford · INCIBE · Dedalus · VDS+ · UV" },
    },
    now: {
      title: { en: "Right now", es: "Ahora mismo" },
      points: [
        { en: "Defining accessibility criteria for the XR Ethics Certification at XR4Europe (Brussels).", es: "Definiendo criterios de accesibilidad para la XR Ethics Certification en XR4Europe (Bruselas)." },
        { en: "Growing AIntegra: CAT and CATY, technology that adapts to every person.", es: "Haciendo crecer AIntegra: CAT y CATY, tecnología que se adapta a cada persona." },
        { en: "Getting ready to speak at ExpoInnova (15 Oct) and VDS 2026 (21–22 Oct), both in Valencia.", es: "Preparando mis ponencias en ExpoInnova (15 oct) y VDS 2026 (21–22 oct), ambas en Valencia." },
      ],
    },
    lookingFor: {
      title: { en: "What I’m looking for", es: "Qué estoy buscando" },
      body: {
        en: "Roles where accessibility, AI and emerging tech create real impact — ideally in international, multidisciplinary teams.",
        es: "Puestos donde la accesibilidad, la IA y las tecnologías emergentes generen impacto real — idealmente en equipos internacionales y multidisciplinares.",
      },
      roles: {
        en: ["Accessibility Engineer", "AI & Innovation", "XR Accessibility", "Emerging Tech / Product"],
        es: ["Ingeniera de Accesibilidad", "IA e Innovación", "Accesibilidad XR", "Tecnologías emergentes / Producto"],
      },
    },
  },

  experience: {
    eyebrow: { en: "Career", es: "Trayectoria" },
    titleStart: { en: "Where I’ve", es: "Dónde he" },
    titleHighlight: { en: "made things happen.", es: "hecho que pasen cosas." },
    lead: {
      en: "From founding a startup to innovation at Ford and accessibility work at European level.",
      es: "De fundar una startup a la innovación en Ford y la accesibilidad a nivel europeo.",
    },
    currentLabel: { en: "Current", es: "Actual" },
    items: [
      {
        color: "lilac",
        role: { en: "XR Accessibility Specialist", es: "XR Accessibility Specialist" },
        org: "XR4Europe",
        place: { en: "Brussels, Belgium", es: "Bruselas, Bélgica" },
        dates: { en: "Sep 2026 – Dec 2026", es: "Sep 2026 – Dic 2026" },
        current: true,
        bullets: [
          { en: "Accessibility and inclusive design for XR and VR environments.", es: "Accesibilidad y diseño inclusivo para entornos XR y VR." },
          { en: "Contributing to European initiatives for responsible, accessible, human-centered immersive technologies.", es: "Contribución a iniciativas europeas por tecnologías inmersivas responsables, accesibles y centradas en las personas." },
          { en: "Accessibility criteria and guidelines for the XR Ethics Certification.", es: "Criterios y guías de accesibilidad para la XR Ethics Certification." },
        ],
        note: {
          en: "Via the EU-funded Erasmus for Young Entrepreneurs programme, coordinated in Spain by AJEV.",
          es: "A través del programa Erasmus for Young Entrepreneurs, financiado por la UE y coordinado en España por AJEV.",
        },
        tags: ["XR / VR", "Accessibility", "EU"],
      },
      {
        color: "mint",
        role: { en: "CEO & Co-Founder", es: "CEO y cofundadora" },
        org: "AIntegra Limited",
        place: { en: "Valencia, Spain", es: "Valencia, España" },
        dates: { en: "2022 – Present", es: "2022 – Actualidad" },
        current: true,
        bullets: [
          { en: "Accessible technology born for blind people — now designed for every kind of diversity and digital skill level.", es: "Tecnología accesible nacida para personas ciegas — hoy pensada para cualquier diversidad y nivel de conocimiento tecnológico." },
          { en: "Creation and validation of CAT, a gesture-navigation device, and CATY, an AI assistant that runs 100% locally.", es: "Creación y validación de CAT, un dispositivo de navegación por gestos, y CATY, un asistente de IA que funciona 100% en local." },
          { en: "Coordination with NGOs, institutions and users for prototype validation.", es: "Coordinación con ONGs, instituciones y usuarios para validar prototipos." },
          { en: "Project management, strategic partnerships and social innovation programmes.", es: "Gestión de proyectos, alianzas estratégicas y programas de innovación social." },
        ],
        tags: ["Hardware", "AI", "Accessibility"],
      },
      {
        color: "sky",
        role: { en: "Innovation & AI Intern", es: "Becaria de Innovación e IA" },
        org: "Ford",
        place: { en: "Valencia, Spain", es: "Valencia, España" },
        dates: { en: "Feb 2026 – Jul 2026", es: "Feb 2026 – Jul 2026" },
        bullets: [
          { en: "Innovation Department internship focused on AI agents and automation.", es: "Prácticas en el Departamento de Innovación centradas en agentes de IA y automatización." },
          { en: "Fordy: multi-agent, multimodal AI system connecting Microsoft Teams with BigQuery — also my Bachelor’s thesis.", es: "Fordy: sistema de IA multiagente y multimodal que conecta Microsoft Teams con BigQuery — también mi TFG." },
          { en: "Pharos: centralised platform for documents and guides with organisational accounts.", es: "Pharos: plataforma centralizada de documentos y guías con cuentas organizacionales." },
        ],
        tags: ["Multi-agent AI", "Multimodal", "BigQuery", "Innovation"],
        photos: [
          { src: "/img/ford-team.webp", alt: { en: "Selfie of Nerea with the Ford Innovation team in the office", es: "Selfie de Nerea con el equipo de Innovación de Ford en la oficina" } },
          { src: "/img/ford-team-illustration.webp", alt: { en: "Illustration of the Ford Innovation team, including Nerea", es: "Ilustración del equipo de Innovación de Ford, con Nerea" } },
        ],
        photosCaption: { en: "my Ford Innovation team — in real life and illustrated 💙", es: "mi equipo de Innovación de Ford — en persona e ilustrado 💙" },
      },
      {
        color: "butter",
        role: { en: "Private Tutor (STEM & school support)", es: "Profesora particular (STEM y refuerzo)" },
        org: "Freelance",
        place: { en: "Valencia, Spain", es: "Valencia, España" },
        dates: { en: "2020 – 2024", es: "2020 – 2024" },
        bullets: [
          { en: "Programming, maths and physics for students aged 7 to 23.", es: "Programación, matemáticas y física para alumnos de 7 a 23 años." },
          { en: "Explaining complex concepts clearly, adapted to each level.", es: "Explicar conceptos complejos con claridad, adaptados a cada nivel." },
        ],
        tags: ["Teaching", "Communication"],
      },
    ],
    other: {
      title: { en: "Also worked as", es: "También he trabajado como" },
      lead: {
        en: "Customer-facing jobs while studying — teamwork, time management and patience.",
        es: "Trabajos de cara al público mientras estudiaba — trabajo en equipo, gestión del tiempo y paciencia.",
      },
      items: [
        { role: { en: "Cashier & Customer Service", es: "Cajera y atención al cliente" }, org: "Mercadona / Día", dates: "2022 – 2024" },
        { role: { en: "Warehouse Operative", es: "Operaria de almacén" }, org: "Amazon Logistics", dates: "2021 – 2022" },
        { role: { en: "Waitress", es: "Camarera" }, org: "Tagliatella / Fábrica della pasta", dates: "2019 – 2020" },
      ],
    },
    education: {
      title: { en: "Education", es: "Formación" },
      items: [
        { title: { en: "BSc Telematics Engineering", es: "Grado en Ingeniería Telemática" }, org: "Universitat de València", dates: "2020 – 2026" },
        { title: { en: "Bachelor’s thesis: Fordy, multi-agent & multimodal AI", es: "TFG: Fordy, IA multiagente y multimodal" }, org: "Universitat de València × Ford", dates: "2026" },
        { title: { en: "Certificate in Innovative Entrepreneurial Transversal Competencies", es: "Certificado de competencias transversales emprendedoras innovadoras" }, org: "UV Emprén · Universitat de València", dates: "", image: "/img/cert-uvempren.webp" },
        { title: { en: "Testing & Continuous Integration", es: "Testing e Integración Continua" }, org: "Capgemini", dates: "2023" },
        { title: { en: "Further training: AI, digital accessibility & editing software", es: "Formación: IA, accesibilidad digital y software de edición" }, org: { en: "Ongoing", es: "Continua" }, dates: "" },
      ],
    },
    languages: {
      title: { en: "Languages", es: "Idiomas" },
      items: [
        { name: { en: "Spanish", es: "Español" }, level: { en: "Native", es: "Nativo" }, value: 100 },
        { name: { en: "Catalan / Valencian", es: "Valenciano / Catalán" }, level: { en: "Native", es: "Nativo" }, value: 100 },
        { name: { en: "English", es: "Inglés" }, level: { en: "B2", es: "B2" }, value: 70 },
      ],
    },
  },

  aintegra: {
    eyebrow: { en: "Featured venture", es: "Proyecto destacado" },
    titleStart: { en: "AIntegra: computers that feel", es: "AIntegra: ordenadores que vuelven a sentirse" },
    titleHighlight: { en: "natural again.", es: "naturales." },
    lead: {
      en: "Co-founded in 2022. AIntegra was born for blind people — today we design for every kind of diversity: technology that adapts to each person, whatever their abilities or digital skills.",
      es: "Cofundada en 2022. AIntegra nació para las personas ciegas — hoy diseñamos para cualquier tipo de diversidad: tecnología que se adapta a cada persona, sean cuales sean sus capacidades o su conocimiento tecnológico.",
    },
    problem: {
      label: { en: "The problem", es: "El problema" },
      body: {
        en: "Computers expect people to adapt to them: see the screen, master the mouse, understand the menus. Anyone who doesn’t fit that mould — because of a disability or little digital experience — is left behind.",
        es: "Los ordenadores esperan que las personas se adapten a ellos: ver la pantalla, dominar el ratón, entender los menús. Quien no encaja en ese molde — por una discapacidad o por poca experiencia digital — se queda fuera.",
      },
    },
    products: [
      {
        name: "CAT",
        color: "mint",
        tag: { en: "Hardware · gestures", es: "Hardware · gestos" },
        body: {
          en: "Cognitive Assistive Trackpad: navigate the computer with simple gestures — first designed with blind users, now for anyone.",
          es: "Cognitive Assistive Trackpad: navega por el ordenador con gestos sencillos — diseñado primero con personas ciegas, hoy para cualquiera.",
        },
      },
      {
        name: "CATY",
        fullName: "Cognitive Assistive Technology for You",
        color: "butter",
        tag: { en: "AI assistant · 100% local", es: "Asistente IA · 100% local" },
        body: {
          en: "An AI assistant that adapts to each person and runs entirely on their device — nothing is sent to the cloud, something very few assistants can say.",
          es: "Un asistente de IA que se adapta a cada persona y funciona entero en su dispositivo — nada se envía a la nube, algo que muy pocos asistentes pueden decir.",
        },
        pillars: [
          { en: "Communication", es: "Comunicación" },
          { en: "Adaptation", es: "Adaptación" },
          { en: "Cybersecurity", es: "Ciberseguridad" },
        ],
      },
    ],
    role: {
      label: { en: "My role", es: "Mi papel" },
      body: {
        en: "CEO & co-founder: product and technology development, validation with NGOs and users, partnerships and pitching.",
        es: "CEO y cofundadora: desarrollo de producto y tecnología, validación con ONGs y usuarios, alianzas y pitching.",
      },
    },
    recognition: [
      { en: "🏆 1st Prize · Ford Smart Mobility 2026", es: "🏆 1er premio · Ford Smart Mobility 2026" },
      { en: "🎤 Best Pitch · Startup Valencia × INCIBE", es: "🎤 Mejor Pitch · Startup Valencia × INCIBE" },
      { en: "🚀 IAtecUV accelerator", es: "🚀 Aceleradora IAtecUV" },
      { en: "⭐ ETSE-UV Preincubator winner", es: "⭐ Ganadores Preincubadora ETSE-UV" },
    ],
    websiteLabel: { en: "Visit aintegralimited.com", es: "Visitar aintegralimited.com" },
    websiteUrl: "https://www.aintegralimited.com",
    photos: [
      { src: "/img/caty-presentation.webp", alt: { en: "Nerea and her co-founder presenting CATY on stage", es: "Nerea y su cofundador presentando CATY en un escenario" }, width: 900, height: 1200 },
      { src: "/img/once.webp", alt: { en: "Nerea and her co-founder at ONCE", es: "Nerea y su cofundador en la ONCE" }, width: 1100, height: 825 },
      { src: "/img/logo-aintegra.webp", alt: { en: "AIntegra logo", es: "Logo de AIntegra" }, width: 560, height: 560 },
    ],
  },

  projects: {
    pitchLabel: { en: "Watch the winning pitch", es: "Ver el pitch ganador" },
    eyebrow: { en: "Selected work", es: "Trabajo seleccionado" },
    titleStart: { en: "Projects put", es: "Proyectos puestos" },
    titleHighlight: { en: "to the test.", es: "a prueba." },
    lead: {
      en: "Enterprise AI agents at Ford, local-first security, healthtech and secure collaboration — built with real users, companies and juries.",
      es: "Agentes de IA empresariales en Ford, seguridad en local, healthtech y colaboración segura — construidos con usuarios, empresas y jurados reales.",
    },
    confidentialNote: {
      en: "Confidential project: screenshots and examples can’t be shared.",
      es: "Proyecto confidencial: no se pueden compartir capturas ni ejemplos.",
    },
    items: [
      {
        id: "fordy",
        color: "sky",
        art: "agents",
        confidential: true,
        title: "Fordy",
        badge: { en: "🎓 Bachelor’s thesis", es: "🎓 TFG" },
        meta: { en: "Ford · Innovation · 2026", es: "Ford · Innovación · 2026" },
        oneLiner: {
          en: "Multi-agent, multimodal AI system that connects Microsoft Teams with BigQuery inside Ford.",
          es: "Sistema de IA multiagente y multimodal que conecta Microsoft Teams con BigQuery dentro de Ford.",
        },
        problem: {
          en: "In a large organisation, everyday conversations happen in Microsoft Teams while data lives in BigQuery. Bridging both with AI has to work inside the rules of an enterprise environment.",
          es: "En una gran organización, el día a día ocurre en Microsoft Teams y los datos viven en BigQuery. Unirlos con IA tiene que funcionar dentro de las reglas de un entorno empresarial.",
        },
        solution: {
          en: "Fordy: a multi-agent, multimodal system that connects Microsoft Teams with BigQuery, built for Ford’s organisational environment. It is also my Bachelor’s thesis.",
          es: "Fordy: un sistema multiagente y multimodal que conecta Microsoft Teams con BigQuery, construido para el entorno organizacional de Ford. Es también mi Trabajo de Fin de Grado.",
        },
        role: [
          { en: "Designed the multi-agent architecture", es: "Diseñé la arquitectura multiagente" },
          { en: "Built multimodal interaction", es: "Construí la interacción multimodal" },
          { en: "Integrated Microsoft Teams with BigQuery", es: "Integré Microsoft Teams con BigQuery" },
          { en: "Developed it as my Bachelor’s thesis", es: "Lo desarrollé como mi TFG" },
        ],
        impact: [
          { en: "AI agents running in a real enterprise environment", es: "Agentes de IA funcionando en un entorno empresarial real" },
          { en: "Academic + industry validation (TFG with Ford)", es: "Validación académica e industrial (TFG con Ford)" },
        ],
        tags: ["Multi-agent AI", "Multimodal", "BigQuery", "Microsoft Teams"],
        gallery: [],
      },
      {
        id: "pharos",
        color: "lilac",
        art: "docs",
        confidential: true,
        title: "Pharos",
        badge: { en: "🏢 Enterprise", es: "🏢 Empresa" },
        meta: { en: "Ford · Innovation · 2026", es: "Ford · Innovación · 2026" },
        oneLiner: {
          en: "Centralised platform to upload documents and guides, with organisational accounts, to help teams inside Ford.",
          es: "Plataforma centralizada para subir documentos y guías, con cuentas organizacionales, para ayudar a los equipos dentro de Ford.",
        },
        problem: {
          en: "Documents and guides that help people inside a big company need one central, organised home.",
          es: "Los documentos y guías que ayudan a la gente dentro de una gran empresa necesitan un sitio central y organizado.",
        },
        solution: {
          en: "Pharos: a platform where teams upload documents and guides in one centralised place, with organisational accounts.",
          es: "Pharos: una plataforma donde los equipos suben documentos y guías en un único sitio centralizado, con cuentas organizacionales.",
        },
        role: [
          { en: "Worked on the platform during my Ford internship", es: "Trabajé en la plataforma durante mis prácticas en Ford" },
          { en: "Centralised document & guide management", es: "Gestión centralizada de documentos y guías" },
          { en: "Organisational accounts", es: "Cuentas organizacionales" },
        ],
        impact: [
          { en: "One place for internal documents and guides", es: "Un único lugar para documentos y guías internos" },
        ],
        tags: ["Platform", "Enterprise", "Knowledge"],
        gallery: [],
      },
      {
        id: "security",
        color: "butter",
        title: { en: "CATY · Cybersecurity", es: "CATY · Ciberseguridad" },
        badge: { en: "🥈 2nd Prize + Best Pitch", es: "🥈 2º premio + Mejor Pitch" },
        meta: { en: "Startup Valencia × INCIBE · Apr 2026", es: "Startup Valencia × INCIBE · abr 2026" },
        pitchUrl: "https://www.instagram.com/p/DW8PLvFghPV/",
        oneLiner: {
          en: "CATY’s security layer: 100% local AI, an accessible gesture CAPTCHA and safe modes for blind users.",
          es: "La capa de seguridad de CATY: IA 100% local, un CAPTCHA accesible por gestos y modos seguros para personas ciegas.",
        },
        problem: {
          en: "Blind and visually impaired users are especially exposed when entering sensitive data, and most security checks — like visual CAPTCHAs — aren’t accessible.",
          es: "Las personas ciegas o con baja visión están especialmente expuestas al introducir datos sensibles, y la mayoría de controles de seguridad — como los CAPTCHA visuales — no son accesibles.",
        },
        solution: {
          en: "We built CATY’s cybersecurity: it runs fully locally, we wrote a handbook for a gesture-based CAPTCHA so verification is accessible, and added safe modes for specific needs — like a black screen curtain while blind users type sensitive information.",
          es: "Desarrollamos la ciberseguridad de CATY: funciona totalmente en local, creamos un handbook de un CAPTCHA por gestos para que la verificación sea accesible y añadimos modos seguros para necesidades concretas — como una cortina negra en pantalla mientras las personas ciegas introducen información sensible.",
        },
        role: [
          { en: "Local-first: no data leaves the device", es: "Local primero: ningún dato sale del dispositivo" },
          { en: "Handbook for an accessible gesture CAPTCHA", es: "Handbook de un CAPTCHA accesible por gestos" },
          { en: "Safe modes, e.g. black privacy curtain", es: "Modos seguros, p. ej. cortina negra de privacidad" },
          { en: "Final pitch to the jury", es: "Pitch final ante el jurado" },
        ],
        impact: [
          { en: "2nd Prize & Best Pitch Award (2026)", es: "2º premio y Premio al Mejor Pitch (2026)" },
          { en: "Security that is accessible by design", es: "Seguridad accesible desde el diseño" },
        ],
        tags: ["Cybersecurity", "Local AI", "Accessibility"],
        cover: { src: "/img/cyber-demoday-duo.webp", alt: { en: "Nerea and her co-founder at the Cybersecurity Startup Program Demo Day", es: "Nerea y su cofundador en el Demo Day del Cybersecurity Startup Program" } },
        gallery: [
          { src: "/img/cyber-demoday-duo.webp", alt: { en: "At the Demo Day", es: "En el Demo Day" } },
          { src: "/img/cyber-demoday-stage.webp", alt: { en: "All Demo Day participants on stage", es: "Todos los participantes del Demo Day en el escenario" } },
          { src: "/img/cyber-demoday-group.webp", alt: { en: "Celebrating with the Cybersecurity Startup Program cohort", es: "Celebrando con la promoción del Cybersecurity Startup Program" } },
          { src: "/img/logo-aintegra-cyber.webp", fit: "contain", alt: { en: "AIntegra cybersecurity logo", es: "Logo de ciberseguridad de AIntegra" } },
          { src: "/img/p-startupvalencia.webp", fit: "contain", alt: { en: "Startup Valencia logo", es: "Logo Startup Valencia" } },
          { src: "/img/p-incibe.webp", fit: "contain", alt: { en: "INCIBE logo", es: "Logo INCIBE" } },
        ],
      },
      {
        id: "h2i",
        color: "peach",
        art: "health",
        title: { en: "Drug–food interaction alerts", es: "Alertas medicamento–alimento" },
        badge: { en: "🇪🇺 Erasmus+", es: "🇪🇺 Erasmus+" },
        meta: { en: "Health2Innovation · 2026", es: "Health2Innovation · 2026" },
        oneLiner: {
          en: "Connects the CIMA medicines database with nutritional guidelines to warn about risky medicine–food combinations.",
          es: "Une la base de datos de medicamentos CIMA con pautas nutricionales para avisar de combinaciones de riesgo entre medicamentos y comidas.",
        },
        problem: {
          en: "Some medicines shouldn’t be combined with certain foods, but that information rarely reaches people’s everyday nutrition.",
          es: "Algunos medicamentos no deberían mezclarse con ciertos alimentos, pero esa información rara vez llega a la alimentación del día a día.",
        },
        solution: {
          en: "A project that joins CIMA — the Spanish medicines database (AEMPS) — with the analysis of nutritional guidelines, to warn about using certain medicines together with specific foods.",
          es: "Un proyecto que une CIMA — la base de datos de medicamentos de la AEMPS — con el análisis de pautas nutricionales, para advertir del uso de ciertos medicamentos mezclados con determinadas comidas.",
        },
        role: [
          { en: "Connected the CIMA medicines database", es: "Conecté la base de datos de medicamentos CIMA" },
          { en: "Analysed nutritional guidelines", es: "Analicé pautas nutricionales" },
          { en: "Designed medicine–food warnings", es: "Diseñé los avisos medicamento–alimento" },
          { en: "International Erasmus+ collaboration", es: "Colaboración internacional Erasmus+" },
        ],
        impact: [
          { en: "Goal: safer medication use in daily life", es: "Objetivo: un uso más seguro de los medicamentos en el día a día" },
        ],
        tags: ["Healthtech", "Data", "CIMA"],
        gallery: [],
      },
      {
        id: "health",
        color: "mint",
        title: "AIntegra Health",
        badge: { en: "🏆 1st Prize", es: "🏆 1er premio" },
        meta: { en: "Dedalus Datathon 2025", es: "Dedalus Datathon 2025" },
        oneLiner: {
          en: "Automation platform that centralizes healthcare data workflows — plus a patient app.",
          es: "Plataforma que centraliza y automatiza flujos de datos sanitarios — más una app para pacientes.",
        },
        problem: {
          en: "Spanish healthcare systems rely on fragmented, manual data workflows that create inefficiency, duplication and human error.",
          es: "Los sistemas sanitarios en España dependen de flujos de datos fragmentados y manuales que generan ineficiencias, duplicidades y errores.",
        },
        solution: {
          en: "An automation platform to streamline and centralize healthcare database operations, improving data integrity and clinical workflow support — plus a mobile app for patients.",
          es: "Una plataforma para centralizar y optimizar operaciones de bases de datos sanitarias, mejorando la integridad de los datos y los flujos clínicos — además de una app móvil para pacientes.",
        },
        role: [
          { en: "Conceptualized the solution architecture", es: "Conceptualicé la arquitectura de la solución" },
          { en: "Defined automation workflows", es: "Definí los workflows de automatización" },
          { en: "Designed system logic and data flow", es: "Diseñé la lógica del sistema y el flujo de datos" },
          { en: "Framed the social impact narrative", es: "Construí la narrativa de impacto social" },
        ],
        impact: [
          { en: "Less administrative burden", es: "Menos carga administrativa" },
          { en: "More reliable data", es: "Datos más fiables" },
          { en: "Higher operational efficiency", es: "Más eficiencia operativa" },
        ],
        tags: ["AI", "Healthcare", "Automation"],
        cover: { src: "/img/health-pitch.webp", alt: { en: "Pitching AIntegra Health at the Dedalus Datathon", es: "Presentando AIntegra Health en el Dedalus Datathon" } },
        gallery: [
          { src: "/img/logo-aintegra-health.webp", fit: "contain", alt: { en: "AIntegra Health logo", es: "Logo AIntegra Health" } },
          { src: "/img/health-pitch.webp", alt: { en: "Pitch on stage", es: "Pitch en el escenario" } },
          { src: "/img/health-demo.webp", alt: { en: "Live demo", es: "Demo en directo" } },
          { src: "/img/health-datathon.webp", alt: { en: "Receiving the prize", es: "Recogiendo el premio" } },
          { src: "/img/health-team.webp", alt: { en: "All the teams", es: "Todos los equipos" } },
        ],
      },
      {
        id: "cypherdoc",
        color: "blush",
        title: "CypherDoc",
        badge: { en: "⭐ Finalist", es: "⭐ Finalista" },
        meta: { en: "VDS+ The Challenge 2025", es: "VDS+ The Challenge 2025" },
        oneLiner: {
          en: "Real-time collaborative editor with multi-key security and an AI assistant.",
          es: "Editor colaborativo en tiempo real con seguridad multi-clave y asistente de IA.",
        },
        problem: {
          en: "Most collaborative editors prioritize usability but lack architecture-level security, which is risky for sensitive environments.",
          es: "Muchos editores colaborativos priorizan la usabilidad pero no la seguridad a nivel de arquitectura, un riesgo en entornos sensibles.",
        },
        solution: {
          en: "A secure real-time editor with a multi-key security model and an AI assistant for summaries, sensitive-info detection and redaction.",
          es: "Un editor seguro en tiempo real con modelo de seguridad multi-clave y un asistente IA para resúmenes, detección de información sensible y redacción.",
        },
        role: [
          { en: "Co-designed the product architecture", es: "Co-diseñé la arquitectura del producto" },
          { en: "Defined the multi-key security model", es: "Definí el modelo de seguridad multi-clave" },
          { en: "Designed the UX for secure collaboration", es: "Diseñé la UX para colaboración segura" },
          { en: "Framed it as a SaaS security tool", es: "Lo planteé como SaaS de seguridad" },
        ],
        impact: [
          { en: "Finalist at VDS+ 2025", es: "Finalista en VDS+ 2025" },
          { en: "Privacy-first alternative for sensitive work", es: "Alternativa privacy-first para trabajo sensible" },
        ],
        tags: ["Cybersecurity", "AI", "SaaS"],
        cover: { src: "/img/cypherdoc-finalists.webp", alt: { en: "CypherDoc team on stage as finalists", es: "Equipo de CypherDoc en el escenario como finalistas" } },
        gallery: [
          { src: "/img/logo-cypherdoc.webp", fit: "contain", dark: true, alt: { en: "CypherDoc logo", es: "Logo CypherDoc" } },
          { src: "/img/cypherdoc-finalists.webp", alt: { en: "Finalists on stage", es: "Finalistas en el escenario" } },
          { src: "/img/cypherdoc-awards.webp", alt: { en: "The Challenge awards", es: "Premios The Challenge" } },
          { src: "/img/cypherdoc-team.webp", alt: { en: "The team", es: "El equipo" } },
        ],
      },
    ],
  },

  awards: {
    eyebrow: { en: "Milestones", es: "Hitos" },
    titleStart: { en: "Awards &", es: "Premios y" },
    titleHighlight: { en: "recognition.", es: "reconocimientos." },
    linkedinLabel: { en: "Follow the journey on LinkedIn", es: "Sigue el camino en LinkedIn" },
    lead: {
      en: "Recognition earned by putting ideas — and prototypes — in front of juries.",
      es: "Reconocimientos ganados poniendo ideas — y prototipos — delante de jurados.",
    },
    types: {
      award: { en: "Award", es: "Premio" },
      program: { en: "Programme", es: "Programa" },
      milestone: { en: "Milestone", es: "Hito" },
    },
    stats: {
      awards: { en: "awards & finals", es: "premios y finales" },
      programs: { en: "programmes & milestones", es: "programas e hitos" },
      projects: { en: "projects built", es: "proyectos creados" },
      years: { en: "years building AIntegra", es: "años creando AIntegra" },
    },
    polaroidHint: { en: "tap to shuffle", es: "toca para barajar" },
    photos: [
      { src: "/img/ford-prize.webp", caption: { en: "Ford Smart Mobility · 1st", es: "Ford Smart Mobility · 1º" }, alt: { en: "Nerea and her co-founder holding the Ford Smart Mobility Challenge first prize cheque", es: "Nerea y su cofundador con el cheque del primer premio del Ford Smart Mobility Challenge" } },
      { src: "/img/cyber-demoday-group.webp", caption: { en: "Cyber Demo Day · Best Pitch", es: "Demo Day Cyber · Mejor Pitch" }, alt: { en: "Celebrating the Best Pitch Award at the Cybersecurity Startup Program Demo Day", es: "Celebrando el Premio al Mejor Pitch en el Demo Day del Cybersecurity Startup Program" } },
      { src: "/img/smile-sweden.webp", caption: { en: "SMILE Incubator · Sweden", es: "Incubadora SMILE · Suecia" }, alt: { en: "Nerea with the SMILE Incubator team in Sweden", es: "Nerea con el equipo de la incubadora SMILE en Suecia" } },
      { src: "/img/dedalus-prize.webp", caption: { en: "Dedalus Datathon · 1st", es: "Dedalus Datathon · 1º" }, alt: { en: "Dedalus Datathon prize ceremony", es: "Entrega de premios del Dedalus Datathon" } },
      { src: "/img/etse-prize.webp", caption: { en: "ETSE Preincubator", es: "Preincubadora ETSE" }, alt: { en: "ETSE Preincubator award with UV Emprén", es: "Premio Preincubadora ETSE con UV Emprén" } },
      { src: "/img/vds-stage.webp", caption: { en: "VDS+ finalists", es: "Finalistas VDS+" }, alt: { en: "At the VDS+ event", es: "En el evento VDS+" } },
    ],
    // newest first
    items: [
      { year: "2026", date: { en: "Oct 2026", es: "Oct 2026" }, type: "milestone", title: { en: "Speaker — VDS 2026, Valencia", es: "Ponente — VDS 2026, Valencia" }, text: { en: "Speaking as CEO & Co-Founder of AIntegra at VDS (21–22 Oct 2026, City of Arts and Sciences).", es: "Ponente como CEO y cofundadora de AIntegra en VDS (21–22 oct 2026, Ciudad de las Artes y las Ciencias)." } },
      { year: "2026", date: { en: "15 Oct 2026", es: "15 oct 2026" }, type: "milestone", title: { en: "Speaker — ExpoInnova 2026", es: "Ponente — ExpoInnova 2026" }, text: { en: "Talk at ExpoInnova, Parc Científic de la Universitat de València.", es: "Ponencia en ExpoInnova, Parc Científic de la Universitat de València." } },
      { year: "2026", date: { en: "Sep 2026", es: "Sep 2026" }, type: "milestone", title: { en: "Erasmus for Young Entrepreneurs — XR4Europe, Brussels", es: "Erasmus for Young Entrepreneurs — XR4Europe, Bruselas" }, text: { en: "European mobility working on XR accessibility (EU-funded, coordinated in Spain by AJEV).", es: "Movilidad europea trabajando en accesibilidad XR (financiada por la UE, coordinada en España por AJEV)." } },
      { year: "2026", date: { en: "Jul 2026", es: "Jul 2026" }, type: "milestone", title: { en: "Foro Plaza — Valencia Plaza", es: "Foro Plaza — Valencia Plaza" }, text: { en: "Took part in Foro Plaza, organised by the newspaper Valencia Plaza.", es: "Participación en Foro Plaza, organizado por el periódico Valencia Plaza." } },
      { year: "2026", date: { en: "May 2026", es: "May 2026" }, type: "award", title: { en: "1st Prize — Ford Smart Mobility Challenge", es: "1er premio — Ford Smart Mobility Challenge" }, text: { en: "With AIntegra, by Ford Philanthropy and the University of Valencia (€12,500).", es: "Con AIntegra, de Ford Philanthropy y la Universitat de València (12.500 €)." } },
      { year: "2026", date: { en: "Apr 2026", es: "Abr 2026" }, type: "award", title: { en: "2nd Prize & Best Pitch — Cybersecurity Startup Program", es: "2º premio y Mejor Pitch — Cybersecurity Startup Program" }, text: { en: "By Startup Valencia and INCIBE, with CATY’s cybersecurity at the Demo Day.", es: "De Startup Valencia e INCIBE, con la ciberseguridad de CATY en el Demo Day." } },
      { year: "2026", date: { en: "Feb 2026", es: "Feb 2026" }, type: "program", title: { en: "SMILE Incubator — Sweden", es: "Incubadora SMILE — Suecia" }, text: { en: "Incubation programme at SMILE, Sweden.", es: "Programa de incubación en SMILE, Suecia." } },
      { year: "2026", date: { en: "Jan 2026", es: "Ene 2026" }, type: "program", title: { en: "Selected — IAtecUV accelerator", es: "Seleccionados — Aceleradora IAtecUV" }, text: { en: "University of Valencia Science Park.", es: "Parc Científic de la Universitat de València." } },
      { year: "2026", date: { en: "Jan 2026", es: "Ene 2026" }, type: "program", title: { en: "Selected — Cybersecurity Startup Program", es: "Seleccionados — Cybersecurity Startup Program" }, text: { en: "Startup Valencia × INCIBE.", es: "Startup Valencia × INCIBE." } },
      { year: "2026", date: { en: "Jan 2026", es: "Ene 2026" }, type: "program", title: { en: "Selected — Erasmus+ Health2Innovation", es: "Seleccionados — Erasmus+ Health2Innovation" }, text: { en: "Project: medicine–food interaction alerts using the CIMA database.", es: "Proyecto: alertas de interacción medicamento–alimento con la base de datos CIMA." } },
      { year: "2025", date: { en: "Dec 2025", es: "Dic 2025" }, type: "award", title: { en: "1st Prize — Dedalus Datathon", es: "1er premio — Dedalus Datathon" }, text: { en: "With AIntegra Health: automation for healthcare data.", es: "Con AIntegra Health: automatización de datos sanitarios." } },
      { year: "2025", date: { en: "Nov 2025", es: "Nov 2025" }, type: "award", title: { en: "Finalist — VDS+ The Challenge", es: "Finalista — VDS+ The Challenge" }, text: { en: "With CypherDoc: secure collaborative editor.", es: "Con CypherDoc: editor colaborativo seguro." } },
      { year: "2025", date: { en: "Jul 2025", es: "Jul 2025" }, type: "award", title: { en: "Winner — ETSE-UV Preincubator Award", es: "Ganadores — Premio Preincubadora ETSE-UV" }, text: { en: "University tech entrepreneurship, with AIntegra.", es: "Emprendimiento tecnológico universitario, con AIntegra." } },
      { year: "2024", date: { en: "2024", es: "2024" }, type: "award", title: { en: "3rd Place — MOTIVEM Fest", es: "3er puesto — MOTIVEM Fest" }, text: { en: "Universitat de València, with AIntegra.", es: "Universitat de València, con AIntegra." } },
    ],
  },

  talks: {
    eyebrow: { en: "On stage", es: "En el escenario" },
    titleStart: { en: "Catch me", es: "Encuéntrame" },
    titleHighlight: { en: "on stage.", es: "en el escenario." },
    lead: {
      en: "Talking about accessible technology and AI with founders, companies and the public.",
      es: "Hablando de tecnología accesible e IA con emprendedores, empresas y público general.",
    },
    upcoming: { en: "Upcoming", es: "Próximamente" },
    watch: { en: "Watch the pitch", es: "Ver el pitch" },
    items: [
      {
        id: "vds",
        endDate: "2026-10-22",
        color: "lilac",
        date: { en: "21–22 Oct 2026", es: "21–22 oct 2026" },
        title: "VDS 2026",
        place: { en: "City of Arts and Sciences, Valencia", es: "Ciudad de las Artes y las Ciencias, Valencia" },
        text: {
          en: "Speaker as CEO & Co-Founder of AIntegra at one of Europe’s big tech & startup events — a year after reaching the final there with CypherDoc.",
          es: "Ponente como CEO y cofundadora de AIntegra en uno de los grandes eventos tecnológicos y de startups de Europa — un año después de llegar a la final allí con CypherDoc.",
        },
        image: { src: "/img/vds-2026-speaker.webp", width: 1100, height: 619, alt: { en: "VDS 2026 speaker card: Nerea Panadero Alfonso, CEO & Co-Founder, AIntegra Limited", es: "Cartel de ponente de VDS 2026: Nerea Panadero Alfonso, CEO y cofundadora de AIntegra Limited" } },
      },
      {
        id: "expoinnova",
        endDate: "2026-10-15",
        color: "mint",
        date: { en: "15 Oct 2026", es: "15 oct 2026" },
        day: "15",
        month: { en: "Oct", es: "Oct" },
        title: "ExpoInnova 2026",
        place: { en: "Parc Científic, Universitat de València", es: "Parc Científic de la Universitat de València" },
        text: {
          en: "Talk at ExpoInnova, the innovation showcase of the University of Valencia Science Park.",
          es: "Ponencia en ExpoInnova, el escaparate de innovación del Parc Científic de la Universitat de València.",
        },
      },
      {
        id: "foroplaza",
        endDate: "2026-07-17",
        color: "butter",
        date: { en: "Jul 2026", es: "Jul 2026" },
        title: "Foro Plaza",
        place: { en: "Valencia Plaza newspaper", es: "Periódico Valencia Plaza" },
        text: {
          en: "Took part in Foro Plaza, the forum organised by Valencia Plaza.",
          es: "Participación en Foro Plaza, el foro organizado por Valencia Plaza.",
        },
        image: { src: "/img/foro-plaza.webp", width: 1100, height: 732, alt: { en: "Nerea with the Foro Plaza participants at Valencia Plaza", es: "Nerea con los participantes de Foro Plaza en Valencia Plaza" } },
      },
      {
        id: "demoday",
        endDate: "2026-04-10",
        color: "blush",
        date: { en: "Apr 2026", es: "Abr 2026" },
        title: { en: "Demo Day · Best Pitch", es: "Demo Day · Mejor Pitch" },
        place: { en: "Cybersecurity Startup Program · Startup Valencia × INCIBE", es: "Cybersecurity Startup Program · Startup Valencia × INCIBE" },
        text: {
          en: "Pitched CATY’s cybersecurity and won the Best Pitch Award (plus 2nd Prize).",
          es: "Presenté la ciberseguridad de CATY y ganamos el Premio al Mejor Pitch (y el 2º premio).",
        },
        link: "https://www.instagram.com/p/DW8PLvFghPV/",
        image: { src: "/img/cyber-demoday-duo.webp", width: 720, height: 960, alt: { en: "Nerea and her co-founder at the Demo Day", es: "Nerea y su cofundador en el Demo Day" } },
      },
    ],
  },

  skills: {
    eyebrow: { en: "Toolbox", es: "Caja de herramientas" },
    title: { en: "What I work with", es: "Con qué trabajo" },
    groups: [
      { icon: "brain", color: "lilac", title: { en: "AI & Development", es: "IA y desarrollo" }, items: { en: ["Python", "Multi-agent systems", "Multimodal AI", "Local / on-device AI", "LLMs"], es: ["Python", "Sistemas multiagente", "IA multimodal", "IA en local", "LLMs"] } },
      { icon: "glasses", color: "mint", title: { en: "XR & Accessibility", es: "XR y accesibilidad" }, items: { en: ["XR / VR accessibility", "Inclusive design", "Human-centered tech", "Validation with NGOs"], es: ["Accesibilidad XR / VR", "Diseño inclusivo", "Tecnología centrada en personas", "Validación con ONGs"] } },
      { icon: "code", color: "sky", title: { en: "Software", es: "Software" }, items: { en: ["Java", "C++", "MATLAB", "BigQuery", "Testing & CI", "React"], es: ["Java", "C++", "MATLAB", "BigQuery", "Testing e IC", "React"] } },
      { icon: "cpu", color: "peach", title: { en: "Hardware", es: "Hardware" }, items: { en: ["Prototyping", "Development", "Validation", "Smart trackpads"], es: ["Prototipado", "Desarrollo", "Validación", "Trackpads inteligentes"] } },
      { icon: "shield", color: "butter", title: { en: "Innovation & Security", es: "Innovación y seguridad" }, items: { en: ["Privacy by design", "Accessible security", "Emerging tech", "Digital transformation"], es: ["Privacidad por diseño", "Seguridad accesible", "Tecnologías emergentes", "Transformación digital"] } },
      { icon: "users", color: "blush", title: { en: "Leadership", es: "Liderazgo" }, items: { en: ["Team coordination", "Public speaking", "Pitching", "Partnerships"], es: ["Coordinación de equipos", "Hablar en público", "Pitching", "Alianzas"] } },
    ],
  },

  partners: {
    title: { en: "Worked, competed & grew with", es: "He trabajado, competido y crecido con" },
    logos: [
      { name: "Ford", src: "/img/p-ford.webp", url: "https://www.ford.es/" },
      { name: "XR4Europe", url: "https://xr4europe.eu/" },
      { name: "INCIBE", src: "/img/p-incibe.webp", url: "https://www.incibe.es/" },
      { name: "IAtecUV", src: "/img/p-iatec.webp", dark: true, url: "https://www.uv.es/iatecuv/ca/iatecuv.html" },
      { name: "Startup Valencia", src: "/img/p-startupvalencia.webp", url: "https://www.startupvalencia.org/" },
      { name: "Dedalus", src: "/img/p-dedalus.webp", url: "https://www.dedalus.com/spain/es/" },
      { name: "UV Emprén", src: "/img/p-uvempren.webp", dark: true, url: "https://www.uv.es/uv-empren/ca/startups.html" },
      { name: "VDS+", src: "/img/p-vds.webp", dark: true, url: "https://vds.tech/" },
      { name: "EOI", src: "/img/p-eoi.webp", url: "https://www.eoi.es/es" },
      { name: "SMILE Incubator" },
      { name: "AJEV", src: "/img/p-ajev.webp", dark: true, url: "https://ajevalencia.org/" },
    ],
  },

  contact: {
    eyebrow: { en: "Let’s connect", es: "Conectemos" },
    titleStart: { en: "Let’s build something", es: "Construyamos algo" },
    titleHighlight: { en: "accessible", es: "accesible" },
    titleEnd: { en: "together.", es: "juntos." },
    lead: {
      en: "Hiring for accessibility, AI or emerging tech? Organising a talk? Want to try CAT or CATY? My inbox is open.",
      es: "¿Buscas perfil en accesibilidad, IA o tecnologías emergentes? ¿Organizas una charla? ¿Quieres probar CAT o CATY? Escríbeme.",
    },
    location: { en: "Valencia, Spain · currently in Brussels", es: "Valencia, España · ahora en Bruselas" },
    copyEmail: { en: "Copy email", es: "Copiar email" },
    copied: { en: "Copied!", es: "¡Copiado!" },
    form: {
      title: { en: "Write your message", es: "Escribe tu mensaje" },
      intro: {
        en: "This site doesn’t collect or store your data. Fill this in and I’ll prepare the email — you send it from Gmail or your own email app.",
        es: "Esta web no recoge ni guarda tus datos. Rellena esto y preparo el correo — lo envías tú desde Gmail o tu aplicación de correo.",
      },
      name: { en: "Your name", es: "Tu nombre" },
      company: { en: "Company (optional)", es: "Empresa (opcional)" },
      topic: { en: "Reason", es: "Motivo" },
      topics: [
        { en: "Job opportunity", es: "Oportunidad laboral" },
        { en: "Collaboration", es: "Colaboración" },
        { en: "Talk or event", es: "Charla o evento" },
        { en: "Something else", es: "Otra cosa" },
      ],
      message: { en: "Message", es: "Mensaje" },
      namePh: { en: "Jane Doe", es: "Ana García" },
      companyPh: { en: "Company or organisation", es: "Empresa u organización" },
      messagePh: { en: "Tell me about the role, project or idea…", es: "Cuéntame sobre el puesto, proyecto o idea…" },
      gmail: { en: "Open in Gmail", es: "Abrir en Gmail" },
      mailApp: { en: "Open in my email app", es: "Abrir en mi app de correo" },
      copy: { en: "Copy text", es: "Copiar texto" },
      copied: { en: "Copied! Paste it into an email to", es: "¡Copiado! Pégalo en un correo a" },
      opened: { en: "Your email is ready — just press send ✉️", es: "Tu correo está listo — solo tienes que darle a enviar ✉️" },
      greeting: { en: "Hi Nerea,", es: "Hola Nerea:" },
      signoff: { en: "Best,", es: "Un saludo," },
      subjectPrefix: { en: "Portfolio", es: "Portfolio" },
    },
  },

  footer: {
    madeWith: {
      en: "Designed & built by Nerea — with keyboard, screen-reader and zoom users in mind.",
      es: "Diseñado y construido por Nerea — pensando en quien navega con teclado, lector de pantalla o zoom.",
    },
    shortcut: { en: "Alt + A opens the accessibility panel", es: "Alt + A abre el panel de accesibilidad" },
  },
};

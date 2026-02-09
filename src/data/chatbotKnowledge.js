import { portfolio } from './portfolio';

/**
 * Chatbot Knowledge Base
 * This file contains structured information about Nerea for the AI chatbot
 */

export const chatbotKnowledge = {
  // Basic Information
  name: "Nerea Panadero Alfonso",
  role: {
    en: "Entrepreneur, Startup Founder, Product Lead",
    es: "Emprendedora, Fundadora de Startup, Product Lead"
  },
  
  // Core expertise
  expertise: {
    en: [
      "Product Strategy & UX",
      "Inclusive Technology",
      "Accessibility",
      "Cognitive Support Systems",
      "AI Integration",
      "Healthcare Tech",
      "Cybersecurity"
    ],
    es: [
      "Estrategia de Producto y UX",
      "Tecnología Inclusiva",
      "Accesibilidad",
      "Sistemas de Apoyo Cognitivo",
      "Integración de IA",
      "Tecnología Sanitaria",
      "Ciberseguridad"
    ]
  },

  // Main company
  company: {
    name: "AIntegra Limited",
    role: {
      en: "Co-Founder & Product Lead",
      es: "Co-fundadora y Product Lead"
    },
    description: {
      en: "Building inclusive, human-centered technology to improve accessibility and cognitive support in digital environments",
      es: "Creando tecnología inclusiva y centrada en las personas para mejorar la accesibilidad y el apoyo cognitivo en entornos digitales"
    },
    website: "https://aintegralimited.com"
  },

  // Projects
  projects: [
    {
      name: "AIntegra Limited",
      type: "Main Project",
      description: {
        en: "Inclusive technology platform for accessibility and cognitive support",
        es: "Plataforma de tecnología inclusiva para accesibilidad y apoyo cognitivo"
      },
      role: {
        en: "Co-Founder & Product Lead - defining product vision, UX strategy, and coordinating development",
        es: "Co-fundadora y Product Lead - definiendo visión de producto, estrategia UX y coordinando desarrollo"
      },
      tags: ["Inclusive Tech", "Accessibility", "Cognitive Support", "Product", "UX"]
    },
    {
      name: "AIntegra Health",
      type: "Healthcare Automation",
      description: {
        en: "Healthcare database automation platform that won 1st prize at Dedalus Datathon 2025",
        es: "Plataforma de automatización de bases de datos sanitarias que ganó el 1er premio en Dedalus Datathon 2025"
      },
      achievement: {
        en: "Winner - Dedalus Datathon 2025",
        es: "Ganadora - Dedalus Datathon 2025"
      },
      tags: ["AI", "Healthcare", "Automation"]
    },
    {
      name: "CipherDoc AI",
      type: "Cybersecurity",
      description: {
        en: "Secure real-time collaborative editor with multi-key security model and AI assistant",
        es: "Editor colaborativo seguro en tiempo real con modelo de seguridad multi-clave y asistente IA"
      },
      achievement: {
        en: "Finalist - VDS The Challenge 2025",
        es: "Finalista - VDS The Challenge 2025"
      },
      tags: ["Cybersecurity", "AI", "SaaS"]
    },
    {
      name: "AIntegra Security System",
      type: "Security Architecture",
      description: {
        en: "Privacy-by-design security architecture for AIntegra platform",
        es: "Arquitectura de seguridad con privacidad por diseño para la plataforma AIntegra"
      },
      program: {
        en: "Startup Valencia - Cybersecurity Startup Program",
        es: "Startup Valencia - Programa de Ciberseguridad"
      },
      tags: ["Security", "Privacy", "Architecture"]
    }
  ],

  // Achievements
  achievements: [
    {
      date: "2023",
      title: {
        en: "3rd Place - Motivem Fest (AIntegra)",
        es: "3er puesto - Motivem Fest (AIntegra)"
      }
    },
    {
      date: "July 2025",
      title: {
        en: "Winner - ETSE Pre-Incubator (AIntegra)",
        es: "Ganadores - Preincubadora ETSE (AIntegra)"
      }
    },
    {
      date: "November 2025",
      title: {
        en: "Finalist - VDS The Challenge (CipherDoc)",
        es: "Finalista - VDS The Challenge (CipherDoc)"
      }
    },
    {
      date: "December 2025",
      title: {
        en: "1st Prize - Dedalus Datathon (AIntegra Health)",
        es: "1er premio - Dedalus Datathon (AIntegra Health)"
      }
    },
    {
      date: "January 2026",
      title: {
        en: "Selected - IAtecUV Incubator & Cybersecurity Program & Health2Innovation",
        es: "Seleccionados - Incubadora IAtecUV & Programa de Ciberseguridad & Health2Innovation"
      }
    }
  ],

  // Working style
  workingStyle: {
    en: [
      "Start with the user: constraints, context, and emotional friction",
      "Turn insights into a roadmap: priorities, trade-offs, MVP",
      "Ship, learn, iterate: measurable progress over perfection"
    ],
    es: [
      "Empiezo por el usuario: restricciones, contexto y fricción emocional",
      "Convierto insights en roadmap: prioridades, trade-offs, MVP",
      "Entrego, aprendo, itero: progreso medible antes que perfección"
    ]
  },

  // Current focus
  currentFocus: {
    en: [
      "Co-building AIntegra: product direction, UX and early development coordination",
      "Designing for accessibility + cognitive support in digital environments",
      "Strengthening narrative + positioning for international growth"
    ],
    es: [
      "Co-construyendo AIntegra: dirección de producto, UX y coordinación del desarrollo temprano",
      "Diseñando para accesibilidad + apoyo cognitivo en entornos digitales",
      "Fortaleciendo narrativa + posicionamiento para expansión internacional"
    ]
  },

  // Contact
  contact: {
    email: "nerepanaifo@gmail.com",
    linkedin: "https://www.linkedin.com/in/nerea-panadero-alfonso/"
  },

  // Suggested questions for users
  suggestedQuestions: {
    en: [
      "What projects have you worked on?",
      "Tell me about AIntegra",
      "What are your main achievements?",
      "What's your approach to product development?",
      "How can I contact you?"
    ],
    es: [
      "¿En qué proyectos has trabajado?",
      "Cuéntame sobre AIntegra",
      "¿Cuáles son tus principales logros?",
      "¿Cuál es tu enfoque en desarrollo de producto?",
      "¿Cómo puedo contactarte?"
    ]
  }
};

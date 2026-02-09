import { chatbotKnowledge } from '../data/chatbotKnowledge';

/**
 * Chatbot AI Engine
 * Processes user questions and generates context-aware responses
 */

// Detect language from user input
export function detectLanguage(text) {
    const spanishWords = ['qué', 'cuál', 'cómo', 'dónde', 'cuándo', 'por', 'sobre', 'hola', 'gracias', 'cuéntame', 'háblame'];
    const textLower = text.toLowerCase();

    const hasSpanish = spanishWords.some(word => textLower.includes(word));
    return hasSpanish ? 'es' : 'en';
}

// Pattern matching for different question types
const patterns = {
    greeting: {
        en: /^(hi|hello|hey|good morning|good afternoon)/i,
        es: /^(hola|buenos días|buenas tardes|hey)/i
    },
    projects: {
        en: /(project|work|built|created|develop)/i,
        es: /(proyecto|trabajo|construido|creado|desarrollado)/i
    },
    aintegra: {
        en: /(aintegra|main project|company|startup)/i,
        es: /(aintegra|proyecto principal|empresa|startup)/i
    },
    achievements: {
        en: /(achievement|award|prize|recognition|win|won)/i,
        es: /(logro|premio|reconocimiento|ganar|ganado)/i
    },
    experience: {
        en: /(experience|background|expertise|skill)/i,
        es: /(experiencia|trayectoria|expertise|habilidad)/i
    },
    workingStyle: {
        en: /(how.*work|approach|methodology|process)/i,
        es: /(cómo.*trabaja|enfoque|metodología|proceso)/i
    },
    contact: {
        en: /(contact|email|reach|connect|linkedin)/i,
        es: /(contacto|email|contactar|conectar|linkedin)/i
    },
    currentFocus: {
        en: /(current|now|doing|working on|focus)/i,
        es: /(actual|ahora|haciendo|trabajando en|enfoque)/i
    },
    about: {
        en: /(who are you|about you|tell me about)/i,
        es: /(quién eres|sobre ti|cuéntame sobre)/i
    }
};

// Generate response based on detected intent
export function generateResponse(userMessage) {
    const lang = detectLanguage(userMessage);
    const messageLower = userMessage.toLowerCase();

    // Greeting
    if (patterns.greeting[lang].test(messageLower)) {
        return {
            text: lang === 'es'
                ? '¡Hola! 👋 Soy el asistente virtual de Nerea. Puedo contarte sobre sus proyectos, experiencia, logros y más. ¿Qué te gustaría saber?'
                : 'Hi! 👋 I\'m Nerea\'s virtual assistant. I can tell you about her projects, experience, achievements and more. What would you like to know?',
            lang
        };
    }

    // About Nerea
    if (patterns.about[lang].test(messageLower)) {
        return {
            text: lang === 'es'
                ? `${chatbotKnowledge.name} es ${chatbotKnowledge.role.es}. Se especializa en tecnología inclusiva y accesibilidad, trabajando en la intersección de producto, UX e IA. Es co-fundadora de AIntegra Limited, donde construye tecnología centrada en las personas para mejorar la accesibilidad y el apoyo cognitivo en entornos digitales.`
                : `${chatbotKnowledge.name} is an ${chatbotKnowledge.role.en}. She specializes in inclusive technology and accessibility, working at the intersection of product, UX and AI. She's co-founder of AIntegra Limited, where she builds human-centered technology to improve accessibility and cognitive support in digital environments.`,
            lang
        };
    }

    // Projects
    if (patterns.projects[lang].test(messageLower)) {
        const projectList = chatbotKnowledge.projects.map((p, i) =>
            `\n${i + 1}. **${p.name}** - ${p.description[lang]}`
        ).join('');

        return {
            text: lang === 'es'
                ? `Nerea ha trabajado en varios proyectos innovadores:${projectList}\n\n¿Te gustaría saber más sobre alguno en particular?`
                : `Nerea has worked on several innovative projects:${projectList}\n\nWould you like to know more about any specific one?`,
            lang
        };
    }

    // AIntegra
    if (patterns.aintegra[lang].test(messageLower)) {
        return {
            text: lang === 'es'
                ? `**AIntegra Limited** es el proyecto principal de Nerea.\n\n📍 **Rol**: ${chatbotKnowledge.company.role.es}\n\n💡 **Misión**: ${chatbotKnowledge.company.description.es}\n\nAIntegra está diseñada para empoderar a personas a menudo excluidas de sistemas digitales, mejorando la accesibilidad y apoyando la diversidad cognitiva.\n\n🌐 Más info: ${chatbotKnowledge.company.website}`
                : `**AIntegra Limited** is Nerea's main project.\n\n📍 **Role**: ${chatbotKnowledge.company.role.en}\n\n💡 **Mission**: ${chatbotKnowledge.company.description.en}\n\nAIntegra is designed to empower people often excluded from digital systems, improving accessibility and supporting cognitive diversity.\n\n🌐 More info: ${chatbotKnowledge.company.website}`,
            lang
        };
    }

    // Achievements
    if (patterns.achievements[lang].test(messageLower)) {
        const recentAchievements = chatbotKnowledge.achievements.slice(-4).reverse();
        const achievementList = recentAchievements.map(a =>
            `\n🏆 **${a.date}**: ${a.title[lang]}`
        ).join('');

        return {
            text: lang === 'es'
                ? `Algunos de los logros más recientes de Nerea:${achievementList}\n\nEstos reconocimientos reflejan su trabajo en tecnología inclusiva, salud e innovación.`
                : `Some of Nerea's recent achievements:${achievementList}\n\nThese recognitions reflect her work in inclusive technology, healthcare and innovation.`,
            lang
        };
    }

    // Experience/Expertise
    if (patterns.experience[lang].test(messageLower)) {
        const expertiseList = chatbotKnowledge.expertise[lang].join('\n• ');
        return {
            text: lang === 'es'
                ? `Nerea tiene experiencia en:\n\n• ${expertiseList}\n\nSu fortaleza principal está en **Producto + UX**, con un enfoque especial en **Accesibilidad** y **Tecnología Inclusiva**.`
                : `Nerea has expertise in:\n\n• ${expertiseList}\n\nHer main strength is **Product + UX**, with a special focus on **Accessibility** and **Inclusive Technology**.`,
            lang
        };
    }

    // Working Style
    if (patterns.workingStyle[lang].test(messageLower)) {
        const styleList = chatbotKnowledge.workingStyle[lang].map((s, i) => `${i + 1}. ${s}`).join('\n');
        return {
            text: lang === 'es'
                ? `El enfoque de trabajo de Nerea:\n\n${styleList}\n\nSu filosofía: "Progreso medible antes que perfección."`
                : `Nerea's working approach:\n\n${styleList}\n\nHer philosophy: "Measurable progress over perfection."`,
            lang
        };
    }

    // Current Focus
    if (patterns.currentFocus[lang].test(messageLower)) {
        const focusList = chatbotKnowledge.currentFocus[lang].map((f, i) => `${i + 1}. ${f}`).join('\n');
        return {
            text: lang === 'es'
                ? `Actualmente Nerea está:\n\n${focusList}`
                : `Currently Nerea is:\n\n${focusList}`,
            lang
        };
    }

    // Contact
    if (patterns.contact[lang].test(messageLower)) {
        return {
            text: lang === 'es'
                ? `Puedes contactar a Nerea:\n\n📧 **Email**: ${chatbotKnowledge.contact.email}\n💼 **LinkedIn**: ${chatbotKnowledge.contact.linkedin}\n\n¡Le encantaría hablar sobre IA, producto o tecnología inclusiva!`
                : `You can contact Nerea:\n\n📧 **Email**: ${chatbotKnowledge.contact.email}\n💼 **LinkedIn**: ${chatbotKnowledge.contact.linkedin}\n\nShe'd love to talk about AI, product or inclusive technology!`,
            lang
        };
    }

    // Default response
    return {
        text: lang === 'es'
            ? 'Interesante pregunta. Puedes preguntarme sobre:\n• Proyectos de Nerea\n• Sus logros y reconocimientos\n• Experiencia y expertise\n• Cómo contactarla\n\n¿Qué te gustaría saber?'
            : 'Interesting question. You can ask me about:\n• Nerea\'s projects\n• Her achievements and recognition\n• Experience and expertise\n• How to contact her\n\nWhat would you like to know?',
        lang
    };
}

// Get suggested questions based on language
export function getSuggestedQuestions(lang = 'en') {
    return chatbotKnowledge.suggestedQuestions[lang];
}

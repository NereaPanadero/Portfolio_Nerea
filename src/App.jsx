import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatLauncher from "./components/chat/ChatLauncher";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import About from "./sections/About";
import Experience from "./sections/Experience";
import AIntegra from "./sections/AIntegra";
import Projects from "./sections/Projects";
import Awards from "./sections/Awards";
import Talks from "./sections/Talks";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import { useA11y } from "./context/A11yContext";
import { useLanguage } from "./context/LanguageContext";
import { portfolio } from "./data/portfolio";
import { t } from "./utils/t";

// Loaded only when someone opens / enables them
const A11yPanel = lazy(() => import("./components/a11y/A11yPanel"));
const ReadingGuide = lazy(() => import("./components/a11y/ReadingGuide"));

export default function App() {
  const { lang } = useLanguage();
  const { panelOpen, settings } = useA11y();

  return (
    <>
      <a href="#main" className="skip-link">
        {t(portfolio.ui.skip, lang)}
      </a>
      <Navbar />

      <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <AIntegra />
        <Projects />
        <Awards />
        <Talks />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <ChatLauncher />

      <Suspense fallback={null}>
        {panelOpen ? <A11yPanel /> : null}
        {settings.readingGuide ? <ReadingGuide /> : null}
      </Suspense>
    </>
  );
}

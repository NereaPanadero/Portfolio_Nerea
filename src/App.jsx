import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import AIntegra from "./sections/AIntegra";
import Projects from "./sections/Projects";
import Impact from "./sections/Impact";
import Achievements from "./sections/Achievements";
import Partners from "./sections/Partners";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="min-h-dvh text-ink relative overflow-x-hidden">
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <AIntegra />
        <Projects />
        <Impact />
        <Achievements />
        <Partners />
        <Contact />
      </main>

      <Footer />

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}

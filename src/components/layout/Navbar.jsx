import { useEffect, useState } from "react";
import Container from "./Container";
import { useLanguage } from "../../context/LanguageContext";
import { portfolio } from "../../data/portfolio";
import { t } from "../../utils/t";

const links = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "aintegra", key: "aintegra" },
  { id: "projects", key: "projects" },
  { id: "impact", key: "impact" },
  { id: "achievements", key: "achievements" },
  { id: "partners", key: "partners" },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLanguage();

  useEffect(() => {
    const ids = links.map((l) => l.id);
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { threshold: 0.35 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function go(id) {
    scrollToId(id);
    setOpen(false);
  }

  return (
    <header className="navbar">
      <Container className="navbar__inner">
        {/* Left: Logo + name */}
        <button
          type="button"
          onClick={() => go("home")}
          className="navbar__brand"
          aria-label="Go to Home"
        >
          <img
            src="/images/logos/nep.png"
            alt="Nerea Panadero logo"
            className="navbar__logo"
          />
          <span className="navbar__name">Nerea Panadero Alfonso</span>
        </button>

        {/* Desktop links */}
        <nav className="navbar__links">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className={`navbar__link ${isActive ? "is-active" : ""}`}
              >
                {t(portfolio.nav[l.key], lang)}
              </button>
            );
          })}
        </nav>

        {/* Right: lang + CTA + hamburger */}
        <div className="navbar__actions">
          <button
            type="button"
            onClick={toggle}
            className="navbar__lang"
            aria-label="Toggle language"
            title={lang === "en" ? "Cambiar a Español" : "Switch to English"}
          >
            {lang === "en" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            onClick={() => go("contact")}
            className="navbar__cta"
          >
            {t(portfolio.nav.contact, lang)}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="navbar__burger"
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="navbar__mobile">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => go(l.id)}
                  className={`navbar__mLink ${isActive ? "is-active" : ""}`}
                >
                  {t(portfolio.nav[l.key], lang)}
                </button>
              );
            })}
            <button type="button" onClick={() => go("contact")} className="navbar__mCTA">
              {t(portfolio.nav.contact, lang)}
            </button>
          </div>
        )}
      </Container>
    </header>
  );
}

import { useEffect, useState } from "react";
import { Accessibility, Menu, X } from "lucide-react";
import NPLogo from "../brand/NPLogo";
import { useLanguage } from "../../context/LanguageContext";
import { useA11y } from "../../context/A11yContext";
import { portfolio } from "../../data/portfolio";
import { t } from "../../utils/t";

function LangSwitch({ lang, setLang, label }) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full border-2 border-ink bg-paper p-0.5 text-xs font-extrabold">
      {["es", "en"].map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1.5 uppercase transition ${lang === l ? "bg-ink text-paper" : "text-ink/70 hover:text-ink"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { setPanelOpen, changedCount } = useA11y();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ui = portfolio.ui;

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...portfolio.nav.map((n) => n.id), "skills", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        aria-label={lang === "en" ? "Main" : "Principal"}
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border-2 border-ink bg-surface/95 py-2 pl-2 pr-2 backdrop-blur transition-shadow ${scrolled ? "shadow-[4px_4px_0_rgb(var(--shadow))]" : ""}`}
      >
        <a href="#top" className="flex items-center gap-2 rounded-full pr-2" aria-label="Nerea Panadero — inicio / home">
          <NPLogo className="h-10 w-10" />
          <span className="hidden text-lg font-extrabold tracking-tight sm:inline">
            Nerea<span className="serif text-accent"> Panadero</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {portfolio.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-bold transition ${active === item.id ? "bg-lilac text-ink" : "text-ink/75 hover:bg-ink/5 hover:text-ink"}`}
              >
                {t(item.label, lang)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            aria-label={t(ui.a11y, lang)}
            title={`${t(ui.a11y, lang)} (Alt + A)`}
            className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-butter transition hover:-translate-y-0.5"
          >
            <Accessibility className="h-5 w-5" aria-hidden="true" />
            {changedCount > 0 ? <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-surface bg-accent" aria-hidden="true" /> : null}
          </button>
          <div className="hidden sm:block">
            <LangSwitch lang={lang} setLang={setLang} label={t(ui.language, lang)} />
          </div>
          <a href="#contact" className="btn btn-primary hidden !px-4 !py-2.5 text-sm md:inline-flex">
            {t(ui.letsTalk, lang)}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t(ui.closeMenu, lang) : t(ui.menu, lang)}
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="card mx-auto mt-2 max-w-6xl p-3 lg:hidden">
          <ul className="grid gap-1">
            {[...portfolio.nav, { id: "contact", label: portfolio.ui.letsTalk }].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-lg font-bold hover:bg-lilac"
                >
                  {t(item.label, lang)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t-2 border-ink/10 px-2 pt-3 sm:hidden">
            <span className="text-sm font-bold text-ink/70">{t(ui.language, lang)}</span>
            <LangSwitch lang={lang} setLang={setLang} label={t(ui.language, lang)} />
          </div>
        </div>
      )}
    </header>
  );
}

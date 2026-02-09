import Container from "./Container";
import { useLanguage } from "../../context/LanguageContext";
import { portfolio } from "../../data/portfolio";
import { t } from "../../utils/t";

export default function Footer() {
  const { lang } = useLanguage();
  const cvUrl = portfolio.hero?.cvUrl?.[lang] || portfolio.hero?.cvUrl?.en || null;

  return (
    <footer className="border-t border-ink/10 bg-paper/60 backdrop-blur">
      <Container className="py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink/60">
            © {new Date().getFullYear()} Nerea Panadero. Built with React + Tailwind.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-xs font-medium text-ink/80 shadow-soft hover:-translate-y-0.5 transition"
              >
                {t(portfolio.hero.ctaCV, lang)}
              </a>
            )}

            <span className="text-sm text-ink/60">Pastel • Elegant • Tech</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

import { Linkedin, Mail, Download } from "lucide-react";
import Container from "./Container";
import NPLogo from "../brand/NPLogo";
import Braille from "../brand/Braille";
import { useLanguage } from "../../context/LanguageContext";
import { portfolio } from "../../data/portfolio";
import { t } from "../../utils/t";
import { assetUrl } from "../../utils/assetUrl";

export default function Footer() {
  const { lang } = useLanguage();
  const p = portfolio.person;
  const f = portfolio.footer;

  return (
    <footer className="keep-colors mt-10 bg-ink text-paper">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <NPLogo className="h-14 w-14" />
            <div>
              <p className="text-xl font-extrabold">Nerea Panadero Alfonso</p>
              <Braille label={t(portfolio.ui.brailleTitle, lang)} className="mt-2 h-4 w-auto text-butter" dot={4} />
            </div>
          </div>

          <ul className="flex flex-wrap gap-2">
            <li>
              <a href={`mailto:${p.email}`} className="inline-flex items-center gap-2 rounded-full border-2 border-paper/30 px-4 py-2 text-sm font-bold hover:border-butter hover:text-butter">
                <Mail className="h-4 w-4" aria-hidden="true" /> Email
              </a>
            </li>
            <li>
              <a href={p.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-paper/30 px-4 py-2 text-sm font-bold hover:border-butter hover:text-butter">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={assetUrl(p.cvUrl[lang])} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-paper/30 px-4 py-2 text-sm font-bold hover:border-butter hover:text-butter">
                <Download className="h-4 w-4" aria-hidden="true" /> {t(portfolio.ui.downloadCV, lang)}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/15 pt-6 text-sm text-paper/75 md:flex-row md:justify-between">
          <p>{t(f.madeWith, lang)}</p>
          <p>
            <kbd className="rounded-md border border-paper/30 px-1.5 py-0.5 font-sans text-xs">Alt</kbd> +{" "}
            <kbd className="rounded-md border border-paper/30 px-1.5 py-0.5 font-sans text-xs">A</kbd> · {t(f.shortcut, lang).replace(/^Alt \+ A /, "")} · © {new Date().getFullYear()}
          </p>
        </div>
      </Container>
    </footer>
  );
}

import { ArrowRight, Download, Sparkles } from "lucide-react";
import Container from "../components/layout/Container";
import Img from "../components/ui/Img";
import NPLogo from "../components/brand/NPLogo";
import Braille from "../components/brand/Braille";
import Scribble from "../components/brand/Scribble";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";
import { assetUrl } from "../utils/assetUrl";
import { openChat } from "../utils/events";

export default function Hero() {
  const { lang } = useLanguage();
  const h = portfolio.hero;
  const ui = portfolio.ui;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
      {/* Brand watermark: NP monogram */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dots-bg absolute inset-0 [mask-image:radial-gradient(70%_60%_at_30%_40%,#000,transparent)]" />
        <NPLogo soft className="np-watermark absolute -right-[18rem] -top-24 h-[46rem] w-[46rem] opacity-70 sm:-right-40 lg:-right-24 lg:top-6" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <div className="hero-rise">
              <p className="sticker !bg-mint !text-[0.8rem] sm:!text-sm">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-go opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-go" />
                </span>
                {t(h.openToWork, lang)}
              </p>
            </div>

            <div style={{ "--d": "0.05s" }} className="hero-rise">
              <p className="mt-7 flex items-center gap-3 text-2xl text-ink/80 sm:text-3xl">
                <span className="serif">{t(h.hello, lang)}</span>
              </p>
              <h1 id="hero-title" className="mt-2 text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.6rem]">
                {t(h.titleStart, lang)}{" "}
                <Scribble>
                  <span className="serif font-normal text-accent">{t(h.titleHighlight, lang)}</span>
                </Scribble>
              </h1>
            </div>

            <p style={{ "--d": "0.1s" }} className="hero-rise lead mt-7 !text-[1.15rem]">
              {t(h.sub, lang)}
            </p>

            <div style={{ "--d": "0.15s" }} className="hero-rise mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn btn-primary">
                {t(ui.letsTalk, lang)} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={assetUrl(portfolio.person.cvUrl[lang])} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Download className="h-4 w-4" aria-hidden="true" /> {t(ui.downloadCV, lang)}
              </a>
              <button type="button" onClick={() => openChat()} className="btn btn-sun">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> {t(ui.askAI, lang)}
              </button>
            </div>

            <div style={{ "--d": "0.2s" }} className="hero-rise mt-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink/60">{t(h.proofLabel, lang)}</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-lg font-extrabold tracking-tight text-ink/80">
                {h.proof.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo collage */}
          <div style={{ "--d": "0.1s" }} className="hero-rise relative mx-auto w-full max-w-[26rem]">
            <div aria-hidden="true" className="absolute -left-5 top-8 h-[88%] w-full rounded-t-full rounded-b-4xl border-2 border-ink bg-lilac" />
            <div className="relative overflow-hidden rounded-t-full rounded-b-4xl border-2 border-ink bg-blush" style={{ boxShadow: "8px 8px 0 rgb(var(--shadow))" }}>
              <Img
                src={h.photo.src}
                alt={t(h.photo.alt, lang)}
                width={h.photo.width}
                height={h.photo.height}
                eager
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <p className="sticker absolute -left-4 top-[12%] animate-floaty !bg-butter sm:-left-12" style={{ "--r": "-7deg" }}>
              <span aria-hidden="true">🏆</span> {t(h.stickers.award, lang)}
            </p>
            <p className="sticker absolute -right-2 top-[46%] animate-floaty !bg-sky [animation-delay:1.2s] sm:-right-10" style={{ "--r": "5deg" }}>
              <span aria-hidden="true">🎤</span> {t(h.stickers.role, lang)}
            </p>
            <div className="sticker absolute -bottom-5 left-4 !gap-3 !bg-surface !py-2 sm:left-8" style={{ transform: "rotate(-3deg)" }}>
              <Braille label={t(ui.brailleTitle, lang)} className="h-5 w-auto text-ink" dot={4.5} />
              <span className="text-xs font-bold text-ink/70">← {lang === "en" ? "my name in Braille" : "mi nombre en braille"}</span>
            </div>
            <p className="sticker absolute -right-3 bottom-[14%] !bg-mint text-xs sm:-right-6" style={{ transform: "rotate(-4deg)" }}>
              <span aria-hidden="true">📍</span> {t(h.stickers.now, lang)}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

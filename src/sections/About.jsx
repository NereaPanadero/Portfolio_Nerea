import { Briefcase, Code2, Mic, Globe2, Sparkles } from "lucide-react";
import Container from "../components/layout/Container";
import Heading from "../components/ui/Heading";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";

const BG = { mint: "bg-mint", blush: "bg-blush", sky: "bg-sky", lilac: "bg-lilac", butter: "bg-butter", peach: "bg-peach" };
const ICONS = [Code2, Mic, Globe2];

export default function About() {
  const { lang } = useLanguage();
  const a = portfolio.about;
  const awardsCount = portfolio.awards.items.filter((i) => i.type === "award").length;

  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-28">
      <Container>
        <Heading id="about-title" eyebrow={t(a.eyebrow, lang)} start={t(a.titleStart, lang)} highlight={t(a.titleHighlight, lang)} />

        <div className="mt-12 grid gap-5 md:grid-cols-6 lg:grid-cols-12">
          {/* Bio */}
          <Reveal className="card flex flex-col justify-between bg-lilac p-7 md:col-span-6 lg:col-span-7 sm:p-9">
            <p className="text-lg leading-relaxed text-ink/85 sm:text-xl">{t(a.bio, lang)}</p>
            <blockquote className="mt-8 border-l-4 border-ink pl-5">
              <p className="serif text-3xl leading-tight text-ink sm:text-4xl">“{t(a.quote, lang)}”</p>
            </blockquote>
          </Reveal>

          {/* Photo */}
          <Reveal delay={0.05} className="card overflow-hidden md:col-span-6 lg:col-span-5">
            <Img src={a.photo.src} alt={t(a.photo.alt, lang)} width={a.photo.width} height={a.photo.height} className="h-full min-h-[18rem] w-full object-cover" />
            <p className="sticker absolute bottom-4 left-4 !bg-butter serif !text-lg !font-normal" style={{ transform: "rotate(-3deg)" }}>
              {t(a.photoCaption, lang)}
            </p>
          </Reveal>

          {/* Awards number */}
          <Reveal delay={0.05} className="card flex flex-col justify-between bg-butter p-7 md:col-span-3 lg:col-span-3">
            <p className="text-[5.5rem] font-extrabold leading-none tracking-tighter">{awardsCount}</p>
            <div>
              <p className="text-lg font-extrabold leading-tight">{t(a.awardsStat.label, lang)}</p>
              <p className="mt-1 text-sm text-ink/75">{t(a.awardsStat.body, lang)}</p>
            </div>
          </Reveal>

          {/* Strengths */}
          {a.strengths.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={i} delay={0.08 + i * 0.04} className={`card card-hover p-7 md:col-span-3 ${i === 0 ? "lg:col-span-3" : "lg:col-span-3"} ${BG[s.color]}`}>
                <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-surface">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-ink/70">{t(s.kicker, lang)}</p>
                <h3 className="mt-1 text-xl font-extrabold leading-tight">{t(s.title, lang)}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">{t(s.body, lang)}</p>
                {s.chips ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {s.chips.map((c) => (
                      <li key={c} className="chip !py-0.5 !text-xs">{c}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            );
          })}

          {/* Now */}
          <Reveal delay={0.05} className="card p-7 md:col-span-6 lg:col-span-5 sm:p-8">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <span className="relative flex h-3 w-3" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-go opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-go" />
              </span>
              {t(a.now.title, lang)}
            </h3>
            <ol className="mt-5 space-y-4">
              {a.now.points.map((p, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full border-2 border-ink bg-mint text-sm font-extrabold" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="pt-1 leading-snug text-ink/85">{t(p, lang)}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Looking for */}
          <Reveal delay={0.1} className="card keep-colors relative overflow-hidden bg-ink p-7 text-paper md:col-span-6 lg:col-span-7 sm:p-9">
            <Sparkles aria-hidden="true" className="absolute right-6 top-6 h-10 w-10 text-butter" />
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.18em] text-butter">
              <Briefcase className="h-4 w-4" aria-hidden="true" /> {t(a.lookingFor.title, lang)}
            </h3>
            <p className="mt-4 max-w-xl text-2xl font-bold leading-snug sm:text-[1.7rem]">{t(a.lookingFor.body, lang)}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {a.lookingFor.roles[lang].map((r, i) => (
                <li
                  key={r}
                  className={`rounded-full border-2 border-paper px-4 py-1.5 text-sm font-extrabold text-ink ${["bg-lilac", "bg-mint", "bg-blush", "bg-butter"][i % 4]}`}
                >
                  {r}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-sun mt-7 !border-paper">
              {portfolio.ui.letsTalk[lang]} →
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

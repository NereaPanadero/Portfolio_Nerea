import { useState } from "react";
import { Trophy, Rocket, Globe2, Shuffle, Linkedin } from "lucide-react";
import Container from "../components/layout/Container";
import Heading from "../components/ui/Heading";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";

const TYPE = {
  award: { Icon: Trophy, bg: "bg-butter" },
  program: { Icon: Rocket, bg: "bg-lilac" },
  milestone: { Icon: Globe2, bg: "bg-mint" },
};
const ROT = ["-6deg", "4deg", "-2deg", "7deg"];
const FOUNDED = 2022;

function Polaroids({ photos, lang, hint }) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const top = photos[order[0]];

  const shuffle = () => setOrder((o) => [...o.slice(1), o[0]]);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="relative aspect-[4/5]">
        {order
          .slice()
          .reverse()
          .map((idx, layer, arr) => {
            const ph = photos[idx];
            const isTop = layer === arr.length - 1;
            return (
              <figure
                key={ph.src}
                aria-hidden={isTop ? undefined : true}
                className="absolute inset-0 rounded-md border-2 border-ink bg-surface p-3 pb-14 transition-transform duration-500"
                style={{ transform: `rotate(${isTop ? "-1.5deg" : ROT[idx % ROT.length]})`, boxShadow: "5px 5px 0 rgb(var(--shadow))" }}
              >
                <Img src={ph.src} alt={isTop ? t(ph.alt, lang) : ""} className="h-full w-full rounded-sm object-cover" />
                <figcaption className="serif absolute inset-x-0 bottom-3 text-center text-2xl text-ink">{t(ph.caption, lang)}</figcaption>
              </figure>
            );
          })}
      </div>
      <button type="button" onClick={shuffle} className="btn btn-sun mx-auto mt-8 flex">
        <Shuffle className="h-4 w-4" aria-hidden="true" /> {hint}
        <span className="sr-only">
          {" "}
          — {t(top.caption, lang)}
        </span>
      </button>
    </div>
  );
}

export default function Awards() {
  const { lang } = useLanguage();
  const a = portfolio.awards;

  const stats = [
    { value: a.items.filter((i) => i.type === "award").length, label: a.stats.awards, bg: "bg-butter" },
    { value: a.items.filter((i) => i.type !== "award").length, label: a.stats.programs, bg: "bg-lilac" },
    { value: portfolio.projects.items.length + 1, label: a.stats.projects, bg: "bg-mint" },
    { value: `${new Date().getFullYear() - FOUNDED}+`, label: a.stats.years, bg: "bg-blush" },
  ];

  const years = [...new Set(a.items.map((i) => i.year))];

  return (
    <section id="awards" aria-labelledby="awards-title" className="py-24 sm:py-28">
      <Container>
        <Heading id="awards-title" eyebrow={t(a.eyebrow, lang)} start={t(a.titleStart, lang)} highlight={t(a.titleHighlight, lang)} lead={t(a.lead, lang)} />
        <Reveal delay={0.12} className="mt-6">
          <a href={portfolio.person.linkedinActivityUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Linkedin className="h-4 w-4" aria-hidden="true" /> {t(a.linkedinLabel, lang)}
          </a>
        </Reveal>

        <Reveal delay={0.05}>
          <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className={`card flex flex-col-reverse p-6 ${s.bg}`} style={{ transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>
                <dt className="mt-1 font-bold leading-tight text-ink/80">{t(s.label, lang)}</dt>
                <dd className="text-5xl font-extrabold tracking-tighter tabular-nums sm:text-6xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <Polaroids photos={a.photos} lang={lang} hint={t(a.polaroidHint, lang)} />
            </Reveal>
          </div>

          <div className="space-y-10 lg:col-span-7">
            {years.map((year) => (
              <div key={year}>
                <Reveal as="h3" className="flex items-center gap-4 text-4xl font-extrabold tracking-tighter">
                  {year}
                  <span className="h-[2px] flex-1 bg-ink/15" aria-hidden="true" />
                </Reveal>
                <ul className="mt-4 space-y-3">
                  {a.items
                    .filter((it) => it.year === year)
                    .map((it, i) => {
                      const { Icon, bg } = TYPE[it.type];
                      return (
                        <Reveal as="li" key={i} delay={Math.min(i * 0.04, 0.12)} className="card-soft card-hover flex gap-4 p-5 hover:border-ink">
                          <span className={`grid h-11 w-11 flex-none place-items-center rounded-full border-2 border-ink ${bg}`} aria-hidden="true">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/70">
                              {t(a.types[it.type], lang)} · {t(it.date, lang)}
                            </p>
                            <p className="mt-0.5 text-lg font-extrabold leading-snug">{t(it.title, lang)}</p>
                            <p className="mt-0.5 text-ink/75">{t(it.text, lang)}</p>
                          </div>
                        </Reveal>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

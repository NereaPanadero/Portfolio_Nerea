import { Download, GraduationCap, Languages, MapPin } from "lucide-react";
import Container from "../components/layout/Container";
import Heading from "../components/ui/Heading";
import Reveal from "../components/ui/Reveal";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";
import { assetUrl } from "../utils/assetUrl";
import Img from "../components/ui/Img";

const BG = { mint: "bg-mint", blush: "bg-blush", sky: "bg-sky", lilac: "bg-lilac", butter: "bg-butter", peach: "bg-peach" };

export default function Experience() {
  const { lang } = useLanguage();
  const e = portfolio.experience;

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-28">
      <div aria-hidden="true" className="dots-bg absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(transparent,#000_20%,#000_80%,transparent)]" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left: sticky intro + education */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Heading id="experience-title" eyebrow={t(e.eyebrow, lang)} start={t(e.titleStart, lang)} highlight={t(e.titleHighlight, lang)} lead={t(e.lead, lang)} />

              <Reveal delay={0.1} className="mt-7">
                <a href={assetUrl(portfolio.person.cvUrl[lang])} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Download className="h-4 w-4" aria-hidden="true" /> {t(portfolio.ui.downloadCV, lang)}
                </a>
              </Reveal>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <Reveal delay={0.1} className="card-soft p-6">
                  <h3 className="flex items-center gap-2 text-lg font-extrabold">
                    <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" /> {t(e.education.title, lang)}
                  </h3>
                  <ul className="mt-4 space-y-3.5">
                    {e.education.items.map((ed, i) => (
                      <li key={i} className="flex items-start gap-3">
                        {ed.image ? <Img src={ed.image} alt="" className="mt-0.5 h-12 w-14 flex-none object-contain" /> : null}
                        <div>
                          <p className="font-bold leading-snug">{t(ed.title, lang)}</p>
                          <p className="text-sm text-ink/70">
                            {t(ed.org, lang)}
                            {ed.dates ? <span className="tabular-nums"> · {ed.dates}</span> : null}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.15} className="card-soft p-6">
                  <h3 className="flex items-center gap-2 text-lg font-extrabold">
                    <Languages className="h-5 w-5 text-accent" aria-hidden="true" /> {t(e.languages.title, lang)}
                  </h3>
                  <ul className="mt-4 space-y-3.5">
                    {e.languages.items.map((l, i) => (
                      <li key={i}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-bold">{t(l.name, lang)}</span>
                          <span className="text-sm font-bold text-ink/70">{t(l.level, lang)}</span>
                        </div>
                        <div className="mt-1.5 h-2.5 rounded-full border-[1.5px] border-ink/20 bg-paper" aria-hidden="true">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${l.value}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Right: timeline */}
          <div className="lg:col-span-7">
            <ol className="relative space-y-6">
              {e.items.map((it, i) => (
                <Reveal as="li" key={it.org + i} delay={Math.min(i * 0.05, 0.15)} className="card card-hover overflow-hidden">
                  <div className={`flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink px-6 py-3 ${BG[it.color]}`}>
                    <p className="text-sm font-extrabold tabular-nums">{t(it.dates, lang)}</p>
                    {it.current ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-surface px-2.5 py-0.5 text-xs font-extrabold">
                        <span className="h-2 w-2 rounded-full bg-go" aria-hidden="true" /> {t(e.currentLabel, lang)}
                      </span>
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-extrabold leading-tight tracking-tight">{t(it.role, lang)}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.95rem]">
                      <span className="font-extrabold text-accent">{it.org}</span>
                      <span className="inline-flex items-center gap-1 text-ink/70">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {t(it.place, lang)}
                      </span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      {it.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 leading-relaxed text-ink/80">
                          <span className="mt-[0.6rem] h-2 w-2 flex-none rounded-full border-[1.5px] border-ink bg-butter" aria-hidden="true" />
                          <span>{t(b, lang)}</span>
                        </li>
                      ))}
                    </ul>
                    {it.note ? (
                      <p className="mt-4 rounded-2xl border-2 border-dashed border-ink/25 bg-paper px-4 py-3 text-sm leading-relaxed text-ink/80">
                        🇪🇺 {t(it.note, lang)}
                      </p>
                    ) : null}
                    {it.photos ? (
                      <figure className="mt-5 rounded-3xl border-2 border-ink/15 bg-paper p-4">
                        <div className="grid grid-cols-[1.6fr_1fr] items-center gap-3">
                          {it.photos.map((ph, k) => (
                            <Img
                              key={ph.src}
                              src={ph.src}
                              alt={t(ph.alt, lang)}
                              className={`w-full rounded-2xl border-2 border-ink object-cover ${k === 0 ? "aspect-[16/10]" : "aspect-[3/4]"}`}
                              style={{ transform: `rotate(${k === 0 ? -1.5 : 3}deg)` }}
                            />
                          ))}
                        </div>
                        <figcaption className="serif mt-3 text-center text-xl leading-snug text-ink/85">{t(it.photosCaption, lang)}</figcaption>
                      </figure>
                    ) : null}
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {it.tags.map((tag) => (
                        <li key={tag} className="chip !text-xs">{tag}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}

              <Reveal as="li" className="rounded-4xl border-2 border-dashed border-ink/30 p-6">
                <h3 className="text-lg font-extrabold">{t(e.other.title, lang)}</h3>
                <p className="mt-1 text-sm text-ink/70">{t(e.other.lead, lang)}</p>
                <ul className="mt-4 divide-y-2 divide-ink/10">
                  {e.other.items.map((o, i) => (
                    <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2.5">
                      <span>
                        <span className="font-bold">{t(o.role, lang)}</span>
                        <span className="text-ink/70"> · {o.org}</span>
                      </span>
                      <span className="text-sm tabular-nums text-ink/70">{o.dates}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

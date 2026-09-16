import { CalendarDays, MapPin, PlayCircle } from "lucide-react";
import Container from "../components/layout/Container";
import Heading from "../components/ui/Heading";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";

const BG = { mint: "bg-mint", blush: "bg-blush", sky: "bg-sky", lilac: "bg-lilac", butter: "bg-butter", peach: "bg-peach" };

function isUpcoming(endDate) {
  return new Date(`${endDate}T23:59:59`) >= new Date();
}

function Meta({ item, lang, upcomingLabel }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {isUpcoming(item.endDate) ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-surface px-2.5 py-0.5 text-xs font-extrabold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-go" aria-hidden="true" /> {t(upcomingLabel, lang)}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1.5 text-sm font-extrabold">
          <CalendarDays className="h-4 w-4" aria-hidden="true" /> {t(item.date, lang)}
        </span>
      </div>
      <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{t(item.title, lang)}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-ink/75">
        <MapPin className="h-4 w-4 flex-none" aria-hidden="true" /> {t(item.place, lang)}
      </p>
      <p className="mt-3 leading-relaxed text-ink/85">{t(item.text, lang)}</p>
    </>
  );
}

export default function Talks() {
  const { lang } = useLanguage();
  const s = portfolio.talks;
  const [featured, calendar, ...rest] = s.items;

  return (
    <section id="talks" aria-labelledby="talks-title" className="py-24 sm:py-28">
      <Container>
        <Heading id="talks-title" eyebrow={t(s.eyebrow, lang)} start={t(s.titleStart, lang)} highlight={t(s.titleHighlight, lang)} lead={t(s.lead, lang)} />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Featured: VDS poster */}
          <Reveal as="article" className={`card overflow-hidden lg:col-span-8 ${BG[featured.color]}`}>
            <div className="border-b-2 border-ink bg-ink">
              <Img src={featured.image.src} alt={t(featured.image.alt, lang)} width={featured.image.width} height={featured.image.height} className="aspect-video w-full object-cover" />
            </div>
            <div className="p-6 sm:p-7">
              <Meta item={featured} lang={lang} upcomingLabel={s.upcoming} />
            </div>
          </Reveal>

          {/* Calendar-style card */}
          <Reveal as="article" delay={0.06} className={`card flex flex-col p-6 sm:p-7 lg:col-span-4 ${BG[calendar.color]}`}>
            <div aria-hidden="true" className="mx-auto mb-6 w-36 overflow-hidden rounded-3xl border-2 border-ink bg-surface text-center shadow-[4px_4px_0_rgb(var(--shadow))]" style={{ transform: "rotate(-4deg)" }}>
              <p className="border-b-2 border-ink bg-accent py-1.5 text-sm font-extrabold uppercase tracking-[0.2em] text-on-accent">{t(calendar.month, lang)}</p>
              <p className="py-3 text-6xl font-extrabold tracking-tighter">{calendar.day}</p>
            </div>
            <Meta item={calendar} lang={lang} upcomingLabel={s.upcoming} />
          </Reveal>

          {rest.map((item, i) => (
            <Reveal as="article" key={item.id} delay={0.08 + i * 0.05} className="card card-hover grid overflow-hidden sm:grid-cols-[0.9fr_1.1fr] lg:col-span-6">
              <div className={`relative border-b-2 border-ink sm:border-b-0 sm:border-r-2 ${BG[item.color]}`}>
                <Img src={item.image.src} alt={t(item.image.alt, lang)} width={item.image.width} height={item.image.height} className="h-full max-h-72 w-full object-cover sm:max-h-none" />
              </div>
              <div className="flex flex-col p-6">
                <Meta item={item} lang={lang} upcomingLabel={s.upcoming} />
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-sun mt-5 self-start">
                    <PlayCircle className="h-4 w-4" aria-hidden="true" /> {t(s.watch, lang)}
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, Lock, PlayCircle, MessagesSquare, Bot, Database, FileStack, Building2, BookOpenText, Pill, Bell, Salad } from "lucide-react";
import Container from "../components/layout/Container";
import Heading from "../components/ui/Heading";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";

const BG = { mint: "bg-mint", blush: "bg-blush", sky: "bg-sky", lilac: "bg-lilac", butter: "bg-butter", peach: "bg-peach" };
const TILT = ["-rotate-2", "rotate-2", "-rotate-1"];

// Illustrated covers for projects without shareable photos (confidential or pending)
const ART = {
  agents: [
    { Icon: MessagesSquare, label: "Teams" },
    { Icon: Bot, label: "Agents" },
    { Icon: Database, label: "BigQuery" },
  ],
  docs: [
    { Icon: FileStack, label: "Docs" },
    { Icon: Building2, label: "Org" },
    { Icon: BookOpenText, label: "Guides" },
  ],
  health: [
    { Icon: Pill, label: "CIMA" },
    { Icon: Bell, label: "Alert" },
    { Icon: Salad, label: "Nutrition" },
  ],
};

function ProjectArt({ project, lang, large = false }) {
  const nodes = ART[project.art] || ART.agents;
  return (
    <div className={`relative flex w-full items-center justify-center overflow-hidden ${BG[project.color]} ${large ? "aspect-video" : "aspect-[4/3]"}`} role="img" aria-label={`${t(project.title, lang)} — ${t(project.oneLiner, lang)}`}>
      <div aria-hidden="true" className="dots-bg absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="relative flex items-center gap-2 sm:gap-3">
        {nodes.map(({ Icon, label }, i) => (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div className={`flex flex-col items-center gap-1.5 ${i === 1 ? "-translate-y-3" : "translate-y-2"}`}>
              <span className={`grid place-items-center rounded-2xl border-2 border-ink bg-surface shadow-[3px_3px_0_rgb(var(--shadow))] ${i === 1 ? "h-16 w-16" : "h-12 w-12"}`}>
                <Icon className={i === 1 ? "h-8 w-8" : "h-6 w-6"} />
              </span>
              <span className="rounded-full bg-surface/80 px-2 text-[0.7rem] font-extrabold">{label}</span>
            </div>
            {i < nodes.length - 1 ? <span className="w-5 border-t-2 border-dashed border-ink sm:w-7" /> : null}
          </div>
        ))}
      </div>
      {project.confidential ? (
        <span className="sticker absolute bottom-3 right-3 !bg-ink !text-paper !text-xs rotate-2">
          <Lock className="h-3.5 w-3.5" aria-hidden="true" /> {lang === "en" ? "Confidential" : "Confidencial"}
        </span>
      ) : null}
    </div>
  );
}

function CaseStudy({ project, lang, onClose }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const img = project.gallery[index];
  const hasGallery = project.gallery.length > 0;
  const L = lang === "en"
    ? { problem: "The problem", solution: "The solution", role: "What I did", impact: "Impact", photos: "Photos" }
    : { problem: "El problema", solution: "La solución", role: "Qué hice", impact: "Impacto", photos: "Fotos" };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-labelledby="case-title"
      className="m-auto w-[min(62rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-4xl border-2 border-ink bg-surface p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      style={{ boxShadow: "8px 8px 0 rgb(var(--shadow))" }}
    >
      <div className={`sticky top-0 z-10 flex items-start justify-between gap-4 border-b-2 border-ink px-6 py-5 ${BG[project.color]}`}>
        <div>
          <p className="text-sm font-extrabold">{t(project.badge, lang)} · {t(project.meta, lang)}</p>
          <h3 id="case-title" className="mt-1 text-3xl font-extrabold tracking-tight">{t(project.title, lang)}</h3>
        </div>
        <button type="button" autoFocus onClick={() => ref.current.close()} aria-label={t(portfolio.ui.close, lang)} className="grid h-11 w-11 flex-none place-items-center rounded-full border-2 border-ink bg-surface hover:bg-butter">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          {!hasGallery ? (
            <>
              <div className="overflow-hidden rounded-3xl border-2 border-ink">
                <ProjectArt project={project} lang={lang} large />
              </div>
              {project.confidential ? (
                <p className="mt-3 flex items-center gap-2 rounded-2xl border-2 border-dashed border-ink/30 px-4 py-3 text-sm font-bold text-ink/80">
                  <Lock className="h-4 w-4 flex-none" aria-hidden="true" /> {t(portfolio.projects.confidentialNote, lang)}
                </p>
              ) : null}
            </>
          ) : (
            <>
              <div className={`overflow-hidden rounded-3xl border-2 border-ink ${img.dark ? "bg-[#000]" : "bg-[#fff]"}`}>
                <Img
                  key={img.src}
                  src={img.src}
                  alt={t(img.alt, lang)}
                  className={`aspect-video w-full ${img.fit === "contain" ? "object-contain p-8" : "object-cover"}`}
                />
              </div>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={L.photos}>
                {project.gallery.map((g, i) => (
                  <li key={g.src}>
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={t(g.alt, lang)}
                      aria-current={i === index ? "true" : undefined}
                      className={`h-14 w-20 overflow-hidden rounded-xl border-2 transition ${i === index ? "border-ink ring-2 ring-accent ring-offset-2 ring-offset-surface" : "border-ink/20 opacity-70 hover:opacity-100"} ${g.dark ? "bg-[#000]" : "bg-[#fff]"}`}
                    >
                      <Img src={g.src} alt="" className={`h-full w-full ${g.fit === "contain" ? "object-contain p-1.5" : "object-cover"}`} />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent">{L.problem}</h4>
            <p className="mt-1.5 leading-relaxed text-ink/85">{t(project.problem, lang)}</p>
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent">{L.solution}</h4>
            <p className="mt-1.5 leading-relaxed text-ink/85">{t(project.solution, lang)}</p>
          </div>
          {project.pitchUrl ? (
            <a href={project.pitchUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sun">
              <PlayCircle className="h-4 w-4" aria-hidden="true" /> {t(portfolio.projects.pitchLabel, lang)}
            </a>
          ) : null}
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {[
              [L.role, project.role],
              [L.impact, project.impact],
            ].map(([title, list]) => (
              <div key={title}>
                <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent">{title}</h4>
                <ul className="mt-2 space-y-1.5">
                  {list.map((x, i) => (
                    <li key={i} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink/85">
                      <span className="mt-[0.45rem] h-2 w-2 flex-none rounded-full border-[1.5px] border-ink bg-butter" aria-hidden="true" />
                      {t(x, lang)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function Projects() {
  const { lang } = useLanguage();
  const p = portfolio.projects;
  const [openId, setOpenId] = useState(null);
  const active = p.items.find((x) => x.id === openId);

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-28">
      <Container>
        <Heading id="projects-title" eyebrow={t(p.eyebrow, lang)} start={t(p.titleStart, lang)} highlight={t(p.titleHighlight, lang)} lead={t(p.lead, lang)} />

        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {p.items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.06} className="h-full">
              <article className="card card-hover flex h-full flex-col overflow-hidden">
                <div className={`relative border-b-2 border-ink ${item.cover?.fit === "contain" ? BG[item.color] : ""}`}>
                  {item.cover ? (
                    <Img
                      src={item.cover.src}
                      alt={t(item.cover.alt, lang)}
                      className={`aspect-[4/3] w-full ${item.cover.fit === "contain" ? "object-contain p-10" : "object-cover"}`}
                    />
                  ) : (
                    <ProjectArt project={item} lang={lang} />
                  )}
                  <p className={`sticker absolute left-4 top-4 ${BG[item.color]} ${TILT[i % 3]}`}>{t(item.badge, lang)}</p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-bold text-ink/70">{t(item.meta, lang)}</p>
                  <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{t(item.title, lang)}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-ink/80">{t(item.oneLiner, lang)}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li key={tag} className="chip !text-xs">{tag}</li>
                    ))}
                  </ul>
                  {item.pitchUrl ? (
                    <a href={item.pitchUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sun mt-6 w-full">
                      <PlayCircle className="h-4 w-4" aria-hidden="true" /> {t(portfolio.projects.pitchLabel, lang)}
                    </a>
                  ) : null}
                  <button type="button" onClick={() => setOpenId(item.id)} className={`btn btn-ghost w-full ${item.pitchUrl ? "mt-3" : "mt-6"}`}>
                    {t(portfolio.ui.caseStudy, lang)} <span className="sr-only">: {t(item.title, lang)}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>

      {active ? <CaseStudy project={active} lang={lang} onClose={() => setOpenId(null)} /> : null}
    </section>
  );
}

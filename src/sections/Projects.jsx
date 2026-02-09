import { useEffect, useMemo, useState } from "react";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Reveal from "../components/layout/Reveal";
import PastelCard, { ACCENTS } from "../components/ui/PastelCard";
import MediaCarousel from "../components/ui/MediaCarousel";
import SectionHeader from "../components/ui/SectionHeader";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";

export default function Projects() {
  const { lang } = useLanguage();
  const [openKey, setOpenKey] = useState(null);

  const items = portfolio?.projects?.items ?? [];

  const active = useMemo(() => {
    if (!openKey) return null;
    return items.find((p) => p.title === openKey) || null;
  }, [openKey, items]);

  const openProject = (key) => setOpenKey(key);
  const closeProject = () => setOpenKey(null);

  useEffect(() => {
    if (!openKey) return;
    const onKeyDown = (e) => e.key === "Escape" && closeProject();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openKey]);

  useEffect(() => {
    if (!openKey) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openKey]);

  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          eyebrow={t(portfolio?.projects?.eyebrow, lang)}
          title={t(portfolio?.projects?.title, lang)}
          lead={t(portfolio?.projects?.intro, lang)}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((p, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const gallery = (p.media?.gallery?.length ? p.media.gallery : []).map((img) => ({
              src: img.src,
              alt: t(img.alt, lang),
            }));

            const fallback = p.media?.cover?.src
              ? [{ src: p.media.cover.src, alt: t(p.media.cover.alt, lang) }]
              : [];

            const images = gallery.length ? gallery : fallback;

            return (
              <Reveal key={p.title} delay={0.08 + i * 0.05}>
                <PastelCard accent={accent} className="projectCard">
                  <MediaCarousel images={images} aspect="video" className="projectCard__media" />

                  <div className="projectCard__body">
                    <div className="min-w-0">
                      <h3 className="projectCard__title">{p.title}</h3>
                      {p.meta ? (
                        <p className="projectCard__meta">{t(p.meta, lang)}</p>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      className="projectCard__btn"
                      onClick={() => openProject(p.title)}
                    >
                      {lang === "en" ? "View more" : "Ver más"}
                    </button>
                  </div>
                </PastelCard>
              </Reveal>
            );
          })}
        </div>

        {/* MODAL */}
        {active && (
          <div className="project-modal" role="dialog" aria-modal="true">
            <button
              className="project-modal__backdrop"
              onClick={closeProject}
              aria-label={lang === "en" ? "Close" : "Cerrar"}
              type="button"
            />
            <div className="project-modal__panel">
              <button
                className="project-modal__close"
                onClick={closeProject}
                aria-label={lang === "en" ? "Close" : "Cerrar"}
                type="button"
              >
                ✕
              </button>

              <div className="project-modal__header">
                <p className="project-modal__overline">
                  {lang === "en" ? "Project details" : "Detalles del proyecto"}
                </p>
                <h3 className="project-modal__title">{active.title}</h3>
                {active.meta ? (
                  <p className="project-modal__subtitle">{t(active.meta, lang)}</p>
                ) : null}
              </div>

              <div className="project-modal__grid">
                <div className="project-modal__media">
                  <MediaCarousel
                    images={
                      (active.media?.gallery?.length
                        ? active.media.gallery.map((img) => ({
                            src: img.src,
                            alt: t(img.alt, lang),
                          }))
                        : active.media?.cover?.src
                        ? [{ src: active.media.cover.src, alt: t(active.media.cover.alt, lang) }]
                        : [])
                    }
                    aspect="video"
                    className="rounded-2xl"
                  />
                </div>

                <div className="project-modal__content">
                  <div className="project-kv">
                    {active.problem ? (
                      <p>
                        <strong>{lang === "en" ? "Problem: " : "Problema: "}</strong>
                        {t(active.problem, lang)}
                      </p>
                    ) : null}
                    {active.solution ? (
                      <p className="mt-2">
                        <strong>{lang === "en" ? "Solution: " : "Solución: "}</strong>
                        {t(active.solution, lang)}
                      </p>
                    ) : null}
                  </div>

                  <div className="project-cols">
                    {!!active.role?.length && (
                      <div>
                        <p className="project-smalltitle">
                          {lang === "en" ? "WHAT I DID" : "LO QUE HICE"}
                        </p>
                        <ul className="project-list">
                          {active.role.map((r, idx) => (
                            <li key={idx}>
                              <span className="project-li-dot" />
                              <span className="project-li-text">{t(r, lang)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!!active.impact?.length && (
                      <div>
                        <p className="project-smalltitle">{lang === "en" ? "IMPACT" : "IMPACTO"}</p>
                        <ul className="project-list">
                          {active.impact.map((im, idx) => (
                            <li key={idx}>
                              <span className="project-li-dot" />
                              <span className="project-li-text">{t(im, lang)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <p className="project-hint">
                    {lang === "en"
                      ? "Tip: use arrows in the carousel • ESC to close"
                      : "Tip: usa las flechas del carrusel • ESC para cerrar"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

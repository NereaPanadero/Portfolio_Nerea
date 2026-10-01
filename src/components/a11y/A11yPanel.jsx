import { useEffect, useRef } from "react";
import {
  Accessibility, X, Minus, Plus, RotateCcw, Glasses, BookOpen, Brain, ZapOff, SunMoon, Sun, Moon, Contrast,
  Type, WrapText, Link2, MousePointer2, ScanLine, Pause, ImageOff, Volume2, Droplet, Droplets, Palette,
} from "lucide-react";
import { useA11y } from "../../context/A11yContext";
import { useLanguage } from "../../context/LanguageContext";

const L = {
  title: { en: "Accessibility", es: "Accesibilidad" },
  intro: {
    en: "Make this site work the way you browse. Settings are saved on this device only.",
    es: "Adapta esta web a tu forma de navegar. Los ajustes se guardan solo en este dispositivo.",
  },
  close: { en: "Close accessibility panel", es: "Cerrar panel de accesibilidad" },
  profiles: { en: "Quick profiles", es: "Perfiles rápidos" },
  lowVision: { en: "Low vision", es: "Baja visión" },
  lowVisionD: { en: "Bigger text, high contrast", es: "Texto grande, alto contraste" },
  dyslexia: { en: "Dyslexia", es: "Dislexia" },
  dyslexiaD: { en: "Readable font & spacing", es: "Fuente legible y espaciado" },
  focus: { en: "Focus / ADHD", es: "Concentración / TDAH" },
  focusD: { en: "Calm colours, no motion", es: "Colores calmados, sin animación" },
  seizureSafe: { en: "Seizure safe", es: "Sin destellos" },
  seizureSafeD: { en: "Stops all animation", es: "Detiene toda animación" },
  textSize: { en: "Text size", es: "Tamaño del texto" },
  smaller: { en: "Decrease text size", es: "Reducir texto" },
  bigger: { en: "Increase text size", es: "Aumentar texto" },
  theme: { en: "Theme", es: "Tema" },
  auto: { en: "Auto", es: "Auto" },
  light: { en: "Light", es: "Claro" },
  dark: { en: "Dark", es: "Oscuro" },
  contrast: { en: "High contrast", es: "Alto contraste" },
  colour: { en: "Colour", es: "Color" },
  normal: { en: "Normal", es: "Normal" },
  low: { en: "Soft", es: "Suave" },
  gray: { en: "Grayscale", es: "Grises" },
  tools: { en: "Reading & navigation", es: "Lectura y navegación" },
  readableFont: { en: "Readable font", es: "Fuente legible" },
  spacing: { en: "Text spacing", es: "Espaciado" },
  highlightLinks: { en: "Highlight links", es: "Resaltar enlaces" },
  bigCursor: { en: "Big cursor", es: "Cursor grande" },
  readingGuide: { en: "Reading guide", es: "Guía de lectura" },
  noMotion: { en: "Pause animations", es: "Pausar animaciones" },
  hideImages: { en: "Hide images", es: "Ocultar imágenes" },
  readAloud: { en: "Read aloud (click text)", es: "Leer en voz alta (clic)" },
  reset: { en: "Reset all", es: "Restablecer" },
  statement: {
    en: "Built by an accessibility engineer. This site targets WCAG 2.2 AA and respects your system settings (reduced motion, dark mode). Shortcut: Alt + A.",
    es: "Hecho por una ingeniera de accesibilidad. Esta web busca cumplir WCAG 2.2 AA y respeta los ajustes de tu sistema (movimiento reducido, modo oscuro). Atajo: Alt + A.",
  },
  active: { en: "active", es: "activos" },
};

const SCALES = [1, 1.15, 1.3, 1.5, 1.75];

function Segmented({ label, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid gap-1.5 rounded-2xl border-2 border-ink/15 bg-paper p-1.5" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map(({ key, text, Icon }) => {
        const on = value === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(key)}
            className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-xs font-bold transition ${on ? "bg-ink text-paper" : "text-ink/75 hover:bg-ink/5"}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {text}
          </button>
        );
      })}
    </div>
  );
}

export default function A11yPanel() {
  const { lang } = useLanguage();
  const { settings, update, reset, applyProfile, activeProfile, setPanelOpen, changedCount } = useA11y();
  const panelRef = useRef(null);
  const tr = (k) => L[k][lang];

  // Focus management: focus panel on open, trap Tab, Esc closes, restore focus on close
  useEffect(() => {
    const previous = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector("button")?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") setPanelOpen(false);
      if (e.key !== "Tab" || !panel) return;
      const f = panel.querySelectorAll("button, [href], input, [tabindex]:not([tabindex='-1'])");
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [setPanelOpen]);

  const scaleIndex = Math.max(0, SCALES.indexOf(settings.fontScale));

  const profiles = [
    { key: "lowVision", Icon: Glasses, color: "bg-sky" },
    { key: "dyslexia", Icon: BookOpen, color: "bg-mint" },
    { key: "focus", Icon: Brain, color: "bg-lilac" },
    { key: "seizureSafe", Icon: ZapOff, color: "bg-butter" },
  ];

  const toggles = [
    { key: "readableFont", Icon: Type },
    { key: "spacing", Icon: WrapText },
    { key: "highlightLinks", Icon: Link2 },
    { key: "bigCursor", Icon: MousePointer2 },
    { key: "readingGuide", Icon: ScanLine },
    { key: "noMotion", Icon: Pause },
    { key: "hideImages", Icon: ImageOff },
    { key: "readAloud", Icon: Volume2 },
  ];

  return (
    <div className="fixed inset-0 z-[80]" lang={lang}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full cursor-default bg-ink/40"
        onClick={() => setPanelOpen(false)}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-title"
        className="thin-scroll absolute bottom-3 left-3 top-3 flex w-[min(25rem,calc(100vw-1.5rem))] flex-col overflow-y-auto rounded-4xl border-2 border-ink bg-surface text-ink"
        style={{ boxShadow: "6px 6px 0 rgb(var(--shadow))" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start gap-3 border-b-2 border-ink/10 bg-surface p-5">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-full border-2 border-ink bg-butter">
            <Accessibility className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="a11y-title" className="text-xl font-extrabold leading-tight">
              {tr("title")}
              {changedCount > 0 ? (
                <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-xs text-on-accent">
                  {changedCount} {tr("active")}
                </span>
              ) : null}
            </h2>
            <p className="mt-1 text-sm leading-snug text-ink/70">{tr("intro")}</p>
          </div>
          <button type="button" onClick={() => setPanelOpen(false)} aria-label={tr("close")} className="grid h-10 w-10 flex-none place-items-center rounded-full border-2 border-ink hover:bg-blush">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* Profiles */}
          <section aria-labelledby="a11y-profiles">
            <h3 id="a11y-profiles" className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink/70">{tr("profiles")}</h3>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {profiles.map(({ key, Icon, color }) => {
                const on = activeProfile === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => applyProfile(key)}
                    className={`rounded-2xl border-2 p-3 text-left transition ${on ? "border-ink bg-ink text-paper" : `border-ink/15 ${color} hover:border-ink`}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="mt-2 block text-sm font-extrabold leading-tight">{tr(key)}</span>
                    <span className={`mt-0.5 block text-xs leading-snug ${on ? "text-paper/80" : "text-ink/70"}`}>{tr(`${key}D`)}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Text size */}
          <section aria-labelledby="a11y-size">
            <h3 id="a11y-size" className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink/70">{tr("textSize")}</h3>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border-2 border-ink/15 bg-paper p-2">
              <button
                type="button"
                onClick={() => update({ fontScale: SCALES[Math.max(0, scaleIndex - 1)] })}
                disabled={scaleIndex === 0}
                aria-label={tr("smaller")}
                className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink bg-surface disabled:opacity-40"
              >
                <Minus className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex-1 text-center">
                <p className="text-lg font-extrabold tabular-nums" aria-live="polite">{Math.round(settings.fontScale * 100)}%</p>
                <div className="mt-1 flex justify-center gap-1.5" aria-hidden="true">
                  {SCALES.map((s, i) => (
                    <span key={s} className={`h-1.5 w-6 rounded-full ${i <= scaleIndex ? "bg-accent" : "bg-ink/15"}`} />
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => update({ fontScale: SCALES[Math.min(SCALES.length - 1, scaleIndex + 1)] })}
                disabled={scaleIndex === SCALES.length - 1}
                aria-label={tr("bigger")}
                className="grid h-11 w-11 place-items-center rounded-xl border-2 border-ink bg-surface disabled:opacity-40"
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </section>

          {/* Theme + colour */}
          <section aria-labelledby="a11y-theme" className="space-y-3">
            <h3 id="a11y-theme" className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink/70">{tr("theme")}</h3>
            <Segmented
              label={tr("theme")}
              value={settings.theme}
              onChange={(theme) => update({ theme })}
              options={[
                { key: "auto", text: tr("auto"), Icon: SunMoon },
                { key: "light", text: tr("light"), Icon: Sun },
                { key: "dark", text: tr("dark"), Icon: Moon },
                { key: "contrast", text: tr("contrast"), Icon: Contrast },
              ]}
            />
            <h3 className="pt-1 text-xs font-extrabold uppercase tracking-[0.16em] text-ink/70">{tr("colour")}</h3>
            <Segmented
              label={tr("colour")}
              value={settings.saturation}
              onChange={(saturation) => update({ saturation })}
              options={[
                { key: "normal", text: tr("normal"), Icon: Palette },
                { key: "low", text: tr("low"), Icon: Droplet },
                { key: "gray", text: tr("gray"), Icon: Droplets },
              ]}
            />
          </section>

          {/* Toggles */}
          <section aria-labelledby="a11y-tools">
            <h3 id="a11y-tools" className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink/70">{tr("tools")}</h3>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {toggles.map(({ key, Icon }) => {
                const on = settings[key];
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => update({ [key]: !on })}
                    className={`flex min-h-[4.25rem] items-center gap-2.5 rounded-2xl border-2 p-3 text-left text-sm font-bold leading-tight transition ${on ? "border-ink bg-accent text-on-accent" : "border-ink/15 bg-paper hover:border-ink"}`}
                  >
                    <Icon className="h-5 w-5 flex-none" aria-hidden="true" />
                    <span>{tr(key)}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <button type="button" onClick={reset} className="btn btn-ghost w-full">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {tr("reset")}
          </button>

          <p className="rounded-2xl bg-lilac/60 p-4 text-xs leading-relaxed text-ink/80">{tr("statement")}</p>
        </div>
      </div>
    </div>
  );
}

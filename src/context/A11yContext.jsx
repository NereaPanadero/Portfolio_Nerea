import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageContext";

const STORAGE_KEY = "portfolio_a11y_v1";

const DEFAULTS = {
  fontScale: 1,
  spacing: false,
  readableFont: false,
  theme: "auto", // auto | light | dark | contrast
  saturation: "normal", // normal | low | gray
  highlightLinks: false,
  bigCursor: false,
  readingGuide: false,
  noMotion: false,
  hideImages: false,
  readAloud: false,
};

const PROFILES = {
  lowVision: { fontScale: 1.3, theme: "contrast", highlightLinks: true, bigCursor: true },
  dyslexia: { readableFont: true, spacing: true, readingGuide: true },
  focus: { noMotion: true, readingGuide: true, saturation: "low" },
  seizureSafe: { noMotion: true, saturation: "low" },
};

const A11yContext = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

let fontLoaded = false;
function loadReadableFont() {
  if (fontLoaded) return;
  fontLoaded = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap";
  document.head.appendChild(link);
}

export function A11yProvider({ children }) {
  const { lang } = useLanguage();
  const [settings, setSettings] = useState(load);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);

  // Apply settings to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-scale", String(settings.fontScale));
    root.classList.toggle("a11y-spacing", settings.spacing);
    root.classList.toggle("a11y-font", settings.readableFont);
    root.classList.toggle("a11y-links", settings.highlightLinks);
    root.classList.toggle("a11y-cursor", settings.bigCursor);
    root.classList.toggle("a11y-no-motion", settings.noMotion);
    root.classList.toggle("a11y-hide-images", settings.hideImages);
    root.classList.toggle("a11y-readaloud", settings.readAloud);
    root.classList.toggle("a11y-sat-low", settings.saturation === "low");
    root.classList.toggle("a11y-sat-gray", settings.saturation === "gray");
    const nextTheme = settings.theme === "auto" ? null : settings.theme;
    if (root.getAttribute("data-theme") !== nextTheme) {
      // swap colours instantly (no transition flash)
      root.classList.add("a11y-switching");
      setTimeout(() => root.classList.remove("a11y-switching"), 60);
    }
    if (nextTheme) root.setAttribute("data-theme", nextTheme);
    else root.removeAttribute("data-theme");
    if (settings.readableFont) loadReadableFont();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // storage unavailable
    }
  }, [settings]);

  // Read aloud: click any text block in <main> to hear it
  useEffect(() => {
    if (!settings.readAloud || !("speechSynthesis" in window)) return;
    let current = null;

    const stop = () => {
      window.speechSynthesis.cancel();
      current?.classList.remove("a11y-speaking");
      current = null;
    };

    const onClick = (e) => {
      const block = e.target.closest?.("main p, main h1, main h2, main h3, main li, main dd, main dt, main blockquote");
      if (!block || e.target.closest("a, button, input, textarea, select")) return;
      stop();
      const text = block.innerText.trim();
      if (!text) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "es" ? "es-ES" : "en-GB";
      u.rate = 0.95;
      current = block;
      block.classList.add("a11y-speaking");
      u.onend = () => block.classList.remove("a11y-speaking");
      window.speechSynthesis.speak(u);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      stop();
    };
  }, [settings.readAloud, lang]);

  // Alt + A toggles the panel
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && (e.code === "KeyA" || e.key.toLowerCase() === "a")) {
        e.preventDefault();
        setPanelOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const update = useCallback((patch) => {
    setActiveProfile(null);
    setSettings((s) => ({ ...s, ...patch }));
  }, []);

  const applyProfile = useCallback(
    (key) => {
      if (activeProfile === key) {
        setActiveProfile(null);
        setSettings(DEFAULTS);
      } else {
        setActiveProfile(key);
        setSettings({ ...DEFAULTS, ...PROFILES[key] });
      }
    },
    [activeProfile]
  );

  const reset = useCallback(() => {
    setActiveProfile(null);
    setSettings(DEFAULTS);
  }, []);

  const changedCount = useMemo(
    () => Object.keys(DEFAULTS).filter((k) => settings[k] !== DEFAULTS[k]).length,
    [settings]
  );

  const value = useMemo(
    () => ({ settings, update, reset, applyProfile, activeProfile, panelOpen, setPanelOpen, changedCount }),
    [settings, update, reset, applyProfile, activeProfile, panelOpen, changedCount]
  );

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used within <A11yProvider>");
  return ctx;
}

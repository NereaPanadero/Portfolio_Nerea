import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Lock, Send } from "lucide-react";
import NPLogo from "../brand/NPLogo";
import { useLanguage } from "../../context/LanguageContext";
import { useA11y } from "../../context/A11yContext";
import { ACTIONS, generateResponse, starterSuggestions, suggestionLabel } from "../../utils/chatbotEngine";
import { assetUrl } from "../../utils/assetUrl";

const MAX_LEN = 300;

// Safe mini-markdown: **bold** and "• " bullets, rendered as React nodes (never HTML).
function RichText({ text }) {
  const lines = text.split("\n");
  const inline = (line) =>
    line.split("**").map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>));
  const out = [];
  let bullets = [];
  const flush = () => {
    if (bullets.length) {
      out.push(
        <ul key={`ul-${out.length}`} className="my-1.5 space-y-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 flex-none rounded-full bg-current opacity-60" />
              <span>{inline(b)}</span>
            </li>
          ))}
        </ul>
      );
      bullets = [];
    }
  };
  lines.forEach((line, i) => {
    if (line.startsWith("• ")) bullets.push(line.slice(2));
    else {
      flush();
      if (line.trim()) out.push(<p key={`p-${i}`} className="my-1">{inline(line)}</p>);
    }
  });
  flush();
  return out;
}

export default function ChatPanel({ open, onClose, pending, clearPending }) {
  const { lang } = useLanguage();
  const { setPanelOpen } = useA11y();
  const [messages, setMessages] = useState(() => [
    {
      from: "bot",
      text:
        lang === "en"
          ? "Hi! 👋 I’m Nerea’s assistant. I can tell you about her experience, AIntegra, awards, skills and the roles she’s looking for. What would you like to know?"
          : "¡Hola! 👋 Soy el asistente de Nerea. Te cuento su experiencia, AIntegra, premios, habilidades y qué puestos busca. ¿Qué quieres saber?",
      suggestions: starterSuggestions(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const lastIntent = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const reducedMotion =
    typeof window !== "undefined" &&
    (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("a11y-no-motion"));

  const ask = (question) => {
    const q = question.trim().slice(0, MAX_LEN);
    if (!q || typing) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    const reply = generateResponse(q, { lang, lastIntent: lastIntent.current });
    if (reply.intent) lastIntent.current = reply.intent;
    setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [...m, { from: "bot", ...reply }]);
      },
      reducedMotion ? 0 : 450 + Math.min(reply.text.length, 400)
    );
  };

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 30);
  }, [open]);

  useEffect(() => {
    if (open && pending) {
      ask(pending);
      clearPending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pending]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const runAction = (key) => {
    const a = ACTIONS[key];
    if (a.kind === "scroll") {
      document.getElementById(a.to)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      if (window.innerWidth < 640) onClose();
    } else if (a.kind === "a11y") {
      onClose();
      setPanelOpen(true);
    }
  };

  const lastBot = [...messages].reverse().find((m) => m.from === "bot");

  return (
    <div
      id="chat-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="chat-title"
      className={`fixed bottom-24 right-3 z-40 ${open ? "flex" : "hidden"} h-[min(38rem,calc(100dvh-8rem))] w-[min(24.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-4xl border-2 border-ink bg-surface text-ink shadow-[6px_6px_0_rgb(var(--shadow))]`}
    >
      <div className="flex items-center gap-3 border-b-2 border-ink bg-lilac px-4 py-3">
        <NPLogo className="h-10 w-10 flex-none" />
        <div className="min-w-0">
          <h2 id="chat-title" className="font-extrabold leading-tight">
            {lang === "en" ? "Nerea’s assistant" : "Asistente de Nerea"}
          </h2>
          <p className="flex items-center gap-1 text-xs font-bold text-ink/75">
            <Lock className="h-3 w-3" aria-hidden="true" />
            {lang === "en" ? "Runs in your browser · private" : "Funciona en tu navegador · privado"}
          </p>
        </div>
      </div>

      <div ref={listRef} role="log" aria-live="polite" aria-relevant="additions" className="thin-scroll flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[88%] rounded-3xl border-2 border-ink px-4 py-2.5 text-[0.95rem] leading-relaxed ${m.from === "user" ? "rounded-br-md bg-accent text-on-accent" : "rounded-bl-md bg-surface"}`}
            >
              <span className="sr-only">{m.from === "user" ? (lang === "en" ? "You: " : "Tú: ") : (lang === "en" ? "Assistant: " : "Asistente: ")}</span>
              <RichText text={m.text} />
              {m.actions?.length ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.actions.map((key) => {
                    const a = ACTIONS[key];
                    const label = a.label[m.lang || lang];
                    const cls = "inline-flex items-center gap-1 rounded-full border-2 border-ink bg-butter px-2.5 py-1 text-xs font-extrabold hover:-translate-y-0.5 transition";
                    return a.kind === "link" ? (
                      <a key={key} href={a.asset ? assetUrl(a.href(lang)) : a.href(lang)} target={a.href(lang).startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className={cls}>
                        {label} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <button key={key} type="button" onClick={() => runAction(key)} className={cls}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {typing ? (
          <div className="flex justify-start" aria-label={lang === "en" ? "Assistant is typing" : "El asistente está escribiendo"}>
            <div className="flex gap-1 rounded-3xl rounded-bl-md border-2 border-ink bg-surface px-4 py-3.5">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-ink/60" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {lastBot?.suggestions?.length && !typing ? (
        <div className="flex gap-1.5 overflow-x-auto border-t-2 border-ink/10 bg-paper px-3 py-2.5">
          {lastBot.suggestions.map((s) => (
            <button key={s} type="button" onClick={() => ask(suggestionLabel(s, lang))} className="flex-none rounded-full border-[1.5px] border-ink/30 bg-surface px-3 py-1.5 text-xs font-bold hover:border-ink hover:bg-mint">
              {suggestionLabel(s, lang)}
            </button>
          ))}
        </div>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-center gap-2 border-t-2 border-ink p-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          {lang === "en" ? "Your question" : "Tu pregunta"}
        </label>
        <input
          id="chat-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_LEN))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              ask(input);
            }
          }}
          maxLength={MAX_LEN}
          autoComplete="off"
          placeholder={lang === "en" ? "Ask about experience, awards…" : "Pregunta por experiencia, premios…"}
          className="min-w-0 flex-1 rounded-full border-2 border-ink/20 bg-paper px-4 py-2.5 text-[0.95rem] placeholder:text-ink/60 focus:border-ink focus:outline-none"
        />
        <button type="submit" disabled={!input.trim() || typing} aria-label={lang === "en" ? "Send" : "Enviar"} className="grid h-11 w-11 flex-none place-items-center rounded-full border-2 border-ink bg-accent text-on-accent disabled:opacity-40">
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

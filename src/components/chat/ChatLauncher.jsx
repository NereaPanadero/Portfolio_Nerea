import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import NPLogo from "../brand/NPLogo";
import { useLanguage } from "../../context/LanguageContext";

const ChatPanel = lazy(() => import("./ChatPanel"));

export default function ChatLauncher() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pending, setPending] = useState(null);
  const [teaser, setTeaser] = useState(false);
  const buttonRef = useRef(null);

  const openChat = useCallback((question) => {
    setMounted(true);
    setOpen(true);
    setTeaser(false);
    if (question) setPending(question);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    const onOpen = (e) => openChat(e.detail?.question);
    window.addEventListener("open-chat", onOpen);
    // Friendly teaser bubble once per visit
    let seen = false;
    try {
      seen = sessionStorage.getItem("chat_teaser") === "1";
    } catch {
      // ignore
    }
    const timer = seen ? null : setTimeout(() => setTeaser(true), 7000);
    return () => {
      window.removeEventListener("open-chat", onOpen);
      if (timer) clearTimeout(timer);
    };
  }, [openChat]);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem("chat_teaser", "1");
    } catch {
      // ignore
    }
  };

  return (
    <>
      {teaser && !open ? (
        <div className="fixed bottom-24 right-4 z-40 flex max-w-[15rem] items-start gap-2 rounded-3xl rounded-br-md border-2 border-ink bg-surface p-3 pl-4 text-sm font-bold text-ink shadow-[3px_3px_0_rgb(var(--shadow))]">
          <button type="button" onClick={() => openChat()} className="text-left">
            {lang === "en" ? "Recruiter? Ask me anything about Nerea ✨" : "¿Seleccionas talento? Pregúntame lo que quieras sobre Nerea ✨"}
          </button>
          <button type="button" onClick={dismissTeaser} aria-label={lang === "en" ? "Dismiss" : "Cerrar aviso"} className="-mr-1 -mt-1 grid h-7 w-7 flex-none place-items-center rounded-full hover:bg-ink/10">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close() : openChat())}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={lang === "en" ? "Chat with Nerea’s assistant" : "Hablar con el asistente de Nerea"}
        className="fixed bottom-4 right-4 z-40 grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-surface shadow-[4px_4px_0_rgb(var(--shadow))] transition hover:-translate-y-1"
      >
        {open ? <X className="h-7 w-7" aria-hidden="true" /> : <NPLogo className="h-12 w-12" />}
        {!open ? (
          <span aria-hidden="true" className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-ink bg-butter text-xs">
            ✦
          </span>
        ) : null}
      </button>

      {mounted ? (
        <Suspense fallback={null}>
          <ChatPanel open={open} onClose={close} pending={pending} clearPending={() => setPending(null)} />
        </Suspense>
      ) : null}
    </>
  );
}

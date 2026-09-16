import { useState } from "react";
import { Check, Copy, Download, Linkedin, Mail, MapPin, ShieldCheck } from "lucide-react";
import Container from "../components/layout/Container";
import Heading from "../components/ui/Heading";
import Reveal from "../components/ui/Reveal";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";
import { assetUrl } from "../utils/assetUrl";

const LIMITS = { name: 80, company: 100, message: 1500 };

// Gmail "G" mark (simple, no external asset)
function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M2 6.5 12 13l10-6.5V18a2 2 0 0 1-2 2h-2V9.8l-6 3.9-6-3.9V20H4a2 2 0 0 1-2-2z" />
      <path fill="currentColor" d="M22 6.2V6a2 2 0 0 0-3.2-1.6L12 9.2 5.2 4.4A2 2 0 0 0 2 6v.2L12 12.7z" opacity=".6" />
    </svg>
  );
}

export default function Contact() {
  const { lang } = useLanguage();
  const c = portfolio.contact;
  const f = c.form;
  const p = portfolio.person;

  const [form, setForm] = useState({ name: "", company: "", topic: 0, message: "" });
  const [status, setStatus] = useState(null); // null | opened | copied
  const [copiedEmail, setCopiedEmail] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setStatus(null);
    setForm((s) => ({ ...s, [name]: name === "topic" ? Number(value) : value.slice(0, LIMITS[name] ?? 200) }));
  };

  const compose = () => {
    const topic = t(f.topics[form.topic], lang);
    const who = form.company.trim() ? `${form.name.trim()} (${form.company.trim()})` : form.name.trim();
    const subject = `${t(f.subjectPrefix, lang)} · ${topic} · ${who}`;
    const body = `${t(f.greeting, lang)}\n\n${form.message.trim()}\n\n${t(f.signoff, lang)}\n${form.name.trim()}${form.company.trim() ? `\n${form.company.trim()}` : ""}`;
    return { subject, body };
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  // Nothing is sent from this site: the visitor's own email client does the sending.
  const onSubmit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter?.value || "mail";
    const { subject, body } = compose();
    const enc = encodeURIComponent;

    if (action === "gmail") {
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(p.email)}&su=${enc(subject)}&body=${enc(body)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("opened");
    } else if (action === "copy") {
      if (await copyText(`${subject}\n\n${body}`)) setStatus("copied");
    } else {
      window.location.href = `mailto:${p.email}?subject=${enc(subject)}&body=${enc(body)}`;
      setStatus("opened");
    }
  };

  const copyEmail = async () => {
    if (await copyText(p.email)) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } else {
      window.location.href = `mailto:${p.email}`;
    }
  };

  const input =
    "mt-1.5 w-full rounded-2xl border-2 border-ink bg-surface px-4 py-3 font-normal text-ink placeholder:text-ink/60 focus:outline-none focus:ring-4 focus:ring-accent/30";

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-3 py-10 sm:px-5">
      <div className="card mx-auto max-w-[88rem] overflow-hidden !rounded-5xl bg-blush py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Heading
                id="contact-title"
                eyebrow={t(c.eyebrow, lang)}
                start={t(c.titleStart, lang)}
                highlight={t(c.titleHighlight, lang)}
                end={t(c.titleEnd, lang)}
                lead={t(c.lead, lang)}
              />

              <Reveal delay={0.1} className="mt-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a href={`mailto:${p.email}`} className="text-xl font-extrabold underline decoration-accent decoration-[3px] underline-offset-4 sm:text-2xl">
                    {p.email}
                  </a>
                  <button type="button" onClick={copyEmail} className="btn btn-ghost !px-3.5 !py-2 text-sm">
                    {copiedEmail ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                    <span aria-live="polite">{copiedEmail ? t(c.copied, lang) : t(c.copyEmail, lang)}</span>
                  </button>
                </div>
                <p className="flex items-center gap-2 font-bold text-ink/80">
                  <MapPin className="h-4 w-4" aria-hidden="true" /> {t(c.location, lang)}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={p.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
                  </a>
                  <a href={assetUrl(p.cvUrl[lang])} target="_blank" rel="noopener noreferrer" className="btn btn-sun">
                    <Download className="h-4 w-4" aria-hidden="true" /> {t(portfolio.ui.downloadCV, lang)}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} className="card p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold">{t(f.title, lang)}</h3>
                <p className="mt-2 flex gap-2 rounded-2xl bg-mint/70 px-3.5 py-2.5 text-sm font-medium leading-snug text-ink/85">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
                  {t(f.intro, lang)}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block font-bold">
                    {t(f.name, lang)}
                    <input name="name" required autoComplete="name" maxLength={LIMITS.name} value={form.name} onChange={onChange} placeholder={t(f.namePh, lang)} className={input} />
                  </label>
                  <label className="block font-bold">
                    {t(f.company, lang)}
                    <input name="company" autoComplete="organization" maxLength={LIMITS.company} value={form.company} onChange={onChange} placeholder={t(f.companyPh, lang)} className={input} />
                  </label>
                  <label className="block font-bold sm:col-span-2">
                    {t(f.topic, lang)}
                    <select name="topic" value={form.topic} onChange={onChange} className={input}>
                      {f.topics.map((tp, i) => (
                        <option key={i} value={i}>{t(tp, lang)}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block font-bold sm:col-span-2">
                    {t(f.message, lang)}
                    <textarea name="message" required minLength={10} maxLength={LIMITS.message} rows={5} value={form.message} onChange={onChange} placeholder={t(f.messagePh, lang)} className={`${input} resize-y`} />
                  </label>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button type="submit" value="gmail" className="btn btn-primary w-full">
                    <GmailIcon /> {t(f.gmail, lang)}
                  </button>
                  <button type="submit" value="mail" className="btn btn-ghost w-full">
                    <Mail className="h-4 w-4" aria-hidden="true" /> {t(f.mailApp, lang)}
                  </button>
                  <button type="submit" value="copy" className="btn btn-ghost w-full sm:col-span-2 !py-2.5 text-sm">
                    <Copy className="h-4 w-4" aria-hidden="true" /> {t(f.copy, lang)}
                  </button>
                </div>

                <p aria-live="polite" className="empty:hidden mt-4 rounded-2xl border-2 border-ink bg-butter px-4 py-3 font-bold">
                  {status === "opened" ? t(f.opened, lang) : status === "copied" ? `${t(f.copied, lang)} ${p.email}` : ""}
                </p>
              </form>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}

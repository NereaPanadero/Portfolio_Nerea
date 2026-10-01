import { BrainCircuit, Glasses, Code2, Cpu, ShieldCheck, Users } from "lucide-react";
import Container from "../components/layout/Container";
import Heading from "../components/ui/Heading";
import Reveal from "../components/ui/Reveal";
import Img from "../components/ui/Img";
import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";
import { t } from "../utils/t";

const ICONS = { brain: BrainCircuit, glasses: Glasses, code: Code2, cpu: Cpu, shield: ShieldCheck, users: Users };
const BG = { mint: "bg-mint", blush: "bg-blush", sky: "bg-sky", lilac: "bg-lilac", butter: "bg-butter", peach: "bg-peach" };

function LogoTile({ logo }) {
  const Tag = logo.url ? "a" : "div";
  const linkProps = logo.url ? { href: logo.url, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Tag
      {...linkProps}
      title={logo.name}
      className={`mx-2.5 grid h-20 w-44 flex-none place-items-center rounded-3xl border-2 border-ink px-5 transition hover:-translate-y-1 ${logo.dark ? "bg-[#000]" : "bg-[#fff]"}`}
    >
      {logo.src ? (
        <Img src={logo.src} alt={logo.name} className="max-h-11 w-auto max-w-full object-contain" />
      ) : (
        <span className="text-xl font-extrabold tracking-tight text-[#1E1633]">{logo.name}</span>
      )}
    </Tag>
  );
}

export default function Skills() {
  const { lang } = useLanguage();
  const s = portfolio.skills;
  const logos = portfolio.partners.logos;

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24 sm:py-28">
      <Container>
        <Heading id="skills-title" eyebrow={t(s.eyebrow, lang)} start={t(s.title, lang)} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.groups.map((g, i) => {
            const Icon = ICONS[g.icon];
            return (
              <Reveal as="li" key={i} delay={i * 0.04} className="card-soft card-hover p-6 hover:border-ink">
                <div className="flex items-center gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl border-2 border-ink ${BG[g.color]}`} style={{ transform: `rotate(${i % 2 ? 6 : -6}deg)` }}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-extrabold">{t(g.title, lang)}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items[lang].map((item) => (
                    <li key={item} className="chip">{item}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </Container>

      {/* Partners marquee */}
      <div className="mt-24" aria-labelledby="partners-title" role="region">
        <Container>
          <Reveal as="h2" id="partners-title" className="text-center text-xs font-extrabold uppercase tracking-[0.2em] text-ink/70">
            {t(portfolio.partners.title, lang)}
          </Reveal>
        </Container>
        <div className="marquee mt-6 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee-track animate-marquee [animation-duration:45s]">
            <ul className="flex">
              {logos.map((l) => (
                <li key={l.name}><LogoTile logo={l} /></li>
              ))}
            </ul>
            <ul className="flex" aria-hidden="true" inert>
              {logos.map((l) => (
                <li key={l.name}>
                  <LogoTile logo={l} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useLanguage } from "../context/LanguageContext";
import { portfolio } from "../data/portfolio";

export default function Marquee() {
  const { lang } = useLanguage();
  const items = portfolio.marquee[lang];

  const row = () => (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap px-5 text-xl font-extrabold tracking-tight sm:text-2xl">
          {item}
          <span className="ml-10 text-butter" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden="true" className="relative z-10 overflow-x-clip py-3">
      <div className="keep-colors -mx-4 -rotate-[1.5deg] border-y-2 border-ink bg-ink py-4 text-paper">
        <div className="marquee overflow-hidden">
          <div className="marquee-track animate-marquee">
            {row()}
            {row()}
          </div>
        </div>
      </div>
    </div>
  );
}

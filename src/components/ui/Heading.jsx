import Reveal from "./Reveal";
import Scribble from "../brand/Scribble";

export default function Heading({ id, eyebrow, start, highlight, end, lead, center = false, invert = false, className = "" }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? (
        <Reveal as="p" className={`eyebrow ${invert ? "!text-butter" : ""}`}>
          <span aria-hidden="true" className="inline-grid grid-cols-2 gap-[3px]">
            <span className="h-[5px] w-[5px] rounded-full bg-current" />
            <span className="h-[5px] w-[5px] rounded-full bg-current opacity-30" />
            <span className="h-[5px] w-[5px] rounded-full bg-current opacity-30" />
            <span className="h-[5px] w-[5px] rounded-full bg-current" />
          </span>
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 id={id} className={`h-section mt-4 ${invert ? "!text-paper" : ""}`}>
          {start}{" "}
          {highlight ? (
            <Scribble color={invert ? "rgb(var(--butter))" : "rgb(var(--accent))"}>
              <span className={`serif font-normal ${invert ? "text-butter" : "text-accent"}`}>{highlight}</span>
            </Scribble>
          ) : null}
          {end ? <> {end}</> : null}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal as="p" delay={0.1} className={`lead mt-5 ${center ? "mx-auto" : ""} ${invert ? "!text-paper/80" : ""}`}>
          {lead}
        </Reveal>
      ) : null}
    </div>
  );
}

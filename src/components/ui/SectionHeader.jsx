import Reveal from "../layout/Reveal";

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left", // "left" | "center"
  right,
}) {
  const isCenter = align === "center";

  return (
    <div className={["section-header", isCenter ? "section-header--center" : ""].join(" ")}>
      <Reveal>
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      </Reveal>

      <Reveal delay={0.05}>
        <div className="section-titleRow">
          <h2 className="section-title">{title}</h2>
          <span className="section-rule" aria-hidden="true" />
        </div>
      </Reveal>

      {lead ? (
        <Reveal delay={0.09}>
          <p className="section-lead">{lead}</p>
        </Reveal>
      ) : null}

      {right ? (
        <Reveal delay={0.12}>
          <div className={isCenter ? "mt-5 flex justify-center" : "mt-5"}>{right}</div>
        </Reveal>
      ) : null}
    </div>
  );
}

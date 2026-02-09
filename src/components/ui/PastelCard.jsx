export const ACCENTS = ["mint", "lilac", "blush", "sky", "butter", "peach"];

export default function PastelCard({ children, accent = "mint", className = "" }) {
  const accents = {
    mint: "bg-mint/35",
    lilac: "bg-lilac/35",
    blush: "bg-blush/35",
    sky: "bg-sky/35",
    butter: "bg-butter/35",
    peach: "bg-peach/35",
  };

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border border-ink/10 bg-paper/70 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(12,10,29,0.14)]",
        className,
      ].join(" ")}
    >
      {/* Halo pastel */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div
          className={`absolute -top-12 -left-12 h-48 w-48 rounded-full blur-3xl ${
            accents[accent] || accents.mint
          }`}
        />
      </div>

      {/* Contenido */}
      <div className="relative">{children}</div>
    </div>
  );
}

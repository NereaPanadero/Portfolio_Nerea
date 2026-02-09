import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaCarousel({ images = [], aspect = "video", className = "" }) {
  const items = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
  const [index, setIndex] = useState(0);

  const hasImages = items.length > 0;
  const safeIndex = hasImages ? ((index % items.length) + items.length) % items.length : 0;

  const ratioClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
      ? "aspect-[4/5]"
      : "aspect-video";

  function prev() {
    if (!hasImages) return;
    setIndex((i) => i - 1);
  }

  function next() {
    if (!hasImages) return;
    setIndex((i) => i + 1);
  }

  if (!hasImages) {
    return (
      <div
        className={[
          "rounded-2xl border border-ink/10 bg-paper/70 shadow-soft overflow-hidden",
          ratioClass,
          className,
        ].join(" ")}
      >
        <div className="h-full w-full grid place-items-center">
          <div className="text-center px-6">
            <p className="text-sm text-ink/60">Image placeholder</p>
            <p className="mt-1 text-xs text-ink/50">
              Add a path in <span className="font-medium">portfolio.js</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const current = items[safeIndex];

  return (
    <div
      className={[
        "relative rounded-2xl border border-ink/10 bg-paper/70 shadow-soft overflow-hidden",
        ratioClass,
        className,
      ].join(" ")}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.alt || ""}
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          loading="lazy"
        />
      </AnimatePresence>

      {/* Controls */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/80 px-3 py-2 text-sm text-ink shadow-soft backdrop-blur border border-ink/10 hover:-translate-y-1/2 hover:scale-[1.02] transition"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/80 px-3 py-2 text-sm text-ink shadow-soft backdrop-blur border border-ink/10 hover:-translate-y-1/2 hover:scale-[1.02] transition"
            aria-label="Next image"
          >
            →
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-paper/70 px-3 py-1.5 border border-ink/10 backdrop-blur">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={[
                  "h-1.5 w-1.5 rounded-full transition",
                  i === safeIndex ? "bg-ink/70" : "bg-ink/20 hover:bg-ink/40",
                ].join(" ")}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

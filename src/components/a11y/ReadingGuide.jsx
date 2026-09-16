import { useEffect, useState } from "react";

// A horizontal reading window that follows the pointer (or keyboard focus).
export default function ReadingGuide() {
  const [y, setY] = useState(() => window.innerHeight / 2);

  useEffect(() => {
    const onMove = (e) => setY(e.clientY);
    const onFocus = (e) => {
      const r = e.target.getBoundingClientRect?.();
      if (r) setY(r.top + r.height / 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);

  const band = 110;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      <div className="absolute inset-x-0 top-0 bg-ink/45" style={{ height: Math.max(0, y - band / 2) }} />
      <div className="absolute inset-x-0 border-y-[3px] border-butter" style={{ top: y - band / 2, height: band }} />
      <div className="absolute inset-x-0 bottom-0 bg-ink/45" style={{ top: y + band / 2 }} />
    </div>
  );
}

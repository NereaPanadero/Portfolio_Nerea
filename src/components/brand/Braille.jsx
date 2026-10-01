// Renders a word as Braille cells (dots 1-6). Decorative + labelled for screen readers.
const CELLS = { a: [1], e: [1, 5], n: [1, 3, 4, 5], r: [1, 2, 3, 5] };
const POS = { 1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [1, 0], 5: [1, 1], 6: [1, 2] };

export default function Braille({ word = "nerea", label, className = "", dot = 5 }) {
  const gap = dot * 2.6;
  const cellW = gap * 2 + dot * 1.4;
  const letters = word.toLowerCase().split("");
  const width = letters.length * cellW;
  const height = gap * 3;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={label}
      focusable="false"
    >
      {label ? <title>{label}</title> : null}
      {letters.map((ch, i) =>
        [1, 2, 3, 4, 5, 6].map((d) => {
          const [x, y] = POS[d];
          const on = (CELLS[ch] || []).includes(d);
          return (
            <circle
              key={`${i}-${d}`}
              cx={i * cellW + dot + x * gap}
              cy={dot + y * gap}
              r={dot * 0.95}
              fill="currentColor"
              opacity={on ? 1 : 0.16}
            />
          );
        })
      )}
    </svg>
  );
}

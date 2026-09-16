// Hand-drawn underline that wraps a highlighted word.
export default function Scribble({ children, color = "rgb(var(--accent))", className = "" }) {
  return (
    <span className={`scribble ${className}`}>
      {children}
      <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path
          d="M4 16C60 6 120 5 170 9s88 7 126-4M20 21c70-8 160-9 262-6"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

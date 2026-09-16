import { useId } from "react";

// Nerea's NP monogram, redrawn as a tiny inline SVG (was a 1.4 MB PNG).
export default function NPLogo({ className = "", title, soft = false }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0.15" y1="0.05" x2="0.85" y2="0.95">
          <stop offset="0" stopColor={soft ? "#E9DEFF" : "#C7A6FF"} />
          <stop offset="0.5" stopColor={soft ? "#DCE6FB" : "#9FB6F2"} />
          <stop offset="1" stopColor={soft ? "#D2F5EF" : "#5FE0D6"} />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="292" fill={`url(#${id})`} />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M110 440V160h52q8 0 13 7l140 197V160h114a105 105 0 0 1 0 210h-58v70h-58q-8 0-13-7L166 237v203zM371 213v104h48a52 52 0 0 0 0-104z"
      />
    </svg>
  );
}

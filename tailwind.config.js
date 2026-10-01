/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
      },
      colors: {
        paper: token("paper"),
        surface: token("surface"),
        ink: token("ink"),
        accent: token("accent"),
        "on-accent": token("on-accent"),
        lilac: token("lilac"),
        mint: token("mint"),
        blush: token("blush"),
        butter: token("butter"),
        sky: token("sky"),
        peach: token("peach"),
        go: token("go"),
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        floaty: { "0%,100%": { transform: "translateY(0) rotate(var(--r,0deg))" }, "50%": { transform: "translateY(-8px) rotate(var(--r,0deg))" } },
        spinslow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        spinslow: "spinslow 60s linear infinite",
      },
    },
  },
  plugins: [],
};

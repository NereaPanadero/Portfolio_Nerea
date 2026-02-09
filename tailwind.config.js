/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1020",          // texto principal (oscuro elegante)
        paper: "#FBFAFF",        // fondo claro
        lilac: "#C7B6FF",
        blush: "#FFB8D2",
        mint: "#AEECE1",
        sky: "#B8D9FF",
        haze: "#F2F0FF",   
        butter: "#FFE7A3",
        peach: "#FFD1C2",      // fondo pastel muy suave
      },
      backgroundImage: {
      "pastel-tile": "url('/images/projects/fondo1.avif')",
    },

      boxShadow: {
        soft: "0 10px 30px rgba(12, 10, 29, 0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

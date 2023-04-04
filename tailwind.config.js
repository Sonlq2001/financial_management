/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "#76BA99",
        primaryHover: "#4cab7e",
        dark1: "#0f172a",
        dark2: "#1e293b",
        dark3: "#303c51",
        textDark: "#94a3b8",
        overlay: "rgba(0,0,0,0.6)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

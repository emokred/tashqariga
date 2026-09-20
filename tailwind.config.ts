import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          50: "#f0f7f3",
          100: "#dceee3",
          200: "#bcdccb",
          300: "#92c2ab",
          400: "#63a386",
          500: "#418669",
          600: "#306b53",
          700: "#275543",
          800: "#224437",
          900: "#183b2b",
          950: "#0b1f16",
        },
        adventure: {
          50: "#fff5ed",
          100: "#ffe8d5",
          200: "#ffd1aa",
          300: "#ffb274",
          400: "#ff873a",
          500: "#ff5e1e",
          600: "#f04406",
          700: "#c73106",
          800: "#9e270d",
          900: "#7f240f",
        },
        fog: "#F7F9F6",
        granite: "#1E2322",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

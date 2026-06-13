/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f1320",
        panel: "#171c2c",
        panel2: "#1e2438",
        border: "#2a3148",
        accent: "#8b5cf6",
        accent2: "#22c55e",
        muted: "#8b93ab",
      },
    },
  },
  plugins: [],
};

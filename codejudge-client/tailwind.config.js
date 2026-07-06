/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        surface: "#1E293B",
        card: "#111827",
        border: "#334155",

        primaryText: "#F8FAFC",
        secondaryText: "#94A3B8",

        accent: "#3B82F6",
        accentHover: "#2563EB",

        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        text: "var(--text)",
        glow: "var(--glow)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui"],
        display: ["var(--font-space-grotesk)", "system-ui"]
      },
      dropShadow: {
        glow: "0 0 20px rgba(139,92,246,0.45)",
        nebula: "0 0 48px rgba(34,211,238,0.35)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;

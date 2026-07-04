import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B1F3A",
          dark: "#071527",
          light: "#13315C",
        },
        accent: {
          DEFAULT: "#FFFFFF",
          light: "#F7F8FA",
        },
        neutral: {
          bg: "#F7F8FA",
          text: "#0E1626",
          muted: "#5B6472",
          border: "rgba(14,22,38,0.08)",
        },
        onDark: {
          text: "#FFFFFF",
          muted: "#CBD5E1",
          border: "rgba(255,255,255,0.08)",
        },
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        "gold-glow": "var(--shadow-gold-glow)",
      },
      fontFamily: {
        sans: ["var(--font-tajawal)", "sans-serif"],
      },
      backgroundImage: {
        "osb-pattern":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)",
      },
      keyframes: {
        marqueeRtl: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        softPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.035)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        floatX: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(18px)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shine: {
          "0%": { transform: "translateX(120%)" },
          "100%": { transform: "translateX(-120%)" },
        },
      },
      animation: {
        marquee: "marqueeRtl 26s linear infinite",
        "soft-pulse": "softPulse 2.5s ease-in-out infinite",
        "float-y": "floatY 5s ease-in-out infinite",
        "float-x": "floatX 6s ease-in-out infinite",
        "spin-slow": "spinSlow 24s linear infinite",
        shine: "shine 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

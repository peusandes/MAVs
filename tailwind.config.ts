import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0A0A0F",
          raised: "#13131C",
          elevated: "#191923",
        },
        border: {
          soft: "rgba(255,255,255,0.06)",
          medium: "rgba(255,255,255,0.10)",
        },
        brand: {
          50: "#EFF5FF",
          100: "#DCEAFE",
          200: "#B9D5FE",
          300: "#8FB8FC",
          400: "#5B9DFF",
          500: "#3B7DDD",
          600: "#2861B8",
          700: "#1F4E97",
          800: "#1E3A8A",
          900: "#152A66",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        ink: {
          primary: "#F4F4F5",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #1E3A8A 0%, #3B7DDD 50%, #5B9DFF 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(30,58,138,0.55) 0%, rgba(59,125,221,0.35) 50%, rgba(91,157,255,0.25) 100%)",
        "radial-glow":
          "radial-gradient(800px circle at 0% 0%, rgba(59,125,221,0.18), transparent 50%), radial-gradient(800px circle at 100% 100%, rgba(91,157,255,0.10), transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(91,157,255,0.18), 0 12px 40px -12px rgba(91,157,255,0.45)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px -12px rgba(0,0,0,0.6)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      opacity: {
        2: "0.02",
        3: "0.03",
        4: "0.04",
        6: "0.06",
        8: "0.08",
        12: "0.12",
        15: "0.15",
        18: "0.18",
        22: "0.22",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        65: "0.65",
        72: "0.72",
        85: "0.85",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out forwards",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;

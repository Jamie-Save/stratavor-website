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
        brand: {
          gunmetal: "var(--gunmetal)",
          "gunmetal-dark": "var(--gunmetal-dark)",
          ash: "var(--ash)",
          mist: "var(--mist)",
          "mist-light": "var(--mist-light)",
          accent: "var(--accent)",
          "accent-hover": "var(--accent-hover)",
          "accent-light": "var(--accent-light)",
          // Keep backward compat aliases
          orange: "var(--accent)",
          "orange-hover": "var(--accent-hover)",
          "orange-light": "var(--accent-light)",
          "label-red": "var(--label-red)",
        },
        neutral: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
        },
      },
      maxWidth: {
        content: "var(--max-content)",
      },
      padding: {
        content: "var(--content-padding)",
        section: "var(--section-y)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        large: "var(--shadow-large)",
        glow: "var(--shadow-glow)",
        header: "var(--shadow-header)",
        "header-scrolled": "var(--shadow-header-scrolled)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "heading-lg": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        "heading": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-in-up": "fade-in-up 0.6s var(--ease-out-expo) both",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
      },
    },
  },
  plugins: [],
};

export default config;

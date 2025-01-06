import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      willChange: {
        blob: "transform, border-radius",
      },
      animation: {
        rotate: "rotate 8s linear infinite alternate",
        blob: "morph 10s linear infinite alternate, spin-blob 26s linear infinite reverse",
      },
      keyframes: {
        rotate: {
          "0%, 100%": { "--angle": "120deg" },
          "50%": { "--angle": "170deg" },
        },
        morph: {
          "0%": { "border-radius": "27% 73% 71% 29% / 52% 38% 62% 48%" },
          "100%": { "border-radius": "45% 55% 29% 71% / 64% 31% 69% 36%" },
        },
        "spin-blob": {
          "100%": { "transform": "rotate(1turn)" },
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    function ({ addUtilities }: { addUtilities: PluginAPI["addUtilities"] }) {
      addUtilities({
        ".bg-shiny-border": {
          background: `linear-gradient(hsl(var(--background)), hsl(var(--background))) padding-box, 
                            linear-gradient(var(--angle), #687AFF, currentcolor 10%) border-box`,
        },
      });
    },
  ],
} satisfies Config;

import type { Config } from "tailwindcss";

/**
 * Tailwind CSS config template.
 * In Tailwind CSS v4, styling variables are primarily configured in src/app/globals.css.
 * This tailwind.config.ts file helps configure content directories and provides full support
 * for external libraries, plugins, and editor autocomplete helpers (like the VS Code extension).
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
// For Angular Devs: This acts like your variables configuration in Sass/Webpack configs.

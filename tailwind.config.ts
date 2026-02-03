/**
 * Tailwind CSS Configuration
 *
 * Configures Tailwind CSS for the application including:
 * - Content paths for class scanning
 * - Theme customization
 * - Custom colors
 * - Plugins
 *
 * @see https://tailwindcss.com/docs/configuration
 */

import type { Config } from "tailwindcss";

const config: Config = {
  // ========== CONTENT PATHS ==========
  // Paths where Tailwind should scan for class names
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // ========== THEME CUSTOMIZATION ==========
  theme: {
    extend: {
      // Custom color palette extending defaults
      colors: {
        background: "var(--background)", // Uses CSS variable from globals.css
        foreground: "var(--foreground)", // Uses CSS variable from globals.css
      },
    },
  },

  // ========== PLUGINS ==========
  // Add Tailwind plugins here (e.g., @tailwindcss/forms, @tailwindcss/typography)
  plugins: [],
};
export default config;

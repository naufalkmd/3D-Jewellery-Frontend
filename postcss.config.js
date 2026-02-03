/**
 * PostCSS Configuration
 * 
 * PostCSS processes CSS with plugins. This configuration enables:
 * - Tailwind CSS compilation
 * - Autoprefixer for cross-browser compatibility
 * 
 * @see https://postcss.org/
 */

module.exports = {
  plugins: {
    // Compile Tailwind CSS directives (@tailwind, @apply, @layer)
    tailwindcss: {},
    
    // Add vendor prefixes for browser compatibility
    autoprefixer: {},
  },
}

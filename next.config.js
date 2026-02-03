/**
 * Next.js Configuration
 * 
 * Custom configuration for Next.js application.
 * Handles Babylon.js canvas dependencies for proper server-side rendering.
 * 
 * @type {import('next').NextConfig}
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

const nextConfig = {
  // ========== WEBPACK CONFIGURATION ==========
  // Custom webpack config to handle Babylon.js canvas dependencies
  webpack: (config) => {
    // Exclude 'canvas' package as external dependency
    // This prevents server-side rendering issues with Babylon.js
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
};

module.exports = nextConfig;

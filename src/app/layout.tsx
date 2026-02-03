/**
 * Root Layout Component
 *
 * This is the top-level layout that wraps all pages in the application.
 * It includes:
 * - HTML structure
 * - Global styles import
 * - SEO metadata
 * - Any global UI elements (navbar, footer, etc.)
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */

import type { Metadata } from "next";
import "./globals.css";

// ============================================================================
// SEO METADATA
// ============================================================================

/** Application metadata for SEO and browser display */
export const metadata: Metadata = {
  title: "3D Jewellery Virtual Try-On",
  description: "Try on jewellery virtually in stunning 3D",
};

// ============================================================================
// ROOT LAYOUT
// ============================================================================

/**
 * Root layout component that wraps all pages
 *
 * @param children - Page content to render
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

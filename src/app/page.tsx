/**
 * Home Page Component
 *
 * Landing page for the 3D Jewellery Virtual Try-On application.
 * Provides an overview of features and entry point to the showroom.
 *
 * @returns Home page with hero section and feature cards
 */

import Link from "next/link";
import { Gem, Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-gray-900">
      <div className="text-center space-y-8">
        {/* ========== HERO SECTION ========== */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Realistic 3D Jewellery Website
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Try on rings, necklaces, and bracelets in real-time 3D. See the
          exact fit and finish before you buy.
        </p>

        {/* ========== CALL TO ACTION ========== */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/jewellery"
            className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform motion-safe:hover:scale-105"
          >
            Enter Showroom →
          </Link>
        </div>

        {/* ========== FEATURE CARDS ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
          {/* Ring Try-On Feature */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Gem
              aria-hidden="true"
              className="w-8 h-8 mb-3 text-gray-900 dark:text-white"
            />
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              Try On Rings
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              See how different rings look on your hand with realistic 3D models
            </p>
          </div>

          {/* Necklace Try-On Feature */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Sparkles
              aria-hidden="true"
              className="w-8 h-8 mb-3 text-gray-900 dark:text-white"
            />
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              Try On Necklaces
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              View necklaces on a 3D neck model with various styles and
              materials
            </p>
          </div>

          {/* 3D Technology Feature — the actual differentiator, given visual weight */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-purple-400 dark:border-purple-500">
            <Zap
              aria-hidden="true"
              className="w-8 h-8 mb-3 text-purple-600 dark:text-purple-400"
            />
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
              Real-Time 3D
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Powered by Babylon.js for smooth, interactive 3D experience
            </p>
          </div>
        </div>

        {/* ========== TECHNOLOGY STACK INFO ========== */}
        <div className="mt-12 text-gray-600 dark:text-gray-400 text-sm">
          <p>Built with Next.js 14 • Babylon.js • TypeScript • Tailwind CSS</p>
        </div>
      </div>
    </main>
  );
}

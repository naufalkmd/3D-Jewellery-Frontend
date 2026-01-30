import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          💎 3D Jewellery Virtual Try-On
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience jewellery like never before. Try on rings, necklaces, and
          bracelets in stunning 3D with our virtual try-on system.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/jewellery"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Enter Showroom →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-3">💍</div>
            <h3 className="font-semibold text-lg mb-2">Try On Rings</h3>
            <p className="text-gray-600 text-sm">
              See how different rings look on your hand with realistic 3D models
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-3">📿</div>
            <h3 className="font-semibold text-lg mb-2">Try On Necklaces</h3>
            <p className="text-gray-600 text-sm">
              View necklaces on a 3D neck model with various styles and
              materials
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-2">Real-Time 3D</h3>
            <p className="text-gray-600 text-sm">
              Powered by Babylon.js for smooth, interactive 3D experience
            </p>
          </div>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>Built with Next.js 14 • Babylon.js • TypeScript • Tailwind CSS</p>
        </div>
      </div>
    </main>
  );
}

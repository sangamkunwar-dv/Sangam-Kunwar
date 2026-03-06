"use client"; // <-- IMPORTANT: Mark this as a Client Component

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [shapes, setShapes] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // generate random floating shapes
    const tempShapes = Array.from({ length: 10 }, () => ({
      x: Math.random() * 100, // % of screen width
      y: Math.random() * 100, // % of screen height
      size: 20 + Math.random() * 40, // px
      delay: Math.random() * 5, // seconds
    }));
    setShapes(tempShapes);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-6 text-center overflow-hidden">
      
      {/* Floating Shapes */}
      {shapes.map((shape, idx) => (
        <div
          key={idx}
          className="absolute bg-purple-300 dark:bg-purple-600 rounded-full opacity-30 animate-float"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            animationDelay: `${shape.delay}s`,
          }}
        />
      ))}

      {/* Big 404 */}
      <h1 className="text-9xl font-extrabold text-gray-800 dark:text-white mb-6 animate-fadeIn">
        404
      </h1>

      {/* Message */}
      <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-2 animate-fadeIn delay-200">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md animate-fadeIn delay-400">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* GIF Illustration */}
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 Animation"
        className="mx-auto max-w-xs w-full mb-8 rounded-lg shadow-lg animate-fadeIn delay-600"
      />

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center animate-fadeIn delay-800">
        <Link
          href="/"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition transform hover:scale-105"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-gray-800 transition transform hover:scale-105"
        >
          Contact Us
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-12 text-gray-400 text-sm animate-fadeIn delay-1000">
        © {new Date().getFullYear()} sangam kunwar. All rights reserved.
      </p>

      {/* Tailwind Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
}
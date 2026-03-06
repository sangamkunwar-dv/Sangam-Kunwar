import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
      
      {/* Headline */}
      <h1 className="text-6xl font-extrabold text-purple-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* GIF Illustration */}
      <div className="mb-6">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 Animation"
          className="mx-auto max-w-full w-[400px] h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Go to Home
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-gray-800 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "cookiesAccepted";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user already made a choice
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(COOKIE_NAME + "="));
    if (!cookie) setShowBanner(true); // show banner only if no cookie
  }, []);

  const acceptCookies = async () => {
    document.cookie = `${COOKIE_NAME}=true; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days
    setShowBanner(false);

    // Optional: trigger analytics if available
    try {
      const analytics = await import("@vercel/analytics");
      if (typeof analytics.inject === "function") analytics.inject();
      if (typeof analytics.event === "function") {
        analytics.event("cookie_accepted", {
          category: "engagement",
          label: "User accepted cookies",
        });
      }
    } catch (error) {
      console.warn("Analytics not available:", error);
    }
  };

  const rejectCookies = () => {
    document.cookie = `${COOKIE_NAME}=false; path=/; max-age=${60 * 60 * 24 * 30}`;
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-3 z-50 animate-fadeIn">
      <span className="text-sm md:text-base">
        We use cookies to improve your experience on our website. You can accept or reject them.
      </span>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
        >
          Accept
        </button>
        <button
          onClick={rejectCookies}
          className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

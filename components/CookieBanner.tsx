"use client"

import { useEffect, useState } from "react"

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    // Check if cookie already exists
    if (document.cookie.includes("cookiesAccepted=true")) {
      setAccepted(true)
    }
  }, [])

  const acceptCookies = () => {
    // Set cookie for 30 days
    document.cookie = "cookiesAccepted=true; path=/; max-age=" + 60 * 60 * 24 * 30
    setAccepted(true)
  }

  if (accepted) return null // Hide banner if accepted

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center z-50">
      <span>We use cookies to improve your experience on our website.</span>
      <button
        onClick={acceptCookies}
        className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
      >
        Accept
      </button>
    </div>
  )
}

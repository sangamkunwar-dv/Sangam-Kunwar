import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import BackgroundMusic from "@/components/BackgroundMusic"
import CookieBanner from "@/components/CookieBanner"
import "./globals.css"

// Fonts
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// Metadata including icons for browser / PWA
export const metadata: Metadata = {
  title: {
    default: "Sangam Kunwar – Full Stack Developer",
    template: "%s | Sangam Kunwar",
  },
  description: "Professional portfolio of Sangam Kunwar – Full Stack Developer",
  generator: "sangamkunwar",
  icons: {
    icon: "/sangamkunwarphoto.png",
    shortcut: "/sangamkunwarphoto.png",
    apple: "/sangamkunwarphoto.png",
  },
  // Optional PWA info
  manifest: "/manifest.json", // PWA manifest file
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA manifest and theme color */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7b3fe4" />
        <link rel="apple-touch-icon" href="/sangamkunwarphoto.png" />
      </head>

      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* 🎵 Background Music */}
          <BackgroundMusic />

          {/* Main content */}
          {children}

          {/* 🍪 Cookie Banner */}
          <CookieBanner />
        </ThemeProvider>

        {/* 📊 Analytics */}
        <Analytics />
      </body>
    </html>
  )
}

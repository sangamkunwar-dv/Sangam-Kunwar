import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import BackgroundMusic from "@/components/BackgroundMusic"

// ✅ Import CookieBanner
import CookieBanner from "@/components/CookieBanner"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Sangam Kunwar – Full Stack Developer",
    template: "%s | Sangam Kunwar",
  },
  description: "Professional portfolio of Sangam Kunwar – Full Stack Developer",
  generator: "sangamkunwar",

  icons: {
    icon: "https://sangamkunwars.netlify.app/sangamkunwarphoto.png",
    shortcut: "https://sangamkunwars.netlify.app/sangamkunwarphoto.png",
    apple: "https://sangamkunwars.netlify.app/sangamkunwarphoto.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <BackgroundMusic />
        {children}
      </body>
    </html>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}

          {/* ✅ Add CookieBanner here */}
          <CookieBanner />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

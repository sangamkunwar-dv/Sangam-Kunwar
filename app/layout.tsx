import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import BackgroundMusic from "@/components/BackgroundMusic"
import CookieBanner from "@/components/CookieBanner"
import "./globals.css"

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
  description:
    "Professional portfolio of Sangam Kunwar – Full Stack Developer",
  generator: "sangamkunwar",
  icons: {
    icon: "/sangamkunwarphoto.png", // better to use local file
    shortcut: "/sangamkunwarphoto.png",
    apple: "/sangamkunwarphoto.png",
  },
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
          
          {/* ✅ Background Music */}
          <BackgroundMusic />

          {children}

          {/* ✅ Cookie Banner */}
          <CookieBanner />
        </ThemeProvider>

        {/* ✅ Analytics */}
        <Analytics />
      </body>
    </html>
  )
}

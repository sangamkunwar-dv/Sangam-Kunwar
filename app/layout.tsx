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

// Metadata (SEO + Image for Google)
export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // CHANGE to your real domain

  title: {
    default: "Sangam Kunwar – Full Stack Developer",
    template: "%s | Sangam Kunwar",
  },

  description:
    "Official portfolio of Sangam Kunwar – Full Stack Developer, programmer and tech creator.",

  generator: "sangamkunwar",

  icons: {
    icon: "/sangamkunwarphoto.png",
    shortcut: "/sangamkunwarphoto.png",
    apple: "/sangamkunwarphoto.png",
  },

  openGraph: {
    title: "Sangam Kunwar – Full Stack Developer",
    description:
      "Official portfolio of Sangam Kunwar – Full Stack Developer and tech creator.",
    url: "https://sangamkunwar.com.np",
    siteName: "Sangam Kunwar",
    images: [
      {
        url: "/sangamkunwarphoto.png",
        width: 1200,
        height: 630,
        alt: "Sangam Kunwar Photo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sangam Kunwar – Full Stack Developer",
    description:
      "Official portfolio of Sangam Kunwar – Full Stack Developer and tech creator.",
    images: ["/sangamkunwarphoto.png"],
  },

  manifest: "/manifest.json",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7b3fe4" />
        <link rel="apple-touch-icon" href="/sangamkunwarphoto.png" />
      </head>

      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          {/* Background Music */}
          <BackgroundMusic />

          {/* Main Content */}
          {children}

          {/* Cookie Banner */}
          <CookieBanner />
        </ThemeProvider>

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  )
}
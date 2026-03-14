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

// Metadata (Fixed for Google Search)
export const metadata: Metadata = {
  metadataBase: new URL("https://sangamkunwar.com.np"),

  title: {
    default: "Sangam Kunwar – Full Stack Developer",
    template: "%s | Sangam Kunwar",
  },

  description:
    "Official portfolio of Sangam Kunwar – Full Stack Developer, programmer and tech creator.",

  generator: "sangamkunwar",

  // FIXED: Pointing to the 1:1 square icon for search results
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: "Sangam Kunwar – Full Stack Developer",
    description:
      "Official portfolio of Sangam Kunwar – Full Stack Developer and tech creator.",
    url: "https://sangamkunwar.com.np",
    siteName: "Sangam Kunwar",
    images: [
      {
        url: "/sangamkunwarphoto.png", // Keeps the professional banner for social media
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
      {/* CLEANED UP <head>: 
          Next.js automatically injects icons, manifest, and title from the metadata object above.
          Only keep things that the Metadata API doesn't handle natively.
      */}
      <head>
        <meta name="theme-color" content="#7b3fe4" />
      </head>

      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundMusic />
          {children}
          <CookieBanner />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
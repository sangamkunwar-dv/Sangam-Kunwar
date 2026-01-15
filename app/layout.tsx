import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import UltraProtectionWrapper from "@/components/UltraProtectionWrapper"; // <- client wrapper
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sangam Kunwar - Full Stack Developer",
  description: "It's me Sangam Kunwar - Full Stack Developer",
  generator: "sangamkunwar",
  icons: {
    icon: "/sangamkunwarphotos.png",
    shortcut: "/sangamkunwarphotos.png",
    apple: "/sangamkunwarphotos.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/sangamkunwarphoto.jpeg"
        />
      </head>
      <body className="font-sans antialiased">
        {/* Ultra protection */}
        <UltraProtectionWrapper />
        {/* Theme and content */}
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

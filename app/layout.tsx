import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";
import "./globals.css";

// ✅ Dynamically import CookieBanner as client component
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// ✅ Metadata stays in server component
export const metadata: Metadata = {
  title: {
    default: "Sangam Kunwar – Full Stack Developer",
    template: "%s | Sangam Kunwar",
  },
  description: "Professional portfolio of Sangam Kunwar – Full Stack Developer",
  generator: "sangamkunwar",
  // remove icons or handle dynamically
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Page content */}
          {children}

          {/* Client-only cookie banner */}
          <CookieBanner />
        </ThemeProvider>

        {/* Analytics (safe in server component) */}
        <Analytics />
      </body>
    </html>
  );
}

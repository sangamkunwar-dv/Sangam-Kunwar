"use client";

import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import CookieBanner from "@/components/CookieBanner";
import { useEffect } from "react";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// ✅ Metadata (icons removed, will handle dynamic favicon)
export const metadata: Metadata = {
  title: {
    default: "Sangam Kunwar – Full Stack Developer",
    template: "%s | Sangam Kunwar",
  },
  description: "Professional portfolio of Sangam Kunwar – Full Stack Developer",
  generator: "sangamkunwar",
};

// ✅ Component to handle dynamic favicon based on theme
const DynamicFavicon: React.FC = () => {
  useEffect(() => {
    const lightIcon = "/images/light-icon.png"; // put in public/images/
    const darkIcon = "/images/dark-icon.png";

    const updateFavicon = (isDark: boolean) => {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = isDark ? darkIcon : lightIcon;
      } else {
        link = document.createElement("link");
        link.rel = "icon";
        link.href = isDark ? darkIcon : lightIcon;
        document.head.appendChild(link);
      }
    };

    const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    updateFavicon(darkModeMedia.matches);

    darkModeMedia.addEventListener("change", (e) => updateFavicon(e.matches));
    return () => darkModeMedia.removeEventListener("change", (e) => updateFavicon(e.matches));
  }, []);

  return null;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* ✅ Dynamic favicon */}
          <DynamicFavicon />

          {/* ✅ Page content */}
          {children}

          {/* ✅ Cookie Banner */}
          <CookieBanner />
        </ThemeProvider>

        {/* ✅ Analytics */}
        <Analytics />
      </body>
    </html>
  );
}

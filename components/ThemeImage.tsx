"use client";

import { useEffect, useState } from "react";

interface ThemeImageProps {
  lightSrc: string;
  darkSrc: string;
  alt?: string;
  className?: string;
}

const ThemeImage: React.FC<ThemeImageProps> = ({ lightSrc, darkSrc, alt = "Theme Image", className }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkModeMedia.matches);

    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeMedia.addEventListener("change", listener);

    return () => darkModeMedia.removeEventListener("change", listener);
  }, []);

  return <img src={isDark ? darkSrc : lightSrc} alt={alt} className={className} />;
};

export default ThemeImage;

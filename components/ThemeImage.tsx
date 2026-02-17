"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

interface ThemeImageProps {
  lightSrc: string
  darkSrc: string
  alt: string
  width: number
  height: number
}

export default function ThemeImage({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
}: ThemeImageProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const imageSrc = theme === "dark" ? darkSrc : lightSrc

  return <Image src={imageSrc} alt={alt} width={width} height={height} priority />
}

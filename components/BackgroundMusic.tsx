"use client"

import { useEffect, useRef } from "react"

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3 // set volume (0 to 1)
        audioRef.current.play().catch(() => {})
      }
      document.removeEventListener("click", playAudio)
    }

    document.addEventListener("click", playAudio)

    return () => {
      document.removeEventListener("click", playAudio)
    }
  }, [])

  return (
    <audio ref={audioRef} loop>
      <source src="/music/song.mp3" type="audio/mpeg" />
    </audio>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader } from "lucide-react"
import Image from "next/image"

interface HeroSettings {
  id: string
  title: string
  subtitle: string
  description: string
  photo_url: string
  logo_url: string
}

export default function Hero() {
  const [hero, setHero] = useState<HeroSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchHeroSettings = async () => {
      try {
        const response = await fetch("/api/hero-settings")
        if (!response.ok) throw new Error("Failed to fetch hero settings")
        const data = await response.json()
        setHero(data)
      } catch (error) {
        console.error("Error fetching hero settings:", error)

        // Default fallback
        setHero({
          id: "default",
          title: "I'm Sangam Kunwar",
          subtitle: "Full-Stack Developer & Designer",
          description:
            "I build modern, fast and beautiful web applications with clean UI/UX design.",
          photo_url: "/hero-light.png", // light image
          logo_url: "",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHeroSettings()
  }, [])

  if (loading) {
    return (
      <section className="py-24 flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </section>
    )
  }

  if (!hero) return null

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                Welcome to my portfolio
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {hero.title}
              </h1>

              <p className="text-xl font-semibold text-primary">
                {hero.subtitle}
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="gap-2"
                onClick={() =>
                  window.open("https://github.com/sangamkunwar-dv", "_blank")
                }
              >
                View My Work
                <ArrowRight size={18} />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/login")}
              >
                Get in Touch
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE (Light & Dark Mode Switch) */}
          <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden border border-border group transition-all duration-500">

            {/* ☀ Light Mode Image */}
            <Image
              src={hero.photo_url || "/sangam_kunwar.jpg"}
              alt="Hero Light"
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105 block dark:hidden"
            />

            {/* 🌙 Dark Mode Image */}
            <Image
              src="/sangamkunwarphoto.png"   // 👈 Put your dark mode image here
              alt="Hero Dark"
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105 hidden dark:block"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
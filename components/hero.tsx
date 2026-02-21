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

        // Fallback default
        setHero({
          id: "default",
          title: "I'm Sangam Kunwar",
          subtitle: "Full-Stack Developer & Designer",
          description:
            "I'm passionate about building beautiful, functional web applications. With expertise in modern technologies and a focus on user experience, I create solutions that make an impact.",
          photo_url: "/sangamkunwarphoto.png",
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
      <section className="py-20 sm:py-32 flex items-center justify-center">
        <Loader className="animate-spin" />
      </section>
    )
  }

  if (!hero) return null

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
            
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                Welcome to my portfolio
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {hero.title}
              </h1>
              <p className="text-xl text-primary font-semibold">
                {hero.subtitle}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              {hero.description}
            </p>

            {/* ✅ BUTTON SECTION FIXED */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              {/* View Work → GitHub */}
              <Button
                size="lg"
                className="gap-2 hover:shadow-lg transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://github.com/sangamkunwar-dv",
                    "_blank"
                  )
                }
              >
                View My Work
                <ArrowRight size={18} />
              </Button>

              {/* Get in Touch → Login */}
              <Button
                size="lg"
                variant="outline"
                className="hover:shadow-lg transition-all duration-300 bg-transparent"
                onClick={() => router.push("/login")}
              >
                Get in Touch
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  20+
                </p>
                <p className="text-sm text-muted-foreground">
                  Projects Completed
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  3+
                </p>
                <p className="text-sm text-muted-foreground">
                  Years Experience
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  15+
                </p>
                <p className="text-sm text-muted-foreground">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 sm:h-full min-h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-border flex items-center justify-center group hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <Image
              src={hero.photo_url || "/placeholder.svg"}
              alt={hero.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}
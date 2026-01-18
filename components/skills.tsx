"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader } from "lucide-react"

interface SkillCategory {
  id: string
  category: string
  items: string[]
}

const defaultSkills: SkillCategory[] = [
  {
    id: "1",
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Svelte"],
  },
  {
    id: "2",
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Firebase", "GraphQL"],
  },
  {
    id: "3",
    category: "Tools & Platforms",
    items: ["Git", "Docker", "AWS", "Vercel", "GitHub", "Figma"],
  },
  {
    id: "4",
    category: "Soft Skills",
    items: ["Problem Solving", "Communication", "Team Leadership", "Project Management", "Mentoring"],
  },
]

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        console.log("[v0] Fetching skills...")
        const response = await fetch("/api/skills")
        if (!response.ok) throw new Error("Failed to fetch skills")
        const data = await response.json()
        console.log("[v0] Skills loaded:", data)
        setSkillCategories(data && data.length > 0 ? data : defaultSkills)
      } catch (error) {
        console.error("[v0] Error fetching skills:", error)
        setSkillCategories(defaultSkills)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section id="skills" className="py-20 sm:py-32 bg-muted/30 flex items-center justify-center">
        <Loader className="animate-spin" />
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Expertise</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">Skills & Technologies</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Card
              key={category.id}
              className="hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-primary">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(category.items || []).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 hover:scale-105 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

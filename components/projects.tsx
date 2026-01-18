"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Loader } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  image_url?: string
  github_link?: string
  live_link?: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) throw new Error("Failed to fetch projects")
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("[v0] Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-20 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-center h-96">
          <Loader className="animate-spin" />
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Featured Work</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">Recent Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Here are some of my recent projects showcasing my skills and experience in web development.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={project.image_url || "/placeholder.svg?height=192&width=384&query=project"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <ArrowUpRight
                      className="text-primary mt-1 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                      size={20}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="hover:bg-primary/20 transition-colors duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">No projects yet</div>
          )}
        </div>
      </div>
    </section>
  )
}

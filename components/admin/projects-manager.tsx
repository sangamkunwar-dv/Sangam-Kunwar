"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Loader } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  image_url?: string
  github_link?: string
  live_link?: string
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    tech_stack: [],
    image_url: "",
    github_link: "",
    live_link: "",
  })
  const [techInput, setTechInput] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/projects")
      if (!response.ok) throw new Error("Failed to fetch projects")
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("[v0] Error fetching projects:", error)
      showMessage("Failed to load projects", "error")
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(""), 3000)
  }

  const handleAddProject = async () => {
    if (!formData.title?.trim() || !formData.description?.trim()) {
      showMessage("Title and description are required", "error")
      return
    }

    setSaving(true)
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects"
      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save project")

      showMessage(editingId ? "Project updated successfully!" : "Project added successfully!", "success")
      await fetchProjects()
      resetForm()
    } catch (error) {
      console.error("[v0] Error saving project:", error)
      showMessage("Failed to save project", "error")
    } finally {
      setSaving(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tech_stack: [],
      image_url: "",
      github_link: "",
      live_link: "",
    })
    setTechInput("")
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (project: Project) => {
    setFormData(project)
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete project")
      showMessage("Project deleted successfully!", "success")
      await fetchProjects()
    } catch (error) {
      console.error("[v0] Error deleting project:", error)
      showMessage("Failed to delete project", "error")
    }
  }

  const addTech = () => {
    if (techInput.trim() && !formData.tech_stack?.includes(techInput.trim())) {
      setFormData({
        ...formData,
        tech_stack: [...(formData.tech_stack || []), techInput.trim()],
      })
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      tech_stack: (formData.tech_stack || []).filter((t) => t !== tech),
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => {
            if (showForm) {
              resetForm()
            } else {
              setShowForm(true)
            }
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            messageType === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400"
              : "bg-destructive/10 border border-destructive/20 text-destructive"
          }`}
        >
          {message}
        </div>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Project" : "Add New Project"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title</label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                placeholder="Project description"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image_url || ""}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                placeholder="Image URL"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">GitHub Link</label>
                <input
                  type="url"
                  value={formData.github_link || ""}
                  onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                  placeholder="GitHub URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Live Link</label>
                <input
                  type="url"
                  value={formData.live_link || ""}
                  onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                  placeholder="Live project URL"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tech Stack</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTech()}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                  placeholder="Add technology (press Enter)"
                />
                <button
                  onClick={addTech}
                  className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:opacity-90"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData.tech_stack || []).map((tech) => (
                  <div key={tech} className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
                    <span className="text-sm">{tech}</span>
                    <button onClick={() => removeTech(tech)} className="text-xs hover:text-destructive">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddProject}
                disabled={saving}
                className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update" : "Add"} Project
              </button>
              <button
                onClick={resetForm}
                className="flex-1 bg-secondary text-foreground py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground mt-1">{project.description}</p>
                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {project.tech_stack.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-secondary text-foreground text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {(project.github_link || project.live_link) && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Live
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <Edit2 size={18} className="text-foreground" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Plus, Edit2, Trash2, Github, Linkedin, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Collaborator {
  id: string
  name: string
  role: string
  bio?: string
  socialLinks?: { platform: string; url: string }[]
}

export default function CollaboratorsManager() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Collaborator>>({})

  /* LOAD COLLABORATORS */
  useEffect(() => {
    fetch("/api/collaborators")
      .then((res) => res.json())
      .then(setCollaborators)
      .finally(() => setLoading(false))
  }, [])

  const saveCollaborator = async () => {
    if (!formData.name || !formData.role) {
      return alert("Name and role required")
    }

    const res = await fetch("/api/admin/collaborators", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, id: editingId }),
    })

    const data = await res.json()
    if (!res.ok) return alert(data.message)

    if (editingId) {
      setCollaborators((prev) => prev.map((c) => (c.id === editingId ? data : c)))
    } else {
      setCollaborators((prev) => [...prev, data])
    }

    resetForm()
  }

  const deleteCollaborator = async (id: string) => {
    if (!confirm("Delete collaborator?")) return

    await fetch(`/api/admin/collaborators?id=${id}`, { method: "DELETE" })
    setCollaborators((prev) => prev.filter((c) => c.id !== id))
  }

  const resetForm = () => {
    setFormData({})
    setEditingId(null)
    setShowForm(false)
  }

  const icon = (p: string) =>
    p === "github" ? <Github size={16} /> : p === "linkedin" ? <Linkedin size={16} /> : <Mail size={16} />

  if (loading) return <p>Loading collaborators...</p>

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Collaborators</h1>
        <button onClick={() => setShowForm(true)} className="bg-primary px-4 py-2 rounded text-white">
          <Plus size={18} /> Add
        </button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit" : "Add"} Collaborator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Role"
              value={formData.role || ""}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Bio"
              value={formData.bio || ""}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button onClick={saveCollaborator} className="bg-primary text-white py-2 rounded">
              Save
            </button>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {collaborators.map((c) => (
          <Card key={c.id}>
            <CardContent className="pt-6">
              <h3 className="font-bold">{c.name}</h3>
              <p className="text-primary">{c.role}</p>
              <p className="text-sm">{c.bio}</p>
              <div className="flex gap-2 mt-2">
                {c.socialLinks?.map((s) => (
                  <a key={s.platform} href={s.url}>{icon(s.platform)}</a>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { setEditingId(c.id); setFormData(c); setShowForm(true) }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => deleteCollaborator(c.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

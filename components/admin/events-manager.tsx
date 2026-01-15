"use client"

import { useEffect, useState } from "react"
import { Plus, Edit2, Trash2, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Event {
  id: string
  title: string
  date: string
  description: string
  type: "upcoming" | "past"
  location?: string
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Event>>({ type: "upcoming" })

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .finally(() => setLoading(false))
  }, [])

  const saveEvent = async () => {
    if (!formData.title || !formData.date) return alert("Title and date required")

    const res = await fetch("/api/admin/events", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, id: editingId }),
    })

    const data = await res.json()
    if (!res.ok) return alert(data.message)

    setEvents((prev) =>
      editingId ? prev.map((e) => (e.id === editingId ? data : e)) : [...prev, data],
    )

    resetForm()
  }

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete event?")) return
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" })
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  const resetForm = () => {
    setFormData({ type: "upcoming" })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) return <p>Loading events...</p>

  const upcoming = events.filter((e) => e.type === "upcoming")
  const past = events.filter((e) => e.type === "past")

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
        <button onClick={() => setShowForm(true)} className="bg-primary px-4 py-2 rounded text-white">
          <Plus size={18} /> Add Event
        </button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit" : "Add"} Event</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              placeholder="Title"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              value={formData.date || ""}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full p-2 border rounded"
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
            <textarea
              placeholder="Description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button onClick={saveEvent} className="bg-primary text-white py-2 rounded">
              Save
            </button>
          </CardContent>
        </Card>
      )}

      {upcoming.map((e) => (
        <EventCard key={e.id} event={e} onEdit={() => { setEditingId(e.id); setFormData(e); setShowForm(true) }} onDelete={() => deleteEvent(e.id)} />
      ))}

      {past.map((e) => (
        <EventCard key={e.id} event={e} past onEdit={() => { setEditingId(e.id); setFormData(e); setShowForm(true) }} onDelete={() => deleteEvent(e.id)} />
      ))}
    </div>
  )
}

function EventCard({
  event,
  past,
  onEdit,
  onDelete,
}: {
  event: Event
  past?: boolean
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card className={past ? "opacity-70" : ""}>
      <CardContent className="pt-6 flex justify-between">
        <div>
          <h3 className="font-bold">{event.title}</h3>
          <p className="text-sm">{event.date}</p>
          <p>{event.description}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit}><Edit2 size={16} /></button>
          <button onClick={onDelete}><Trash2 size={16} /></button>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Trash2, Mail, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  email: string
  subject: string
  message: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false })
    if (!error && data) setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("messages").delete().eq("id", id)
    if (!error) setMessages(messages.filter((m) => m.id !== id))
  }

  const handleApprove = async (id: string) => {
    const { error } = await supabase.from("messages").update({ status: "approved" }).eq("id", id)
    if (!error) setMessages(messages.map((m) => (m.id === id ? { ...m, status: "approved" } : m)))
  }

  const handleReply = (email: string) => {
    window.location.href = `mailto:${email}`
  }

  if (loading) return <div className="text-center py-8">Loading messages...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Manage visitor messages and inquiries</p>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <Card key={msg.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">{msg.subject}</h3>
                      {msg.status === "approved" && <CheckCircle size={18} className="text-green-500" />}
                      {msg.status === "pending" && <Clock size={18} className="text-yellow-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">From: {msg.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(msg.created_at || Date.now()).toLocaleString()}
                    </p>
                    <p className="text-foreground mt-2">{msg.message}</p>
                  </div>
                  <div className="flex gap-2">
                    {msg.status === "pending" && (
                      <Button size="sm" onClick={() => handleApprove(msg.id)}>
                        Approve
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleReply(msg.email)}>
                      Reply
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(msg.id)}>
                      <Trash2 size={18} className="text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

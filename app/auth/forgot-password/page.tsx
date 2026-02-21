"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://sangamkunwars.netlify.app/reset-password",
    })

    if (error) {
      toast({ title: "Error", description: error.message })
    } else {
      toast({ title: "Success", description: "Check your email for reset link" })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleForgot} className="w-full max-w-md p-8 border rounded space-y-4">
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  )
}

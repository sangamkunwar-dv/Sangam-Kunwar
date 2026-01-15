"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  // ✅ Ensure recovery session exists
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        toast({
          title: "Invalid or expired link",
          description: "Please request a new password reset.",
          variant: "destructive",
        })
        router.replace("/auth/forgot-password")
        return
      }

      setReady(true)
    }

    checkSession()
  }, [router, supabase, toast])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    toast({
      title: "Password updated",
      description: "You can now login with your new password.",
    })

    await supabase.auth.signOut()
    router.replace("/auth/login")
  }

  if (!ready) return null

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>

        <form onSubmit={submit} className="space-y-4">
          <Input
            type="password"
            placeholder="New password"
            minLength={6}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

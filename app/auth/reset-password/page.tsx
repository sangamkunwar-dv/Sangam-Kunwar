"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleRecovery = async () => {
      // Supabase automatically reads token from URL hash
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        toast({
          title: "Invalid or Expired Link",
          description: "Please request a new password reset link.",
        })
        router.replace("/auth/forgot-password")
      } else {
        setLoading(false)
      }
    }

    handleRecovery()
  }, [router, supabase, toast])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      toast({
        title: "Reset Failed",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Password Updated ✅",
        description: "You can now login with your new password.",
      })
      router.replace("/auth/login")
    }
  }

  if (loading) {
    return <p className="text-center mt-10">Verifying reset link...</p>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-sm font-medium">New Password</label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        toast({
          title: "Invalid Link",
          description: "Reset link expired or invalid.",
        })
        router.push("/auth/forgot-password")
      }

      setLoading(false)
    }

    checkSession()
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
      })
    } else {
      toast({
        title: "Password Updated",
        description: "You can now login.",
      })

      router.push("/auth/login")
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleReset} className="w-full max-w-md p-8 border rounded space-y-4">
        <h2 className="text-2xl font-bold">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <Button type="submit" className="w-full">
          Update Password
        </Button>
      </form>
    </div>
  )
}
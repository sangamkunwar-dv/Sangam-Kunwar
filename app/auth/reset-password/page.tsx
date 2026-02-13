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
  const [status, setStatus] = useState<"loading" | "form" | "success" | "error">("loading")
  const [token, setToken] = useState("")

  // Get token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const access_token = params.get("access_token")
    const type = params.get("type")

    if (access_token && type === "recovery") {
      setToken(access_token)
      setStatus("form")
    } else {
      setStatus("error")
    }
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return setStatus("error")

    setStatus("loading")

    const { error } = await supabase.auth.updateUser(
      { password },
      { accessToken: token }
    )

    if (error) {
      console.error(error)
      toast({ title: "Reset Failed", description: error.message })
      setStatus("error")
    } else {
      toast({ title: "Password Updated", description: "You can now login with your new password" })
      setStatus("success")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 border rounded space-y-4">
        {status === "loading" && <p>Loading...</p>}

        {status === "form" && (
          <form onSubmit={handleReset} className="space-y-4">
            <h2 className="text-2xl font-bold">Reset Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <Button type="submit" className="w-full">Update Password</Button>
          </form>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600">Password Updated!</h2>
            <Button onClick={() => router.push("/auth/login")} className="w-full">
              Go to Login
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600">Reset Failed</h2>
            <p>Invalid or expired link. Try again.</p>
            <Button onClick={() => router.push("/auth/forgot-password")} className="w-full">
              Try Again
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

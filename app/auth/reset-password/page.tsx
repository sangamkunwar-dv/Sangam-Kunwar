"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const [status, setStatus] = useState<"loading" | "form" | "success" | "error">("loading")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")

  // Get token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get("access_token") || params.get("token")
    const type = params.get("type")

    if (accessToken && type === "recovery") {
      setToken(accessToken)
      setStatus("form")
    } else {
      setStatus("error")
    }
  }, [])

  // Handle password reset
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      }, {
        // Pass the token received in URL
        accessToken: token,
      })

      if (error) {
        console.error("Reset error:", error)
        setStatus("error")
        toast({
          title: "Reset Failed",
          description: error.message,
        })
      } else {
        setStatus("success")
        toast({
          title: "Password Reset",
          description: "Your password has been updated successfully!",
        })
      }
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8">
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="text-center">
            {status === "loading" && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
                <h1 className="text-2xl font-bold">Processing...</h1>
                <p className="text-muted-foreground mt-2">Please wait...</p>
              </>
            )}

            {status === "form" && (
              <>
                <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
                <form onSubmit={handleReset} className="space-y-4">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                  />
                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                </form>
              </>
            )}

            {status === "success" && (
              <>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-2xl font-bold">Password Reset</h1>
                <p className="text-muted-foreground mt-2">
                  Your password has been updated successfully. You can now log in.
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="flex justify-center mb-4">
                  <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold">Reset Failed</h1>
                <p className="text-muted-foreground mt-2">
                  Invalid or expired token. Please try again.
                </p>
              </>
            )}
          </div>

          <div className="space-y-3">
            {status === "success" && (
              <Button onClick={() => router.push("/auth/login")} className="w-full">
                Go to Login
              </Button>
            )}
            {status === "error" && (
              <Button onClick={() => router.push("/auth/forgot-password")} className="w-full">
                Try Again
              </Button>
            )}
            <Button variant="outline" onClick={() => router.push("/")} className="w-full">
              Back to Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

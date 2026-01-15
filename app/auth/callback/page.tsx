"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

const ADMIN_EMAIL = "sangamkunwar48@gmail.com"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          router.replace("/auth/login?error=callback_failed")
          return
        }

        if (!session) {
          router.replace("/")
          return
        }

        if (session.user.email === ADMIN_EMAIL) {
          router.replace("/admin")
        } else {
          router.replace("/dashboard")
        }
      } catch (err) {
        console.error("Unexpected callback error:", err)
        router.replace("/auth/login")
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
        <p className="text-muted-foreground">
          Completing authentication…
        </p>
      </div>
    </div>
  )
}

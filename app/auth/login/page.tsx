"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleOAuthLogin = async (provider: "github" | "google") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
      if (!data?.url) throw new Error("OAuth redirect URL not generated")
    } catch (err: any) {
      console.error("[Sangam Kunwar] OAuth Error:", err)
      toast({
        title: "OAuth Login Failed",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (!data.user?.email_confirmed_at) {
        await supabase.auth.signOut()
        toast({
          title: "Email Not Verified",
          description: "Please verify your email before logging in.",
        })
        return
      }

      toast({
        title: "Login Successful",
        description: "Redirecting...",
      })

      setTimeout(() => {
        if (email === "sangamkunwar48@gmail.com") {
          console.log("[Sangam Kunwar] Redirecting to admin panel")
          window.location.href = "/admin"
        } else {
          console.log("[Sangam Kunwar] Redirecting to dashboard")
          window.location.href = "/dashboard"
        }
      }, 800)
    } catch (err: any) {
      console.error("[Sangam Kunwar] Login Error:", err)
      toast({
        title: "Login Failed",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      toast({
        title: "Reset Link Sent",
        description: "Check your email for password reset instructions.",
      })
      setForgotPassword(false)
    } catch (err: any) {
      console.error("[Sangam Kunwar] Reset Password Error:", err)
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="space-y-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {forgotPassword ? "Reset Password" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {forgotPassword
                ? "Enter your email to receive a reset link"
                : "Sign in to your account"}
            </p>
          </div>

          {!forgotPassword ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Button className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <button
                  type="button"
                  onClick={() => setForgotPassword(true)}
                  className="text-xs text-primary hover:underline text-right w-full"
                >
                  Forgot password?
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleOAuthLogin("github")}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="GitHub"
                    width={18}
                    height={18}
                  />
                  GitHub
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleOAuthLogin("google")}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </div>
            </>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button className="w-full" disabled={loading}>
                {loading ? "Sending link..." : "Send Reset Link"}
              </Button>
              <Button variant="ghost" onClick={() => setForgotPassword(false)}>
                Back to Login
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

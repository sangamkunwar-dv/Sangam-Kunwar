"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Github, Mail } from "lucide-react"

const ADMIN_EMAIL = "sangamkunwar48@gmail.com"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleOAuthLogin = async (provider: "github" | "google") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (err: any) {
      toast({
        title: "OAuth Error",
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

      if (error || !data.user) {
        toast({
          title: "Login Failed",
          description: error?.message || "Invalid credentials",
          variant: "destructive",
        })
        return
      }

      if (!data.user.email_confirmed_at) {
        toast({
          title: "Email Not Verified",
          description: "Please verify your email before logging in.",
          variant: "destructive",
        })
        await supabase.auth.signOut()
        return
      }

      toast({
        title: "Success",
        description: "Logged in successfully!",
      })

      if (data.user.email === ADMIN_EMAIL) {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Unexpected login error",
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
        description: "Check your email for the reset link.",
      })

      setForgotPassword(false)
    } catch (err: any) {
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
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
              </form>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleOAuthLogin("github")}>
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Button>
                <Button variant="outline" onClick={() => handleOAuthLogin("google")}>
                  <Mail className="mr-2 h-4 w-4" /> Google
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
                Send Reset Link
              </Button>
              <Button variant="ghost" onClick={() => setForgotPassword(false)}>
                Back to Login
              </Button>
            </form>
          )}
        </div>
      </Card>
    </div>
  )
}

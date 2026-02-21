"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  // 🔥 Social Login Function
  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      if (data.user) {
        toast({
          title: "Account Created!",
          description:
            "Please check your email and verify your account.",
        })

        setTimeout(() => {
          router.push("/auth/verify-email")
        }, 1500)
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Unexpected error occurred",
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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground mt-2">
              Join to send me messages
            </p>
          </div>

          {/* 🔥 GOOGLE LOGIN */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => handleOAuthLogin("google")}
            disabled={loading}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>

          {/* 🔥 GITHUB LOGIN */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => handleOAuthLogin("github")}
            disabled={loading}
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-5 h-5"
            />
            Continue with GitHub
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            OR
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
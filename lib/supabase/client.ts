"use client"

import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://brczzheawdhzybtzrqeg.supabase.co"
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyY3p6aGVhd2RoenlidHpycWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MzQ4OTUsImV4cCI6MjA4NjUxMDg5NX0.4_sX3Ll9zY-YcxNCgxOuv8ZX4UPnuur8KSUtgoOWFsc"

  if (!url || !key) {
    console.error("[v0] ⚠️  CRITICAL: Supabase URL or Key is missing")
    console.error("[v0] Please check environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY")
  } else {
    console.log("[v0] ✅ Supabase client initialized")
  }

  return createBrowserClient(url, key)
}

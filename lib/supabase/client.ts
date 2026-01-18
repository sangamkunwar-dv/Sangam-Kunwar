"use client"

import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aydaylqulmokedvkemwo.supabase.co"
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5ZGF5bHF1bG1va2VkdmtlbXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTA3OTgsImV4cCI6MjA3ODc4Njc5OH0.45LTMHN4kBwqC6IVbWZgf7bzjDBsFru4hryZU0Y3jww"

  if (!url || !key) {
    console.error("[v0] ⚠️  CRITICAL: Supabase URL or Key is missing")
    console.error("[v0] Please check environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY")
  } else {
    console.log("[v0] ✅ Supabase client initialized")
  }

  return createBrowserClient(url, key)

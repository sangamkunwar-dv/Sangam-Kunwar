"use client"

import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zesmpcgpkgfauaknjxni.supabase.co"
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inplc21wY2dwa2dmYXVha25qeG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NzI3MzUsImV4cCI6MjA4NDE0ODczNX0.FC4zpeeBR_o1dMqjRCY1JW6Lsx2tk0RAI770_sC2cFw"

  if (!url || !key) {
    console.error("[v0] ⚠️  CRITICAL: Supabase URL or Key is missing")
    console.error("[v0] Please check environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY")
  } else {
    console.log("[v0] ✅ Supabase client initialized")
  }

  return createBrowserClient(url, key)
}

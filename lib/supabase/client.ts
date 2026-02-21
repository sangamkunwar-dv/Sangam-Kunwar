"use client"

// ✅ Import from supabase-js for browser/client operations
import { createClient as createBrowserClient } from "@supabase/supabase-js"

export function createClient() {
  // ✅ Read URL and ANON KEY from environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // ⚠️ Check if env variables are missing
  if (!url || !key) {
    console.error("[Supabase Client] ⚠️ CRITICAL: URL or ANON_KEY missing!")
    console.error(
      "Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local"
    )
  } else {
    console.log("[Supabase Client] ✅ Initialized successfully")
  }

  // ✅ Create and return the Supabase client
  return createBrowserClient(url!, key!)
}
"use client"

import { createBrowserClient } from "@supabase/ssr"

/**
 * Shared browser-side Supabase client
 * Safe for Netlify + Next.js App Router
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)

/**
 * Alias for compatibility with existing imports
 * (prevents Turbopack build errors)
 */
export function createClient() {
  return supabase
}

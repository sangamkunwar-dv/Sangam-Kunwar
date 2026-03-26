import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET
export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("hero_settings")
      .select("*")
      .limit(1)
      .maybeSingle()

    if (error) throw error

    return NextResponse.json(data || {})
  } catch (error) {
    console.error("Hero GET:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT
export async function PUT(request) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data: existing, error: fetchError } = await supabase
      .from("hero_settings")
      .select("id")
      .limit(1)
      .maybeSingle()

    if (fetchError) throw fetchError

    if (existing) {
      const { data, error } = await supabase
        .from("hero_settings")
        .update({
          ...body,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    } else {
      const { data, error } = await supabase
        .from("hero_settings")
        .insert([body])
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }
  } catch (error) {
    console.error("Hero PUT:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
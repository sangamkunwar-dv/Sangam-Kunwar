import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET
export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("level", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Skills GET:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST
export async function POST(request) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("skills")
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Skills POST:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
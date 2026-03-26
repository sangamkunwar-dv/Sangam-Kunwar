import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET
export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Projects GET:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST
export async function POST(request) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("projects")
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Projects POST:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT
export async function PUT(request) {
  try {
    const supabase = createClient()
    const body = await request.json()

    if (!body.id) throw new Error("ID required")

    const { data, error } = await supabase
      .from("projects")
      .update(body)
      .eq("id", body.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Projects PUT:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) throw new Error("ID required")

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Projects DELETE:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
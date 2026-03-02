import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

const getSupabaseClient = () => {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        },
      },
    },
  )
}

// GET /api/projects
export async function GET() {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (err: any) {
    console.error("GET /api/projects error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST /api/projects
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("projects").insert([body]).select()
    if (error) throw error
    return NextResponse.json(data[0], { status: 201 })
  } catch (err: any) {
    console.error("POST /api/projects error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// PUT /api/projects/:id
export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop() // last segment = project id
    const body = await req.json()
    if (!id) throw new Error("Project ID is required")

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("projects")
      .update(body)
      .eq("id", id)
      .select()

    if (error) throw error
    return NextResponse.json(data[0])
  } catch (err: any) {
    console.error("PUT /api/projects error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE /api/projects/:id
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop()
    if (!id) throw new Error("Project ID is required")

    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("projects").delete().eq("id", id).select()
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("DELETE /api/projects error:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
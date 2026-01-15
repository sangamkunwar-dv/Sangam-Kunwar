"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import AdminSidebar from "@/components/admin/sidebar"
import ProjectsManager from "@/components/admin/projects-manager"
import EventsManager from "@/components/admin/events-manager"
import CollaboratorsManager from "@/components/admin/collaborators-manager"
import DashboardOverview from "@/components/admin/dashboard-overview"
import MessagesManager from "@/components/admin/messages-manager"
import AdminSettings from "@/components/admin/admin-settings"
import HeroSettings from "@/components/admin/hero-settings"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

type AdminTab =
  | "overview"
  | "hero"
  | "projects"
  | "events"
  | "collaborators"
  | "messages"
  | "settings"

const ADMIN_EMAIL = "sangamkunwar48@gmail.com"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      const user = data.session?.user

      if (!user) {
        router.replace("/auth/login?redirect=/admin")
        return
      }

      if (user.email !== ADMIN_EMAIL) {
        toast({
          title: "Access denied",
          description: "Admin access only",
          variant: "destructive",
        })
        router.replace("/")
        return
      }

      setLoading(false)
    }

    init()
  }, [router, supabase, toast])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-40" />
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === "overview" && <DashboardOverview />}
        {activeTab === "hero" && <HeroSettings />}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "events" && <EventsManager />}
        {activeTab === "collaborators" && <CollaboratorsManager />}
        {activeTab === "messages" && <MessagesManager />}
        {activeTab === "settings" && <AdminSettings userEmail={ADMIN_EMAIL} />}
      </main>
    </div>
  )
}

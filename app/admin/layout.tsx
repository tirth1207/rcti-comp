import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNavigation } from "@/components/admin-navigation"
import { SidebarInset, SidebarProvider, SidebarTrigger } from
 "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ParamsBreadcrumb } from "@/components/dynamic-breadcrumb"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
      <AppSidebar email={profile?.email} name={profile?.name} />
      <SidebarInset>

      {/* Main content */}
      <div className="">
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex flex-row items-center gap-4">
              <SidebarTrigger className="-ml-1" />
              <ParamsBreadcrumb />
            </div>
            {children}
          </div>
        </main>
      </div>
      </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

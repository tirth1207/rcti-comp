import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AdminEventsList } from "@/components/admin-events-list"

export default async function EventsPage() {
  const supabase = await createClient()
  const { data: events, error } = await supabase.from("events").select("*").order("created_at", { ascending: false })


  if (error) {
    console.error("Error fetching events:", error)
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
          <p className="text-muted-foreground">Manage department events and photo galleries</p>
        </div>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </Link>
      </div>
      <AdminEventsList events={events || []} />
    </div>
  )
}

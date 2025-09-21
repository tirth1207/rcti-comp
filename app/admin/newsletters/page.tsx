import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, FileText } from "lucide-react"
import { AdminNewsletterList } from "@/components/admin-newsletter-list"

export default async function NewslettersPage() {
  const supabase = await createClient()

  const { data: newsletters, error } = await supabase
    .from("newsletters")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching newsletters:", error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Newsletters</h1>
          <p className="text-muted-foreground">Manage department newsletters and announcements</p>
        </div>
        <Link href="/admin/newsletters/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Newsletter
          </Button>
        </Link>
      </div>
      <AdminNewsletterList items={newsletters || []} />
    </div>
  )
}

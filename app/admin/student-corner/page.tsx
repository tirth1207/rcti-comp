import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Bell } from "lucide-react"
import { AdminStudentCornerList } from "@/components/admin-student-corner-list"

export default async function StudentCornerPage() {
  const supabase = await createClient()

  const { data: notices, error } = await supabase
    .from("students_corner")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching student notices:", error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Corner</h1>
          <p className="text-muted-foreground">Manage student notices, results, and announcements</p>
        </div>
        <Link href="/admin/student-corner/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Notice
          </Button>
        </Link>
      </div>
      <AdminStudentCornerList items={notices || []} />
    </div>
  )
}

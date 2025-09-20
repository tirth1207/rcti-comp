import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Bell, Edit, Trash2, Download } from "lucide-react"

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

      {/* Notices List */}
      {notices && notices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.map((notice) => (
            <Card key={notice.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Bell className="h-5 w-5 text-accent mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{notice.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(notice.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Link href={`/admin/student-corner/${notice.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 whitespace-pre-wrap">{notice.description}</CardDescription>
                {notice.file_url && (
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Attachment
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No notices found</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first student notice.</p>
            <Link href="/admin/student-corner/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Notice
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

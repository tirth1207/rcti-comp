import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, FileText, Edit, Trash2, Download } from "lucide-react"

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

      {/* Newsletters List */}
      {newsletters && newsletters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map((newsletter) => (
            <Card key={newsletter.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{newsletter.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(newsletter.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Link href={`/admin/newsletters/${newsletter.id}/edit`}>
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
                <CardDescription className="mb-4">{newsletter.description}</CardDescription>
                {newsletter.file_url && (
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No newsletters found</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first newsletter.</p>
            <Link href="/admin/newsletters/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Newsletter
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

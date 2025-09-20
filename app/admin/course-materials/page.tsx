import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, BookOpen, Edit, Trash2, Download } from "lucide-react"

export default async function CourseMaterialsPage() {
  const supabase = await createClient()

  const { data: materials, error } = await supabase
    .from("course_materials")
    .select("*")
    .order("semester", { ascending: true })
    .order("subject", { ascending: true })

  if (error) {
    console.error("Error fetching course materials:", error)
  }

  // Group materials by semester
  const materialsBySemester =
    materials?.reduce(
      (acc, material) => {
        const semester = material.semester
        if (!acc[semester]) {
          acc[semester] = []
        }
        acc[semester].push(material)
        return acc
      },
      {} as Record<number, typeof materials>,
    ) || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Materials</h1>
          <p className="text-muted-foreground">Manage course materials, notes, and study resources</p>
        </div>
        <Link href="/admin/course-materials/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Button>
        </Link>
      </div>

      {/* Materials List */}
      {Object.keys(materialsBySemester).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(materialsBySemester)
            .sort(([a], [b]) => Number.parseInt(a) - Number.parseInt(b))
            .map(([semester, semesterMaterials]) => (
              <div key={semester}>
                <h2 className="text-2xl font-bold text-foreground mb-4">Semester {semester}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {semesterMaterials.map((material) => (
                    <Card key={material.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <BookOpen className="h-5 w-5 text-primary mt-1" />
                            <div className="flex-1">
                              <CardTitle className="text-lg">{material.subject}</CardTitle>
                              <CardDescription className="font-medium">{material.title}</CardDescription>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Link href={`/admin/course-materials/${material.id}/edit`}>
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
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">Semester {material.semester}</Badge>
                          {material.file_url && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {new Date(material.created_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No course materials found</h3>
            <p className="text-muted-foreground mb-4">Get started by uploading your first course material.</p>
            <Link href="/admin/course-materials/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

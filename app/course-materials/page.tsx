import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Download } from "lucide-react"

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
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Course Materials</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access study materials, notes, presentations, and resources organized by semester and subject
          </p>
        </div>

        {Object.keys(materialsBySemester).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(materialsBySemester)
              .sort(([a], [b]) => Number.parseInt(a) - Number.parseInt(b))
              .map(([semester, semesterMaterials]) => (
                <div key={semester}>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Semester {semester}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {semesterMaterials.map((material) => (
                      <Card key={material.id} className="h-full">
                        <CardHeader>
                          <div className="flex items-start space-x-3">
                            <BookOpen className="h-6 w-6 text-primary mt-1" />
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-1">{material.subject}</CardTitle>
                              <CardDescription className="font-medium">{material.title}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              {new Date(material.created_at).toLocaleDateString()}
                            </p>
                            {material.file_url && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No course materials available</h3>
            <p className="text-muted-foreground">Course materials will be uploaded by faculty members soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}

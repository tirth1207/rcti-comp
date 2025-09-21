import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, FileText, Edit, Trash2, Download, ExternalLink, ArrowLeft, Presentation, FileImage, File } from "lucide-react"

// Helper function to get file icon
function getFileIcon(fileName: string | null, category: string) {
  if (!fileName) return File

  const extension = fileName.split('.').pop()?.toLowerCase()
  
  switch (extension) {
    case 'pdf':
      return FileText
    case 'ppt':
    case 'pptx':
      return Presentation
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return FileImage
    default:
      switch (category.toLowerCase()) {
        case 'notes':
        case 'syllabus':
          return FileText
        case 'presentations':
        case 'slides':
          return Presentation
        default:
          return File
      }
  }
}

// Helper function to get category color
function getCategoryColor(category: string) {
  const colors = {
    'notes': 'bg-blue-50 text-blue-700 border-blue-200',
    'presentations': 'bg-green-50 text-green-700 border-green-200',
    'assignments': 'bg-orange-50 text-orange-700 border-orange-200',
    'syllabus': 'bg-purple-50 text-purple-700 border-purple-200',
    'resources': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'default': 'bg-gray-50 text-gray-700 border-gray-200'
  }
  
  return colors[category.toLowerCase() as keyof typeof colors] || colors.default
}

interface Props {
  params: {
    id: string
  }
}

export default async function AdminSubjectResourcesPage({ params }: Props) {
  const supabase = await createClient()

  // Get subject information
  const { data: subject, error: subjectError } = await supabase
    .from("subjects")
    .select("*")
    .eq("id", params.id)
    .single()

  if (subjectError || !subject) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-2">Subject Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested subject could not be found.</p>
          <Link href="/admin/subjects">
            <Button variant="outline">Back to Subjects</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get resources for this subject
  const { data: resources, error: resourcesError } = await supabase
    .from("resources")
    .select("*")
    .eq("subject_id", params.id)
    .order("category")
    .order("created_at", { ascending: false })

  if (resourcesError) {
    console.error("Error fetching resources:", resourcesError)
  }

  // Group resources by category
  const resourcesByCategory: Record<string, any[]> = {}
  resources?.forEach((resource) => {
    const category = resource.category || 'Other'
    if (!resourcesByCategory[category]) {
      resourcesByCategory[category] = []
    }
    resourcesByCategory[category].push(resource)
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/subjects">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">{subject.name}</h1>
            {subject.code && (
              <Badge variant="outline">{subject.code}</Badge>
            )}
            <Badge variant="secondary">Semester {subject.semester}</Badge>
          </div>
          <p className="text-muted-foreground">Manage resources and study materials</p>
        </div>
        <Link href={`/admin/subjects/${params.id}/resources/new`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(resourcesByCategory).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Link href={`/admin/subjects/${params.id}/edit`}>
            <Button variant="outline" size="sm">
              Edit Subject
            </Button>
          </Link>
          <Link href={`/course-materials/semester-${subject.semester}/${params.id}`} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Public Page
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Resources List */}
      {resources && resources.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(resourcesByCategory).map(([category, categoryResources]) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">{category}</h2>
                <Badge variant="outline">
                  {categoryResources.length} item{categoryResources.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryResources.map((resource) => {
                  const IconComponent = getFileIcon(resource.file_url, resource.category)
                  const categoryColorClass = getCategoryColor(resource.category)
                  
                  return (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`p-2 rounded-lg ${categoryColorClass}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg line-clamp-2">
                                {resource.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {new Date(resource.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-1 ml-2">
                            <Link href={`/admin/subjects/${params.id}/resources/${resource.id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <form action={`/api/admin/resources/${resource.id}/delete`} method="POST">
                              <Button variant="ghost" size="sm" type="submit">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </form>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-xs">
                            {resource.category}
                          </Badge>
                          {resource.file_url && (
                            <div className="flex space-x-2">
                              <a
                                href={resource.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                              <a
                                href={resource.file_url}
                                download
                              >
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </a>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {resource.file_url ? 'File attached' : 'No file attached'}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding study materials for {subject.name}.
            </p>
            <Link href={`/admin/subjects/${params.id}/resources/new`}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Management Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Categories:</strong> Organize resources by type (Notes, Presentations, Assignments, etc.)</p>
            <p><strong>File Upload:</strong> Supported formats include PDF, PPT, DOC, images, and more</p>
            <p><strong>Public Access:</strong> All resources will be visible to students browsing the subject</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
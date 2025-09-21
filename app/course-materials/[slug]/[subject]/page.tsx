import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronLeft, Download, ExternalLink, FileText, Presentation, FileImage, File } from "lucide-react"
import Link from "next/link"
import { Sub } from "@radix-ui/react-navigation-menu"

// Helper function to parse semester info from slug
function parseSemesterSlug(slug: string) {
  const patterns = [
    { pattern: /^semester-(\d+)-(old|nep)$/, handler: (match: RegExpMatchArray) => ({ 
      number: parseInt(match[1]), 
      type: match[2] as 'old' | 'nep' 
    })},
    { pattern: /^semester-(\d+)$/, handler: (match: RegExpMatchArray) => ({ 
      number: parseInt(match[1]), 
      type: 'regular' as const 
    })}
  ]
  
  for (const { pattern, handler } of patterns) {
    const match = slug.match(pattern)
    if (match) {
      const result = handler(match)
      return {
        ...result,
        displayName: result.type === 'regular' 
          ? `Semester ${result.number}`
          : `Semester ${result.number} (${result.type.toUpperCase()})`
      }
    }
  }
  
  return null
}

// Helper function to get file icon based on file extension or category
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
      // Fall back to category-based icons
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

interface Subject {
  id: string
  name: string
  code: string | null
  semester: number
}

interface Resource {
  id: string
  subject_id: string
  category: string
  title: string
  file_url: string | null
  created_at: string
}

interface Props {
  params: { 
    slug: string
    subject: string
  }
}
  
export default async function SubjectResourcesPage({ params }: Props) {
  const { slug, subject: subjectId } = params
  console.log("Params:", params)
  console.log("Subject ID:", subjectId)
  console.log("Slug:", slug)
  const semesterInfo = parseSemesterSlug(slug)
  console.log("Semester Info:", semesterInfo)

  if (!semesterInfo) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Invalid Semester</h1>
              <p className="text-muted-foreground mb-4">The requested semester could not be found.</p>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const supabase = await createClient()

  // Get subject information
  const { data: subject, error: subjectError } = await supabase
    .from('subjects')
    .select('*')
    .eq('id', subjectId)
    .single()

  if (subjectError || !subject) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Subject Not Found</h1>
              <p className="text-muted-foreground mb-4">The requested subject could not be found.</p>
              <Link href={`/course-materials/${slug}`}>
                <Button variant="outline">Back to Semester</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Get resources for this subject
  const { data: resources, error: resourcesError } = await supabase
    .from('resources')
    .select('*')
    .eq('subject_id', subjectId)
    .order('category')
    .order('created_at', { ascending: false })

  if (resourcesError) {
    console.error('Error fetching resources:', resourcesError)
  }

  // Group resources by category
  const resourcesByCategory: Record<string, Resource[]> = {}
  resources?.forEach((resource) => {
    const category = resource.category || 'Other'
    if (!resourcesByCategory[category]) {
      resourcesByCategory[category] = []
    }
    resourcesByCategory[category].push(resource)
  })

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with navigation */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href={`/course-materials/${slug}`}>
              <Button variant="ghost" size="sm">
                {semesterInfo.displayName}
              </Button>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium">{subject.name}</span>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Badge variant="secondary">
                {semesterInfo.displayName}
              </Badge>
              {subject.code && (
                <Badge variant="outline">
                  {subject.code}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {subject.name}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Study materials, notes, and resources for this subject
            </p>
          </div>
        </div>

        {resources && resources.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(resourcesByCategory).map(([category, categoryResources]) => (
              <div key={category}>
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-bold text-foreground">{category}</h2>
                  <Badge variant="outline" className="ml-3">
                    {categoryResources.length} {categoryResources.length === 1 ? 'item' : 'items'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryResources.map((resource) => {
                    const IconComponent = getFileIcon(resource.file_url, resource.category)
                    const categoryColorClass = getCategoryColor(resource.category)
                    
                    return (
                      <Card key={resource.id} className="h-full hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${categoryColorClass}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg line-clamp-2">
                                {resource.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {new Date(resource.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {resource.category}
                            </Badge>
                            {resource.file_url ? (
                              <div className="flex space-x-2">
                                <a
                                  href={resource.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button variant="outline" size="sm">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open
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
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                No file
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto">
              <CardContent className="py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Resources Available
                </h3>
                <p className="text-muted-foreground mb-4">
                  No study materials have been uploaded for {subject.name} yet.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Resources will be added by faculty members.
                </p>
                <Link href={`/course-materials/${slug}`}>
                  <Button variant="outline">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Subjects
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Need More Resources?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  If you need additional study materials or have questions about this subject, feel free to reach out.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/contact">
                    <Button variant="outline">Contact Faculty</Button>
                  </Link>
                  <Link href="/feedback">
                    <Button variant="outline">Request Materials</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
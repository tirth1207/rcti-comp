import { createClient } from "@/lib/supabase/client"
import { slugToSemester } from "@/utils/slugToSemester"

interface Subject {
  id: string
  name: string
  code: string | null
}

interface Resource {
  id: string
  subject_id: string
  category: string
  title: string
  file_url: string | null
}

interface Props {
  params: { slug: string }
}

export default async function CourseMaterialsPage({ params }: Props) {
  const { slug } = params
  const semester = slugToSemester(slug)

  if (!semester) {
    return <p className="p-4">Invalid semester.</p>
  }

  const supabase = createClient()

  // 1. Get subjects for this semester
  const { data: subjects, error: subjectError } = await supabase
    .from<Subject>("subjects")
    .select("id, name, code")
    .eq("semester", semester)
    .order("name")
    console.log(subjects, subjectError)


  if (subjectError) {
    return <p className="p-4 text-red-500">Error fetching subjects: {subjectError.message}</p>
  }

  // 2. Get resources for all those subjects
  const { data: resources, error: resourceError } = await supabase
    .from<Resource>("resources")
    .select("*")
    .in("subject_id", subjects?.map((s) => s.id) ?? [])

  if (resourceError) {
    return <p className="p-4 text-red-500">Error fetching resources: {resourceError.message}</p>
  }

  // Group resources by subject + category
  const grouped: Record<string, Record<string, Resource[]>> = {}
  resources?.forEach((res) => {
    if (!grouped[res.subject_id]) grouped[res.subject_id] = {}
    if (!grouped[res.subject_id][res.category]) grouped[res.subject_id][res.category] = []
    grouped[res.subject_id][res.category].push(res)
  })

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Course Material of Semester {semester}</h1>

      {subjects?.length === 0 && <p>No subjects available for this semester.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects?.map((subject) => (
          <div key={subject.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-1">{subject.name}</h2>
            {subject.code && (
              <p className="text-sm text-muted-foreground mb-3">{subject.code}</p>
            )}

            {grouped[subject.id] ? (
              <div className="space-y-4">
                {Object.entries(grouped[subject.id]).map(([category, resList]) => (
                  <div key={category}>
                    <h3 className="font-medium mb-1">{category}</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {resList.map((res) => (
                        <li key={res.id}>
                          {res.file_url ? (
                            <a
                              href={res.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {res.title}
                            </a>
                          ) : (
                            res.title
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No resources available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

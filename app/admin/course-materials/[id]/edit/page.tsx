"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface EditCourseMaterialPageProps {
  params: {
    id: string
  }
}

export default function EditCourseMaterialPage({ params }: EditCourseMaterialPageProps) {
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [semester, setSemester] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadMaterial = async () => {
      const supabase = createClient()

      const { data, error } = await supabase.from("course_materials").select("*").eq("id", params.id).single()

      if (error) {
        console.error("Error loading course material:", error)
        router.push("/admin/course-materials")
        return
      }

      setTitle(data.title)
      setSubject(data.subject)
      setSemester(data.semester.toString())
      setCurrentFileUrl(data.file_url)
      setIsLoading(false)
    }

    loadMaterial()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      let fileUrl = currentFileUrl

      // Upload new file if provided
      if (file) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from("course-materials").upload(fileName, file)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("course-materials").getPublicUrl(fileName)

        fileUrl = publicUrl
      }

      // Update course material
      const { error } = await supabase
        .from("course_materials")
        .update({
          title,
          subject,
          semester: Number.parseInt(semester),
          file_url: fileUrl,
        })
        .eq("id", params.id)

      if (error) throw error

      router.push("/admin/course-materials")
    } catch (error) {
      console.error("Error updating course material:", error)
      alert("There was an error updating the course material. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/course-materials">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Loading...</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/course-materials">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Course Material</h1>
          <p className="text-muted-foreground">Update course material information</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Course Material Details</CardTitle>
          <CardDescription>Update the information for this course material</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter material title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select value={semester} onValueChange={setSemester} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {currentFileUrl && (
                <p className="text-sm text-muted-foreground">
                  Current file:{" "}
                  <a
                    href={currentFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View current file
                  </a>
                </p>
              )}
              <p className="text-sm text-muted-foreground">Upload a new file to replace the current one (optional)</p>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Updating..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Material
                  </>
                )}
              </Button>
              <Link href="/admin/course-materials">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

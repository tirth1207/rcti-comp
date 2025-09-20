"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewCourseMaterialPage() {
  const [subject, setSubject] = useState("")
  const [semester, setSemester] = useState("")
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      let fileUrl = null

      // Upload file if provided
      if (file) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from("materials").upload(fileName, file)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("materials").getPublicUrl(fileName)

        fileUrl = publicUrl
      }

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Insert course material
      const { error } = await supabase.from("course_materials").insert([
        {
          subject,
          semester: Number.parseInt(semester),
          title,
          file_url: fileUrl,
          uploaded_by: user?.id,
        },
      ])

      if (error) throw error

      router.push("/admin/course-materials")
    } catch (error) {
      console.error("Error creating course material:", error)
      alert("There was an error uploading the course material. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
          <h1 className="text-3xl font-bold text-foreground">Add Course Material</h1>
          <p className="text-muted-foreground">Upload a new course material or resource</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Course Material Details</CardTitle>
          <CardDescription>Fill in the information for the new course material</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Data Structures"
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to Arrays and Linked Lists"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">File (Optional)</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <p className="text-sm text-muted-foreground">Upload a PDF, PowerPoint, or Word document (optional)</p>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Uploading..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Upload Material
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

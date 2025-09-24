"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload } from "lucide-react"
import Link from "next/link"

interface Props {
  params: {
    id: string
  }
}

const RESOURCE_CATEGORIES = [
  "Notes",
  "Presentations",
  "Assignments",
  "Syllabus",
  "Resources",
  "Lab Manual",
  "Question Papers",
  "Reference Materials",
  "Other"
]

export default function NewResourcePage({ params }: Props) {
  const [subject, setSubject] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadSubject = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error) {
        console.error("Error loading subject:", error)
        router.push("/admin/subjects")
        return
      }

      setSubject(data)
      setIsLoading(false)
    }

    loadSubject()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!title.trim() || !category) {
      alert("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    const supabase = createClient()

    try {
      let fileUrl = null

      // Upload file if provided
      if (file) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from("resources")
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from("resources")
          .getPublicUrl(fileName)

        fileUrl = publicUrl
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()

      // Insert resource
      const { error } = await supabase.from("resources").insert([
        {
          subject_id: params.id,
          category: category,
          title: title.trim(),
          file_url: fileUrl,
          uploaded_by: user?.id,
        },
      ])

      if (error) throw error

      router.push(`/admin/subjects/${params.id}/resources`)
      router.refresh()
    } catch (error) {
      console.error("Error creating resource:", error)
      alert("There was an error creating the resource. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href={`/admin/subjects/${params.id}/resources`}>
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

  if (!subject) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-2">Subject Not Found</h1>
          <Link href="/admin/subjects">
            <Button variant="outline">Back to Subjects</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href={`/admin/subjects/${params.id}/resources`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Resource</h1>
          <p className="text-muted-foreground">
            Adding resource for: <strong>{subject.name}</strong>
            {subject.code && <span> ({subject.code})</span>}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Resource Details</CardTitle>
            <CardDescription>Fill in the information for the new resource</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Resource Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Introduction to Arrays - Lecture Notes"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter a descriptive title for this resource
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {RESOURCE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose the type of resource to help students find it easily
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
                  onChange={(e) => setFile(e.target.value || null)}
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, PPT, TXT, Images (Max 10MB)
                </p>
                {file && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Upload className="h-4 w-4" />
                    <span>File selected: {file.name}</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Creating..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Resource
                    </>
                  )}
                </Button>
                <Link href={`/admin/subjects/${params.id}/resources`}>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Resource Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Title:</strong> Use clear, descriptive names that help students understand the content</p>
              <p><strong>Category:</strong> Choose the most appropriate category for easy browsing</p>
              <p><strong>Files:</strong> Upload PDF for notes, PPT for presentations, images for diagrams</p>
              <p><strong>Quality:</strong> Ensure files are clear, readable, and properly formatted</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
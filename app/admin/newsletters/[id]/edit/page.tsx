"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface EditNewsletterPageProps {
  params: {
    id: string
  }
}

export default function EditNewsletterPage({ params }: EditNewsletterPageProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadNewsletter = async () => {
      const supabase = createClient()

      const { data, error } = await supabase.from("newsletters").select("*").eq("id", params.id).single()

      if (error) {
        console.error("Error loading newsletter:", error)
        router.push("/admin/newsletters")
        return
      }

      setTitle(data.title)
      setDescription(data.description || "")
      setCurrentFileUrl(data.file_url)
      setIsLoading(false)
    }

    loadNewsletter()
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

        const { error: uploadError } = await supabase.storage.from("newsletters").upload(fileName, file)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("newsletters").getPublicUrl(fileName)

        fileUrl = publicUrl
      }

      // Update newsletter
      const { error } = await supabase
        .from("newsletters")
        .update({
          title,
          description,
          file_url: fileUrl,
        })
        .eq("id", params.id)

      if (error) throw error

      router.push("/admin/newsletters")
    } catch (error) {
      console.error("Error updating newsletter:", error)
      alert("There was an error updating the newsletter. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/newsletters">
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
        <Link href="/admin/newsletters">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Newsletter</h1>
          <p className="text-muted-foreground">Update newsletter information</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Newsletter Details</CardTitle>
          <CardDescription>Update the information for this newsletter</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter newsletter title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter newsletter description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">PDF File</Label>
              <Input id="file" type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {currentFileUrl && (
                <p className="text-sm text-muted-foreground">
                  Current file:{" "}
                  <a
                    href={currentFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View current PDF
                  </a>
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Upload a new PDF file to replace the current one (optional)
              </p>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Updating..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Newsletter
                  </>
                )}
              </Button>
              <Link href="/admin/newsletters">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

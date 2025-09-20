"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewNewsletterPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
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

        const { error: uploadError } = await supabase.storage.from("newsletters").upload(fileName, file)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("newsletters").getPublicUrl(fileName)

        fileUrl = publicUrl
      }

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Insert newsletter
      const { error } = await supabase.from("newsletters").insert([
        {
          title,
          description,
          file_url: fileUrl,
          created_by: user?.id,
        },
      ])

      if (error) throw error

      router.push("/admin/newsletters")
    } catch (error) {
      console.error("Error creating newsletter:", error)
      alert("There was an error creating the newsletter. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
          <h1 className="text-3xl font-bold text-foreground">Add Newsletter</h1>
          <p className="text-muted-foreground">Create a new newsletter or announcement</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Newsletter Details</CardTitle>
          <CardDescription>Fill in the information for the new newsletter</CardDescription>
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
              <Label htmlFor="file">PDF File (Optional)</Label>
              <Input id="file" type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <p className="text-sm text-muted-foreground">Upload a PDF file for the newsletter (optional)</p>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Newsletter
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

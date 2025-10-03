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

interface EditEventPageProps {
  params: {
    id: string
  }
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [images, setImages] = useState<string[]>([""])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadEvent = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error) {
        console.error("Error loading event:", error)
        router.push("/admin/events")
        return
      }

      setTitle(data.title)
      setDescription(data.description || "")
      setDate(data.date ? new Date(data.date).toISOString().split("T")[0] : "")
      setLocation(data.location || "")
      setImages(data.images && data.images.length > 0 ? data.images : [""])
      setIsLoading(false)
    }

    loadEvent()
  }, [params.id, router])

  const handleImageUrlChange = (idx: number, value: string) => {
    setImages((prev) => {
      const arr = [...prev]
      arr[idx] = value
      return arr
    })
  }

  const addImageField = () => setImages((prev) => [...prev, ""])
  const removeImageField = (idx: number) =>
    setImages((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("events")
        .update({
          title: title.trim(),
          description: description.trim() || null,
          date: date ? new Date(date).toISOString().split("T")[0] : null,
          location: location.trim() || null,
          images: images.filter((url) => url.trim() !== ""),
        })
        .eq("id", params.id)

      if (error) throw error

      router.push("/admin/events")
    } catch (error) {
      console.error("Error updating event:", error)
      alert("There was an error updating the event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/events">
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
        <Link href="/admin/events">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Event</h1>
          <p className="text-muted-foreground">Update event information</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Update the information for this event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter event location"
              />
            </div>

            <div className="space-y-2">
              <Label>Event Image URLs (Google Drive or direct links)</Label>
              {images.map((url, idx) => (
                <div key={idx} className="flex space-x-2 mb-2">
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                    placeholder="https://drive.google.com/file/d/.../view"
                  />
                  {images.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeImageField(idx)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addImageField}>
                Add Another Image
              </Button>
              <p className="text-sm text-muted-foreground">
                Paste one or more Google Drive or direct image links (optional)
              </p>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Updating..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Event
                  </>
                )}
              </Button>
              <Link href="/admin/events">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

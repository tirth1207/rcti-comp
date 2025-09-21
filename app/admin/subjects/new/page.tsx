"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { AVAILABLE_SEMESTERS } from "@/utils/semesterUtils"

export default function NewSubjectPage() {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [semester, setSemester] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Get unique semester numbers for the dropdown
  const semesterNumbers = Array.from(
    new Set(AVAILABLE_SEMESTERS.map(s => s.number))
  ).sort((a, b) => a - b)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!name.trim() || !semester) {
      alert("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    const supabase = createClient()

    try {
      const { error } = await supabase.from("subjects").insert([
        {
          name: name.trim(),
          code: code.trim() || null,
          semester: parseInt(semester),
        },
      ])

      if (error) throw error

      router.push("/admin/subjects")
      router.refresh()
    } catch (error) {
      console.error("Error creating subject:", error)
      alert("There was an error creating the subject. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Subject</h1>
          <p className="text-muted-foreground">Create a new subject for the curriculum</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Subject Details</CardTitle>
            <CardDescription>Fill in the information for the new subject</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Subject Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Data Structures and Algorithms"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter the full name of the subject as it appears in the curriculum
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Subject Code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g., CS301, IT205"
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Enter the subject code (e.g., CS301, IT205)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">
                  Semester <span className="text-destructive">*</span>
                </Label>
                <Select value={semester} onValueChange={setSemester} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesterNumbers.map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select the semester in which this subject is taught
                </p>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Creating..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Subject
                    </>
                  )}
                </Button>
                <Link href="/admin/subjects">
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
            <CardTitle className="text-lg">Tips for Adding Subjects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2"><strong>Subject Name:</strong> Use the official name from your curriculum</p>
              <p className="mb-2"><strong>Subject Code:</strong> Include department prefix and number (optional but recommended)</p>
              <p><strong>Semester:</strong> This subject will appear for students browsing that semester</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
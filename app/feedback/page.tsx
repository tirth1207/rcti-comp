"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Send } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FeedbackPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("feedback").insert([
        {
          name,
          email,
          message,
        },
      ])

      if (error) throw error

      setSubmitted(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("There was an error submitting your feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                <MessageSquare className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <CardDescription>
                Your feedback has been submitted successfully. We appreciate your input and will review it carefully.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Submit Another Feedback
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Feedback</h1>
          <p className="text-muted-foreground">
            We value your feedback and suggestions. Help us improve our department and services by sharing your thoughts
            with us.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <MessageSquare className="h-6 w-6" />
              <span>Share Your Feedback</span>
            </CardTitle>
            <CardDescription>
              Your feedback is important to us and helps us continuously improve our programs and services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your feedback, suggestions, or comments..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

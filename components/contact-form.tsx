"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client" // your Supabase client
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  const supabase = createClient()

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { error } = await supabase.from("contact").insert([formData])

    if (error) {
      console.error("Error inserting contact:", error)
      setError("Something went wrong. Please try again later.")
    } else {
      setSuccess(true)
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        message: "",
      })
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 m-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter your first name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" value={formData.last_name} onChange={handleChange} placeholder="Enter your last name" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" value={formData.subject} onChange={handleChange} placeholder="Enter the subject" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Enter your message" rows={6} />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>

      {success && <p className="text-green-600">✅ Message sent successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  )
}

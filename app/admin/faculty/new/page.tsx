"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewFacultyPage() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClient();
    try {
      // Insert faculty
      const { error } = await supabase.from("faculty").insert([
        {
          name: name.trim(),
          designation: designation.trim(),
          qualification: qualification.trim() || null,
          photo_url: photoUrl.trim() || null,
          contact: contact.trim() || null,
        },
      ]);
      if (error) throw error;
      router.push("/admin/faculty");
    } catch (error) {
      console.error("Error creating faculty:", error);
      alert("There was an error creating the faculty member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/faculty">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Faculty</h1>
          <p className="text-muted-foreground">Add a new faculty member to the department</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Details</CardTitle>
          <CardDescription>Fill in the information for the new faculty member</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter faculty name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation <span className="text-destructive">*</span></Label>
              <Input
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g., Assistant Professor"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g., PhD, M.Tech, B.E."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photoUrl">Profile Photo URL (Google Drive or direct link)</Label>
              <Input
                id="photoUrl"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/.../view"
              />
              <p className="text-sm text-muted-foreground">Paste a Google Drive or direct image link for the faculty profile (optional)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Email or phone (optional)"
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Faculty
                  </>
                )}
              </Button>
              <Link href="/admin/faculty">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

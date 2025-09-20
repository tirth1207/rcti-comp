import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Users, Edit, Trash2, Mail, User } from "lucide-react"
import Image from "next/image"

export default async function FacultyPage() {
  const supabase = await createClient()

  const { data: faculty, error } = await supabase.from("faculty").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching faculty:", error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Management</h1>
          <p className="text-muted-foreground">Manage faculty profiles and information</p>
        </div>
        <Link href="/admin/faculty/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty
          </Button>
        </Link>
      </div>

      {/* Faculty List */}
      {faculty && faculty.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member) => (
            <Card key={member.id}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {member.photo_url ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden">
                      <Image
                        src={member.photo_url || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="font-medium text-primary">{member.designation}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {member.qualification && (
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Qualification:</strong> {member.qualification}
                  </p>
                )}
                {member.contact && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{member.contact}</span>
                  </div>
                )}
                <div className="flex space-x-2 pt-2">
                  <Link href={`/admin/faculty/${member.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No faculty members found</h3>
            <p className="text-muted-foreground mb-4">Get started by adding your first faculty member.</p>
            <Link href="/admin/faculty/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Faculty
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

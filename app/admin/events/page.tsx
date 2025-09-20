import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Calendar, Edit, Trash2, Camera } from "lucide-react"
import Image from "next/image"

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: events, error } = await supabase.from("events").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching events:", error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
          <p className="text-muted-foreground">Manage department events and photo galleries</p>
        </div>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </Link>
      </div>

      {/* Events List */}
      {events && events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="aspect-video bg-card relative">
                {event.images && event.images.length > 0 ? (
                  <Image src={event.images[0] || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Camera className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{new Date(event.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{event.description}</CardDescription>
                {event.images && event.images.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {event.images.length} photo{event.images.length !== 1 ? "s" : ""} in this album
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first event.</p>
            <Link href="/admin/events/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

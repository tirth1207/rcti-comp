import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Mail, User, Calendar } from "lucide-react"

export default async function FeedbackPage() {
  const supabase = await createClient()

  const { data: feedback, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching feedback:", error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Feedback Management</h1>
          <p className="text-muted-foreground">View and manage feedback from students and visitors</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {feedback?.length || 0} Total
        </Badge>
      </div>

      {/* Feedback List */}
      {feedback && feedback.length > 0 ? (
        <div className="space-y-4">
          {feedback.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{item.name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{item.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(item.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-card rounded-lg p-4 border-l-4 border-l-accent">
                  <p className="text-foreground whitespace-pre-wrap">{item.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No feedback received yet</h3>
            <p className="text-muted-foreground">Feedback from students and visitors will appear here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

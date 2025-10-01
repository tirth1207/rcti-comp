import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function FeedbackPage() {
  const supabase = await createClient()

  const { data: feedback, error } = await supabase
    .from("contact")
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
          <h1 className="text-3xl font-bold text-foreground">Contact Management</h1>
          <p className="text-muted-foreground">View and manage contact requests from students and visitors</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {feedback?.length || 0} Total
        </Badge>
      </div>

      {/* Feedback Table */}
      {feedback && feedback.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedback.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.first_name}</TableCell>
                  <TableCell>{item.last_name}</TableCell>
                  <TableCell><a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a></TableCell>
                  <TableCell className="whitespace-pre-wrap max-w-xs break-words">{item.message}</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No contact requests received yet</h3>
            <p className="text-muted-foreground">Contact requests from students and visitors will appear here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

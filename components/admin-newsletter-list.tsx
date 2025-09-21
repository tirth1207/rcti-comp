"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function AdminNewsletterList({ items }: { items: any[] }) {
  const [list, setList] = useState(items)

  async function handleDelete(id: any) {
    const supabase = createClient()
    const { error } = await supabase.from("newsletters").delete().eq("id", id)
    if (error) {
      alert("Error deleting newsletter: " + error.message)
    } else {
      setList(list.filter(e => e.id !== id))
    }
  }

  if (!list || list.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <h3 className="text-xl font-semibold text-foreground mb-2">No newsletters found</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first newsletter.</p>
          <Link href="/admin/newsletters/new">
            <Button>
              Add Newsletter
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-1">
                <Link href={`/admin/newsletters/${item.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
      {/* Faculty Table */}
      {faculty && faculty.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Photo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculty.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.designation}</TableCell>
                  <TableCell>{item.qualification}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>
                    {item.photo_url ? (
                      <a href={item.photo_url} target="_blank" rel="noopener noreferrer">
                        <img src={item.photo_url} alt={item.name} className="h-10 w-10 rounded-full object-cover" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-12">No faculty found.</div>
      )}
    </div>
  )
}

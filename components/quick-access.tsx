"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Calendar, FileText, MessageSquare, Award } from "lucide-react"

const links = [
  {
    title: "Course Materials",
    description: "Notes, PPTs, assignments, and labs.",
    icon: BookOpen,
    href: "/course-materials",
  },
  { title: "Faculty Directory", description: "Meet our experienced faculty.", icon: Users, href: "/faculty" },
  { title: "Events Gallery", description: "Photos and updates from events.", icon: Calendar, href: "/events" },
  {
    title: "Student Corner",
    description: "Notices and student announcements.",
    icon: FileText,
    href: "/student-corner",
  },
  { title: "Newsletter", description: "Latest department news.", icon: MessageSquare, href: "/newsletter" },
  { title: "Awards", description: "Honors and achievements.", icon: Award, href: "/awards" },
]

export function QuickAccess() {
  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Quick Access
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Navigate Our Department</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find the most important sections and resources quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <Card
              key={link.title}
              className="group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/60 hover:border-primary/20 hover:-translate-y-1 bg-card/60 backdrop-blur"
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <link.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{link.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{link.description}</p>
                <Link href={link.href}>
                  <Button variant="ghost" className="p-0 h-auto font-medium group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Users, Calendar, FileText, Award, MessageSquare } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch latest newsletters for announcements
  const { data: newsletters } = await supabase
    .from("newsletters")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3)

  const quickLinks = [
    {
      title: "Course Materials",
      description: "Access notes, presentations, and study materials",
      icon: BookOpen,
      href: "/course-materials",
      color: "text-blue-600",
    },
    {
      title: "Faculty Directory",
      description: "Meet our experienced faculty members",
      icon: Users,
      href: "/faculty",
      color: "text-green-600",
    },
    {
      title: "Events Gallery",
      description: "View photos from department events",
      icon: Calendar,
      href: "/events",
      color: "text-purple-600",
    },
    {
      title: "Student Corner",
      description: "Important notices and announcements",
      icon: FileText,
      href: "/student-corner",
      color: "text-orange-600",
    },
    {
      title: "Newsletter",
      description: "Stay updated with department news",
      icon: Award,
      href: "/newsletter",
      color: "text-red-600",
    },
    {
      title: "Feedback",
      description: "Share your thoughts and suggestions",
      icon: MessageSquare,
      href: "/feedback",
      color: "text-indigo-600",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Computer Science Department</h1>
            <p className="text-xl md:text-2xl mb-8 text-balance max-w-3xl mx-auto">
              Empowering the next generation of technology leaders through innovative education and cutting-edge
              research
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/course-materials">
                <Button size="lg" variant="secondary">
                  Explore Programs
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be a leading center of excellence in computer science education, fostering innovation, research,
                  and technological advancement that contributes to society's digital transformation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide comprehensive computer science education, conduct impactful research, and prepare students
                  to become ethical technology leaders who can solve complex global challenges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Access</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find what you need quickly with our organized resource sections
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <link.icon className={`h-8 w-8 ${link.color} group-hover:scale-110 transition-transform`} />
                      <CardTitle className="text-xl">{link.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{link.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Announcements */}
      {newsletters && newsletters.length > 0 && (
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Latest Announcements</h2>
              <p className="text-muted-foreground">Stay updated with the latest news from our department</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsletters.map((newsletter) => (
                <Card key={newsletter.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{newsletter.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{newsletter.description}</CardDescription>
                    <p className="text-sm text-muted-foreground">
                      {new Date(newsletter.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/newsletter">
                <Button variant="outline">View All Newsletters</Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

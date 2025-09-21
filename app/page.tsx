import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Users, Calendar, FileText, Award, MessageSquare, ArrowRight, Star, TrendingUp } from "lucide-react"
import { Hero } from "@/components/hero"
import { Feature74 } from "@/components/vision"
import { Feature16 } from "@/components/mission"

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
      description: "Access comprehensive notes, presentations, and study materials",
      icon: BookOpen,
      href: "/course-materials",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Faculty Directory",
      description: "Meet our experienced and dedicated faculty members",
      icon: Users,
      href: "/faculty",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Events Gallery",
      description: "Explore photos and highlights from department events",
      icon: Calendar,
      href: "/events",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Student Corner",
      description: "Important notices, announcements, and student resources",
      icon: FileText,
      href: "/student-corner",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Newsletter",
      description: "Stay updated with the latest department news and updates",
      icon: Award,
      href: "/newsletter",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Feedback",
      description: "Share your valuable thoughts and suggestions with us",
      icon: MessageSquare,
      href: "/feedback",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  const stats = [
    { label: "Students Enrolled", value: "500+", icon: Users },
    { label: "Faculty Members", value: "25+", icon: Star },
    { label: "Research Projects", value: "15+", icon: TrendingUp },
    { label: "Industry Partners", value: "30+", icon: Award },
  ]
{/* <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Foundation</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built on strong principles that guide our educational excellence
            </p>
          </div>
            <div className="flex flex-col gap-12">

            <div className="flex flex-col lg:flex-row items-center gap-8">

              <Card className="flex-1 border-2 hover:shadow-xl transition-all duration-300 group order-2 lg:order-1">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                To provide comprehensive computer science education, conduct impactful research, and prepare students
                to become ethical technology leaders who can solve complex global challenges.
                </p>
              </CardContent>
              </Card>

              <div className="flex-1 flex justify-center order-1 lg:order-2">
              <img
                src="/mission-illustration.png"
                alt="Mission Illustration"
                className="w-full max-w-xs rounded-xl shadow-lg"
                loading="lazy"
              />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8">

              <div className="flex-1 flex justify-center order-1">
              <img
                src="/vision-illustration.png"
                alt="Vision Illustration"
                className="w-full max-w-xs rounded-xl shadow-lg"
                loading="lazy"
              />
              </div>

              <Card className="flex-1 border-2 hover:shadow-xl transition-all duration-300 group order-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                To be a leading center of excellence in computer science education, fostering innovation, research,
                and technological advancement that contributes to society's digital transformation.
                </p>
              </CardContent>
              </Card>
            </div>
            </div>
        </div>
      </section> */}
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <Feature16 />
      

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Quick Access</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Navigate through our comprehensive resources designed to support your academic journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-14 h-14 ${link.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <link.icon className={`h-7 w-7 ${link.color}`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{link.description}</CardDescription>
                    <div className="flex items-center mt-4 text-primary group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {newsletters && newsletters.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Announcements</h2>
              <p className="text-muted-foreground text-lg">
                Stay updated with the latest news and updates from our department
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newsletters.map((newsletter, index) => (
                <Card key={newsletter.id} className="hover:shadow-lg transition-all duration-300 border-2">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">
                      {index === 0 ? "Latest" : "Recent"}
                    </Badge>
                    <CardTitle className="text-xl leading-tight">{newsletter.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-base leading-relaxed">
                      {newsletter.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {new Date(newsletter.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/newsletter">
                <Button variant="outline" size="lg" className="group bg-transparent">
                  View All Newsletters
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  BookOpen,
  Users,
  Calendar,
  FileText,
  Award,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react"
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
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10",
      borderColor: "border-blue-200/50 dark:border-blue-800/30",
    },
    {
      title: "Faculty Directory",
      description: "Meet our experienced and dedicated faculty members",
      icon: Users,
      href: "/faculty",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10",
      borderColor: "border-green-200/50 dark:border-green-800/30",
    },
    {
      title: "Events Gallery",
      description: "View photos and updates from department events",
      icon: Calendar,
      href: "/events",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10",
      borderColor: "border-purple-200/50 dark:border-purple-800/30",
    },
    {
      title: "Student Corner",
      description: "Important notices and student announcements",
      icon: FileText,
      href: "/student-corner",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10",
      borderColor: "border-orange-200/50 dark:border-orange-800/30",
    },
    {
      title: "Newsletter",
      description: "Stay updated with the latest department news",
      icon: MessageSquare,
      href: "/newsletter",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/20 dark:to-indigo-900/10",
      borderColor: "border-indigo-200/50 dark:border-indigo-800/30",
    },
    {
      title: "Feedback",
      description: "Share your thoughts and help us improve",
      icon: Award,
      href: "/feedback",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/20 dark:to-pink-900/10",
      borderColor: "border-pink-200/50 dark:border-pink-800/30",
    },
  ]

  const stats = [
    {
      label: "Students Enrolled",
      value: "500+",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      label: "Faculty Members",
      value: "25+",
      icon: Award,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      label: "Courses Offered",
      value: "40+",
      icon: BookOpen,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      label: "Research Projects",
      value: "15+",
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Campus Showcase Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.05),transparent)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Our Campus
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Experience Our Campus</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore our state-of-the-art facilities and vibrant campus environment designed for excellence in computer
              science education
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Building */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/0f0cef_165e63ee604f4f0ca5a88a183abd105c~mv2.jpg/v1/crop/x_141,y_0,w_231,h_231/fill/w_323,h_323,al_c,lg_1,q_80,enc_avif,quality_auto/main_building.jpg"
                    alt="Main Building - Computer Department"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">Main Building</h3>
                    <p className="text-sm text-white/90">Administrative Hub</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Campus Overview */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/88d7ff_b09b568c265d4ee18639953b04cd0348~mv2.jpg/v1/fill/w_1191,h_645,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/88d7ff_b09b568c265d4ee18639953b04cd0348~mv2.jpg"
                    alt="Campus Overview - Computer Department"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">Campus Overview</h3>
                    <p className="text-sm text-white/90">Modern facilities for comprehensive learning</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Academic Facilities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Card className="overflow-hidden border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src="https://static.wixstatic.com/media/0f0cef_178b0b6a25914b4eb765591879cb5e7b~mv2.jpg/v1/fill/w_831,h_384,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG-5459.jpg"
                    alt="Academic Facilities - Computer Department"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold mb-1">Academic Facilities</h3>
                    <p className="text-sm text-white/90">Advanced labs and learning spaces</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">World-Class Infrastructure</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our computer department is housed in modern facilities equipped with cutting-edge technology,
                  providing students with an optimal learning environment for their academic journey.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Smart Classrooms</div>
                    <div className="text-sm text-muted-foreground">Interactive learning</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Research Labs</div>
                    <div className="text-sm text-muted-foreground">Innovation hub</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Facilities & Programs Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.05),transparent)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <BookOpen className="w-3 h-3 mr-1" />
              Department Excellence
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Our Academic Environment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover our state-of-the-art facilities, innovative programs, and the vibrant academic community that
              makes our department exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Computer Labs & Facilities */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Advanced Computing Labs</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our department features cutting-edge computer laboratories equipped with the latest hardware and
                  software, providing students with hands-on experience in programming, software development, and
                  emerging technologies.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Programming Labs</div>
                    <div className="text-sm text-muted-foreground">Latest IDEs and compilers</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-950/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Project Rooms</div>
                    <div className="text-sm text-muted-foreground">Collaborative spaces</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Research Centers</div>
                    <div className="text-sm text-muted-foreground">Innovation hubs</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Seminar Halls</div>
                    <div className="text-sm text-muted-foreground">Interactive learning</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="overflow-hidden border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/modern-computer-lab-with-students-working-on-progr.jpg"
                    alt="Computer Programming Lab"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-semibold mb-1">Programming Laboratory</h4>
                    <p className="text-sm text-white/90">High-performance computing environment</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="overflow-hidden border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src="/students-collaborating-in-computer-science-project.jpg"
                      alt="Project Collaboration Room"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <p className="text-xs font-medium">Project Rooms</p>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src="/computer-science-research-lab-with-advanced-equipm.jpg"
                      alt="Research Laboratory"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <p className="text-xs font-medium">Research Labs</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Faculty & Academic Programs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Card className="overflow-hidden border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src="/computer-science-faculty-teaching-in-modern-classr.jpg"
                    alt="Faculty Teaching Environment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-semibold mb-1">Interactive Learning</h4>
                    <p className="text-sm text-white/90">Expert faculty delivering cutting-edge curriculum</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Expert Faculty & Programs</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our distinguished faculty members bring years of industry experience and academic excellence to
                  deliver comprehensive programs in computer science, preparing students for successful careers in
                  technology.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">25+ Expert Faculty</div>
                    <div className="text-sm text-muted-foreground">PhD holders and industry professionals</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Comprehensive Curriculum</div>
                    <div className="text-sm text-muted-foreground">Updated with latest industry trends</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Research Opportunities</div>
                    <div className="text-sm text-muted-foreground">Active research projects and publications</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Quick Access
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Navigate Our Department</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover the most important sections of our department website and access the resources you need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/20 hover:-translate-y-1 bg-card/50 backdrop-blur ${link.borderColor}`}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-14 h-14 rounded-xl ${link.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <link.icon className={`h-7 w-7 ${link.color}`} />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                    {link.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-6 text-muted-foreground leading-relaxed">
                    {link.description}
                  </CardDescription>
                  <Link href={link.href}>
                    <Button
                      variant="ghost"
                      className={`group-hover:bg-primary/10 group-hover:${link.color} p-0 h-auto font-medium transition-all duration-200`}
                    >
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

      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Department Stats
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Excellence in Numbers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our department continues to grow and excel in computer science education and research
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur"
              >
                <CardContent className="pt-8 pb-6">
                  <div
                    className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <Feature74 />
      <Feature16 />

      {newsletters && newsletters.length > 0 && (
        <section className="py-16 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent)]" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                Latest News
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Department Announcements</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                Stay updated with the latest news and announcements from our department
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsletters.map((newsletter, index) => (
                <Card
                  key={newsletter.id}
                  className="hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/20 group hover:-translate-y-1 bg-card/50 backdrop-blur"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {index === 0 ? "Latest" : "Recent"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(newsletter.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {newsletter.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3 mb-6 leading-relaxed">
                      {newsletter.description}
                    </CardDescription>
                    <Link href="/newsletter">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 bg-transparent"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/newsletter">
                <Button
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-200 bg-transparent"
                >
                  View All Newsletters
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

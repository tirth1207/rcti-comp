import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Rocket, Globe, ArrowRight } from "lucide-react"

export function Mission() {
  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(120,119,198,0.05),transparent)]" />

      <div className="container mx-auto px-4 relative">
        <div className="mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Mission
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Empowering Tomorrow's Tech Leaders</h2>
            {/* <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed mb-4">
              Our mission is to provide comprehensive computer science education that combines theoretical knowledge
              with practical skills, preparing students for successful careers in technology.
            </p> */}
            {/* <div className="bg-card/80 rounded-lg p-6 mt-6 border border-border/30 shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-primary">Mission of the Department</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 text-left">
                <li>
                  To produce competent computer professionals by providing state-of-the-art training, hands-on experience and skill for practical environment.
                </li>
                <li>
                  To impart moral, ethical values and interpersonal skills to the students.
                </li>
                <li>
                  To impart necessary technical and professional skills among the students to make them employable and eligible for higher studies.
                </li>
              </ul>
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Card className="border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-950/20 dark:to-orange-900/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-3 text-lg">Professional Excellence</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      To produce competent computer professionals by providing state-of-the-art training, hands-on experience and skill for practical environment.
                    </p>
                    {/* <div className="flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-50 dark:from-indigo-950/20 dark:to-indigo-900/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-3 text-lg">Ethical Development</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      To impart moral, ethical values and interpersonal skills to the students.
                    </p>
                    {/* <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-950/20 dark:to-pink-900/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="h-7 w-7 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-3 text-lg">Career Readiness</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      To impart necessary technical and professional skills among the students to make them employable and eligible for higher studies.
                    </p>
                    {/* <div className="flex items-center text-pink-600 dark:text-pink-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-950/20 dark:to-teal-900/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-3 text-lg">Global Impact</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Building partnerships with industry leaders and international institutions to create global
                      opportunities for our students and faculty.
                    </p>
                    <div className="flex items-center text-teal-600 dark:text-teal-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  )
}

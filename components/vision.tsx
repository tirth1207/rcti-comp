import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Target, Lightbulb, ArrowRight } from "lucide-react"

export function Vision() {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(120,119,198,0.05),transparent)]" />

      <div className="container mx-auto px-4 relative">
        <div className=" mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Vision
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
              Leading Innovation in Computer Science Education
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              We envision a future where our graduates become technology leaders, driving innovation and solving complex
              global challenges through computational thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <Card className="text-center border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/20 dark:to-blue-900/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">Innovative Minds</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  To mould young and fresh minds into challenging computer professionals with ethical values and shaping them with upcoming technologies and develop the ability to deal with real world situations with skills and innovative ideas
                </p>
                {/* <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div> */}
              </CardContent>
            </Card>

            {/* <Card className="text-center border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950/20 dark:to-green-900/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">Innovation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Fostering creativity and innovation through cutting-edge research and modern teaching methodologies.
                </p>
                <div className="flex items-center justify-center text-green-600 dark:text-green-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950/20 dark:to-purple-900/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-lg">Impact</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Creating positive impact in society through technology solutions and ethical computing practices.
                </p>
                <div className="flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  )
}

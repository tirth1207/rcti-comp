"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, BookOpen, TrendingUp } from "lucide-react"

const stats = [
  { label: "Students Enrolled", value: "500+", icon: Users },
  { label: "Faculty Members", value: "25+", icon: Award },
  { label: "Courses Offered", value: "40+", icon: BookOpen },
  { label: "Research Projects", value: "15+", icon: TrendingUp },
]

export function StatsCards() {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.05),transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Department Stats
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Excellence in Numbers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our department continues to grow in education and research.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card
              key={label}
              className="text-center border-border/60 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1 bg-card/60 backdrop-blur"
            >
              <CardContent className="pt-8 pb-6">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

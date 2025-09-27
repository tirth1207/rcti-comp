"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Network, Database, Globe, Cpu, Layers } from "lucide-react"

const items = [
  {
    title: "Programming Fundamentals",
    desc: "Strong foundations in algorithms, data structures, and problem-solving.",
    icon: Code2,
  },
  {
    title: "Computer Networks",
    desc: "Routing, switching, protocols, and practical lab exposure.",
    icon: Network,
  },
  {
    title: "Databases",
    desc: "Relational design, SQL mastery, and application integration.",
    icon: Database,
  },
  {
    title: "Web Technologies",
    desc: "Frontend and backend essentials for building modern web apps.",
    icon: Globe,
  },
  {
    title: "Computer Architecture",
    desc: "Digital logic, microprocessors, and hardware-software interface.",
    icon: Cpu,
  },
  {
    title: "Software Engineering",
    desc: "Lifecycle, version control, testing, and team projects.",
    icon: Layers,
  },
]

export function BentoOffers() {
  return (
    <section id="offers" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <Badge variant="secondary">Program Highlights</Badge>
          <h2 className="mt-3 text-balance text-2xl font-bold md:text-3xl">What Diploma in CE Offers</h2>
          <p className="mt-2 text-muted-foreground">
            A balanced blend of theory, labs, and projects across key domains.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
          <div className="grid gap-4">
            {items.slice(0, 2).map((it, i) => (
              <Card key={it.title} className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-secondary p-2">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{it.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="flex flex-col justify-center p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-secondary p-2">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Practical Learning</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              Dedicated labs, projects, and workshops ensure hands-on experience that translates to real-world
              readiness.
            </p>
            <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground">
              <li>Mini-projects in each semester</li>
              <li>Industry-focused assignments</li>
              <li>Portfolio-based evaluation</li>
            </ul>
          </Card>

          <div className="grid gap-4">
            {items.slice(2, 4).map((it) => (
              <Card key={it.title} className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-secondary p-2">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">{it.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Bonus row to include all 6 items elegantly on smaller screens */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:hidden">
          {items.slice(4).map((it) => (
            <Card key={it.title} className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-secondary p-2">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{it.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"



export async function NewsletterCards() {
    const supabase = await createClient()

  // Fetch latest newsletters for announcements
  const { data: newsletters } = await supabase
    .from("newsletters")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3)
  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Latest News
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            Department Announcements & Newsletter
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Stay updated with the latest news and activities from our department.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(newsletters ?? []).map((n, index) => (
            <Card
              key={n.id}
              className="hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/60 hover:border-primary/20 group hover:-translate-y-1 bg-card/60 backdrop-blur"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                    {index === 0 ? "Latest" : "Recent"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleDateString()}</span>
                </div>
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {n.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-6 leading-relaxed">{n.description}</CardDescription>
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
  )
}

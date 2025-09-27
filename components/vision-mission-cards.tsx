"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Award } from "lucide-react"

export function VisionMissionCards() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <Badge variant="secondary">Vision & Mission</Badge>
          <h2 className="mt-3 text-balance text-2xl font-bold md:text-3xl">Institute and Department Focus</h2>
          <p className="mt-2 text-muted-foreground">
            Clear goals that guide learning, research, and real-world impact.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Institute */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-secondary p-3">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Vision of the Institute</h3>
                <p className="mt-2 text-muted-foreground">
                  To cater to the technological development of the nation through excellence in technical education by satisfying needs of the industries & society.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-4">
              <div className="rounded-lg bg-secondary p-3">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Mission of the Institute</h4>
                <ul className="ml-5 mt-2 list-disc space-y-2 text-muted-foreground">
                  <li>To impart qualitative technical education to the students and inculcating core values in them through optimum utilization and mobilization of institute’s resources to enhance their employability.</li>
                  <li>To strengthen linkage with industry, networking with other institutions and organizations by providing various services and conducting demand driven continuing education and community programmes.</li>
                  <li>To strive for becoming a centre of excellence enabling to face the ever changing and challenging technological environment.</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Department */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-secondary p-3">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Vision of the Department</h3>
                <p className="mt-2 text-muted-foreground">
                  To mould young and fresh minds into challenging computer professionals with ethical values and shaping them with upcoming technologies and develop the ability to deal with real world situations with skills and innovative ideas.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-4">
              <div className="rounded-lg bg-secondary p-3">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Mission of the Department</h4>
                <ul className="ml-5 mt-2 list-disc space-y-2 text-muted-foreground">
                  <li>To produce competent computer professionals by providing state-of-the-art training, hands-on experience and skill for practical environment.</li>
                  <li>To impart moral, ethical values and interpersonal skills to the students.</li>
                  <li>To impart necessary technical and professional skills among the students to make them employable and eligible for higher studies.</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

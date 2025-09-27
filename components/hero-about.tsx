"use client"

import { Button } from "@/components/ui/button"

export function HeroAbout() {
  return (
    <section className="relative isolate">
      <div
        className="relative h-[56vh] md:h-[64vh] lg:h-[72vh] w-full overflow-hidden rounded-none"
        style={{
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmxp3X4Ytu4kuOrvL1RMTXejsNmx-o4YVQlw&s')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="RC Technical Institute Computer Department laboratory background"
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
          <div className="max-w-2xl text-white">
            <p className="mb-3 text-sm/6 font-medium opacity-90">RC Technical Institute • Computer Department</p>
            <h1 className="text-balance text-3xl font-bold md:text-5xl">Learn, Build, Innovate.</h1>
            <p className="mt-4 text-pretty text-base/7 md:text-lg/8 opacity-95">
              A hands-on diploma program that shapes industry-ready computer professionals with strong fundamentals and
              practical skills.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Button asChild>
                <a href="#apply" aria-label="Apply to the Computer Department">
                  Apply Now
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="#offers" aria-label="Explore program highlights">
                  Explore Program
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Megaphone } from "lucide-react"

interface Notice {
  id: string
  title: string
  file_url: string | null
}

export default function NewsTicker() {
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    async function fetchNotices() {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from("students_corner")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching student notices:", error)
      } else {
        setNotices(data as Notice[])
      }
    }

    fetchNotices()
  }, [])

  // Duplicate list to create seamless ticker
  const loop = [...notices, ...notices]

  return (
    <section
      aria-labelledby="announcements"
      className="py-6 border-y border-border/60 bg-muted/30"
    >
      <div className="flex flex-col p-4 mx-auto">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="inline-flex h-7 w-7 items-center justify-center rounded bg-primary/15 text-primary">
            <Megaphone className="h-4 w-4" />
          </div>
          <h3 id="announcements" className="text-sm font-semibold text-foreground">
            Department Announcements
          </h3>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap will-change-transform animate-[ticker_28s_linear_infinite]">
            {loop.map((item, idx) => (
              <a
                key={idx}
                href={item.file_url || "#"}
                target={item.file_url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="mr-8 inline-flex items-center text-sm text-foreground/90 hover:text-primary transition-colors"
                aria-label={`Announcement ${idx + 1}`}
              >
                {item.title}
                <span
                  className="mx-3 inline-block h-1 w-1 rounded-full bg-foreground/30"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-[ticker_28s_linear_infinite] {
          animation: ticker 28s linear infinite;
        }
      `}</style>
    </section>
  )
}

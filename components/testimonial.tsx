"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import { createClient } from "@/lib/supabase/client"

type Feedback = {
  id: string
  name: string
  email: string
  category: string   // added category here
  message: string
  created_at: string
}


const ReviewCard = ({ name, email, message }: Feedback) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
        <p className="text-xs font-medium dark:text-white/40">{email}</p>
      </div>
      <blockquote className="mt-2 text-sm  max-h-16 whitespace-pre-wrap">{message}</blockquote>
    </figure>
  )
}

export function MarqueeDemo() {
  const [firstRow, setFirstRow] = useState<Feedback[]>([])
  const [secondRow, setSecondRow] = useState<Feedback[]>([])

  useEffect(() => {
    const fetchFeedback = async () => {
      const supabase = createClient()
      const { data: feedback, error } = await supabase
        .from("feedback")
        .select("*")
        .eq("category", "review")
        .order("created_at", { ascending: true })

      if (error) {
        console.error("Error fetching feedback:", error)
        return
      }

      console.log("Fetched feedback:", feedback)

      if (feedback) {
        const mid = Math.ceil(feedback.length / 2)
        setFirstRow(feedback.slice(0, mid))
        setSecondRow(feedback.slice(mid))
      }
    }

    fetchFeedback()
  }, [])

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s] py-4 overflow-visible">
        {firstRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s] py-4 overflow-visible">
        {secondRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"  />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
    </div>
  )
}

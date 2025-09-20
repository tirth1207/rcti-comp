// utils/slugToSemester.ts
export function slugToSemester(slug: string): number | null {
  const mapping: Record<string, number> = {
    "semester-1-old": 1,
    "semester-1-nep": 1,
    "semester-2-old": 2,
    "semester-2-nep": 2,
    "semester-3-old": 3,
    "semester-3-nep": 3,
    "semester-4": 4,
    "semester-5": 5,
    "semester-6": 6,
  }

  return mapping[slug] ?? null
}

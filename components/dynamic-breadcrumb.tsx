"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function ParamsBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Build breadcrumb paths
  const paths = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    return {
      label: decodeURIComponent(segment.charAt(0).toUpperCase() + segment.slice(1)),
      href: index < segments.length - 1 ? href : undefined,
    }
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.length > 0 && <BreadcrumbSeparator />}
        {paths.map((path, index) => (
          <BreadcrumbItem key={index}>
            {path.href ? (
              <BreadcrumbLink asChild>
                <Link href={path.href}>{path.label}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{path.label}</BreadcrumbPage>
            )}
            {index !== paths.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

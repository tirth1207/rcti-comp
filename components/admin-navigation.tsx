"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  BookOpen,
  Calendar,
  Users,
  Bell,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Newsletters", href: "/admin/newsletters", icon: FileText },
  { name: "Course Materials", href: "/admin/course-materials", icon: BookOpen },
  { name: "Student Corner", href: "/admin/student-corner", icon: Bell },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Faculty", href: "/admin/faculty", icon: Users },
  { name: "Feedback", href: "/admin/feedback", icon: MessageSquare },
]

interface AdminNavigationProps {
  userEmail?: string
  userName?: string
}

export function AdminNavigation({ userEmail, userName }: AdminNavigationProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-border px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/admin" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">Admin Panel</span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/10",
                        )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-foreground border-t border-border">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{userName || "Admin"}</p>
                    <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                  </div>
                </div>
                <form action="/auth/signout" method="post">
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-card px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex-1 text-sm font-semibold leading-6 text-foreground">Admin Panel</div>
        <Link href="/">
          <Button variant="outline" size="sm">
            View Site
          </Button>
        </Link>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <Link href="/admin" className="flex items-center space-x-2">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <span className="font-bold text-xl text-foreground">Admin Panel</span>
                  </Link>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors",
                                pathname === item.href
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent/10",
                              )}
                            >
                              <item.icon className="h-6 w-6 shrink-0" />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-foreground border-t border-border">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{userName || "Admin"}</p>
                          <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                        </div>
                      </div>
                      <form action="/auth/signout" method="post">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground hover:text-foreground"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </form>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

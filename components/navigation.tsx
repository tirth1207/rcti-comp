"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, MenuIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const academicSections = [
    {
      title: "Faculty Directory",
      description: "Meet our experienced faculty members",
      href: "/faculty",
    },
    {
      title: "Student Corner",
      description: "Important notices and announcements",
      href: "/student-corner",
    },
    {
      title: "Events Gallery",
      description: "View photos from department events",
      href: "/events",
    },
    {
      title: "Newsletter",
      description: "Stay updated with department news",
      href: "/newsletter",
    },
    {
      title: "Feedback",
      description: "Share your thoughts and suggestions",
      href: "/feedback",
    },
  ]

  const semesters = [
    { title: "Semester 1 (Old)", number: 1, type: "old" },
    { title: "Semester 1 (NEP)", number: 1, type: "nep" },
    { title: "Semester 2 (Old)", number: 2, type: "old" },
    { title: "Semester 2 (NEP)", number: 2, type: "nep" },
    { title: "Semester 3 (Old)", number: 3, type: "old" },
    { title: "Semester 3 (NEP)", number: 3, type: "nep" },
    { title: "Semester 4", number: 4, type: "regular" },
    { title: "Semester 5", number: 5, type: "regular" },
    { title: "Semester 6", number: 6, type: "regular" },
    { title: "Semester 7", number: 7, type: "regular" },
    { title: "Semester 8", number: 8, type: "regular" },
  ]

  return (
    <section className="py-4 bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto">
        <nav className="flex items-center mx-auto justify-between">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-lg font-semibold tracking-tighter">Computer Department</span>
          </Link>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {/* Course Materials Dropdown */}
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className={navigationMenuTriggerStyle()}>
                    Course Materials
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Semester</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {semesters.map((semester) => (
                      <DropdownMenuItem key={`${semester.number}-${semester.type}`} asChild>
                        <Link 
                          href={`/course-materials/semester-${semester.number}${semester.type !== 'regular' ? `-${semester.type}` : ''}`}
                          className="w-full"
                        >
                          {semester.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              {/* Academic Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Academic</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {academicSections.map((section, index) => (
                      <NavigationMenuLink
                        href={section.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div key={section.title}>
                          <p className="mb-1 font-semibold text-foreground">{section.title}</p>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/contact" className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="outline">Admin Login</Button>
            </Link>
            <Link href="/contact">
              <Button>Get in Touch</Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <span className="text-lg font-semibold tracking-tighter">Computer Department</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  {/* Course Materials Mobile */}
                  <AccordionItem value="course-materials" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">Course Materials</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {semesters.map((semester) => (
                          <Link
                            key={`${semester.number}-${semester.type}`}
                            href={`/course-materials/semester-${semester.number}${semester.type !== 'regular' ? `-${semester.type}` : ''}`}
                            className="block rounded-md p-2 transition-colors hover:bg-muted/70"
                          >
                            {semester.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Academic Mobile */}
                  <AccordionItem value="academic" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">Academic</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {academicSections.map((section, index) => (
                          <Link
                            href={section.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={section.title}>
                              <p className="mb-1 font-semibold text-foreground">{section.title}</p>
                              <p className="text-sm text-muted-foreground">{section.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <Link href="/about" className="font-medium">
                    About
                  </Link>
                  <Link href="/contact" className="font-medium">
                    Contact
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      Admin Login
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-full">Get in Touch</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  )
}
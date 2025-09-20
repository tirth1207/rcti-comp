import Link from "next/link"
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">Computer Department</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering students with cutting-edge computer science education and research opportunities. Building the
              next generation of technology leaders.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 University Avenue, College Campus, State 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@computerdept.edu</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/course-materials"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Course Materials
                </Link>
              </li>
              <li>
                <Link href="/student-corner" className="text-muted-foreground hover:text-foreground transition-colors">
                  Student Corner
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="text-muted-foreground hover:text-foreground transition-colors">
                  Faculty Directory
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Events Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/newsletter" className="text-muted-foreground hover:text-foreground transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-muted-foreground hover:text-foreground transition-colors">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">© 2024 Computer Department. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

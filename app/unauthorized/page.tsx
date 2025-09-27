import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, Shield, ArrowLeft } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-card">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">Computer Department</span>
            </div>
          </div>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Shield className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
                <p className="text-sm text-destructive font-medium">
                  Administrator privileges required
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Only users with admin role can access this section
                </p>
              </div>
              
              <div className="space-y-2">
                <Link href="/" className="block">
                  <Button className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Return to Home
                  </Button>
                </Link>
                
                <Link href="/contact" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Administrator
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>If you believe this is an error, please contact the system administrator.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
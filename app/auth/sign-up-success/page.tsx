import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, Mail } from "lucide-react"

export default function SignUpSuccessPage() {
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
                <Mail className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Account Created Successfully!</CardTitle>
              <CardDescription>Check your email to confirm your account</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent a confirmation email to your inbox. Please check your email and click the confirmation
                link to activate your account before signing in.
              </p>
              <div className="space-y-2">
                <Link href="/auth/login">
                  <Button className="w-full">Go to Login</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full bg-transparent">
                    Back to Website
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

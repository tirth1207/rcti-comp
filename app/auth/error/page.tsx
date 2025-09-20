import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GraduationCap, AlertCircle } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

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
                <AlertCircle className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Authentication Error</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {params?.error ? (
                <p className="text-sm text-muted-foreground">
                  <strong>Error:</strong> {params.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">An unspecified authentication error occurred.</p>
              )}
              <div className="space-y-2">
                <Link href="/auth/login">
                  <Button className="w-full">Try Again</Button>
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

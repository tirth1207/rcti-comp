import type { Metadata } from "next"
import { GeistSans, GeistMono } from "geist/font"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const geistSans = GeistSans
const geistMono = GeistMono

export const metadata: Metadata = {
  title: "Computer Department - College Website",
  description: "Official website of the Computer Science Department",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

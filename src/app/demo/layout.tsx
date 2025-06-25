import type React from "react"
import type { Metadata } from "next"
import "./demo.css"

export const metadata: Metadata = {
  title: "AX Marketing - AI Development Platform",
  description:
    "Advanced AI-powered marketing development platform. Build, analyze, and deploy intelligent marketing solutions.",
  generator: 'v0.dev'
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

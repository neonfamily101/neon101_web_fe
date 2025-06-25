import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/demo/ui/card"
import { Terminal } from "lucide-react"

interface AIFormLayoutProps {
  title: string
  description: string
  icon?: ReactNode
  children: ReactNode
}

export function AIFormLayout({ title, description, icon, children }: AIFormLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="dev-card border-matrix animate-fade-in-up">
        <CardHeader className="bg-terminal border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="code-block p-2 rounded">
              <Terminal className="h-5 w-5 text-matrix" />
            </div>
            <div>
              <CardTitle className="text-xl font-mono text-white">{title}</CardTitle>
              <CardDescription className="text-gray-400 font-mono text-sm mt-1">
                {"// "}
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 bg-black/50">{children}</CardContent>
      </Card>
    </div>
  )
}

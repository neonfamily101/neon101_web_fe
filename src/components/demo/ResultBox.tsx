import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/demo/ui/card"
import { Badge } from "@/components/demo/ui/badge"
import { CheckCircle, AlertCircle, Loader2, Terminal } from "lucide-react"

interface ResultBoxProps {
  title: string
  children: ReactNode
  status?: "success" | "error" | "loading" | "idle"
  className?: string
}

export function ResultBox({ title, children, status = "idle", className = "" }: ResultBoxProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-matrix" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case "loading":
        return <Loader2 className="h-4 w-4 text-matrix animate-spin" />
      default:
        return <Terminal className="h-4 w-4 text-matrix" />
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-900/50 text-matrix border-matrix font-mono text-xs">SUCCESS</Badge>
      case "error":
        return <Badge className="bg-red-900/50 text-red-300 border-red-500/30 font-mono text-xs">ERROR</Badge>
      case "loading":
        return (
          <Badge className="bg-gray-900/50 text-matrix border-matrix font-mono text-xs animate-pulse">PROCESSING</Badge>
        )
      default:
        return <Badge className="bg-gray-900/50 text-gray-400 border-gray-600 font-mono text-xs">READY</Badge>
    }
  }

  return (
    <Card className={`dev-card border-matrix animate-fade-in-up ${className}`}>
      <CardHeader className="bg-terminal border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <CardTitle className="text-sm font-mono text-white">{title}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-black/30 text-gray-200 font-mono text-sm">{children}</CardContent>
    </Card>
  )
}

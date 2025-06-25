"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/demo/ui/button"
import { Label } from "@/components/demo/ui/label"
import { Textarea } from "@/components/demo/ui/textarea"
import { AIFormLayout } from "@/components/demo/AIFormLayout"
import { ResultBox } from "@/components/demo/ResultBox"
import { BarChart3, Play } from "lucide-react"
import { getEndpoint } from "@/components/common/url"

export default function AiGraph() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [html, setHtml] = useState("")
  const [error, setError] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError("")
    setHtml("")

    try {
      const response = await fetch(getEndpoint("/plotly-visualize"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      })
      if (!response.ok) {
        const detail = await response.text()
        throw new Error(`API error: ${response.status} ${detail}`)
      }
      const data = await response.json()
      setHtml(data.html)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Inject HTML and execute scripts so Plotly visualization renders, adjust height dynamically
  useEffect(() => {
    const container = containerRef.current
    if (!html || !container) return
    // Inject HTML
    container.innerHTML = html
    // Execute scripts
    const scripts = container.getElementsByTagName("script")
    Array.from(scripts).forEach(oldScript => {
      const newScript = document.createElement("script")
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value))
      newScript.text = oldScript.text
      oldScript.parentNode?.replaceChild(newScript, oldScript)
    })
    // Dynamically adjust height
    const resize = () => {
      container.style.height = container.scrollHeight + "px"
    }
    resize()
    // Optional: observe child changes
    const observer = new MutationObserver(resize)
    observer.observe(container, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [html])

  return (
    <AIFormLayout
      title="Data Visualizer"
      description="Intelligent chart and graph generation"
      icon={<BarChart3 className="h-5 w-5 text-matrix" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-gray-300 font-mono text-sm">
            prompt:
          </Label>
          <Textarea
            id="prompt"
            placeholder="// Describe the data you want to visualize..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono transition-all duration-300"
        >
          <Play className="mr-2 h-4 w-4" />
          {isLoading ? "> Generating..." : "> Execute Visualization"}
        </Button>
      </form>

      {(error || html) && (
        <div className="mt-6 space-y-4">
          {error && (
            <ResultBox title="error" status="error">
              <p className="text-red-400">ERROR: {error}</p>
            </ResultBox>
          )}
          {html && (
            <ResultBox title="visualization_result" status="success">
              <div ref={containerRef} className="w-full overflow-hidden transition-all" style={{ height: 'auto' }} />
            </ResultBox>
          )}
        </div>
      )}
    </AIFormLayout>
  )
}

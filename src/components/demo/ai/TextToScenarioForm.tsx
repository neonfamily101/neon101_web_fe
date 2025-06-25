"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/demo/ui/button"
import { Label } from "@/components/demo/ui/label"
import { Textarea } from "@/components/demo/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/demo/ui/select"
import { AIFormLayout } from "@/components/demo/AIFormLayout"
import { ResultBox } from "@/components/demo/ResultBox"
import { useFormLogic } from "@/components/demo/UseFormLogic"
import { MessageSquare, Play } from "lucide-react"

export function TextToScenarioForm() {
  const [topic, setTopic] = useState("")
  const [industry, setIndustry] = useState("technology")
  const [complexity, setComplexity] = useState("medium")
  const { isLoading, result, error, setLoading, setResult, setError } = useFormLogic()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setResult(`Generated ${complexity} complexity scenario for ${industry} industry: "${topic}"`)
    }, 2500)
  }

  return (
    <AIFormLayout
      title="Scenario Engine"
      description="Strategic planning and scenario modeling"
      icon={<MessageSquare className="h-5 w-5 text-matrix" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-gray-300 font-mono text-sm">
            scenario_input:
          </Label>
          <Textarea
            id="topic"
            placeholder="// Define the scenario parameters..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={3}
            className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-gray-300 font-mono text-sm">
              industry_type:
            </Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-black border-gray-700 text-white font-mono focus:border-matrix">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-700">
                <SelectItem value="technology">technology</SelectItem>
                <SelectItem value="healthcare">healthcare</SelectItem>
                <SelectItem value="finance">finance</SelectItem>
                <SelectItem value="retail">retail</SelectItem>
                <SelectItem value="education">education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complexity" className="text-gray-300 font-mono text-sm">
              complexity_level:
            </Label>
            <Select value={complexity} onValueChange={setComplexity}>
              <SelectTrigger className="bg-black border-gray-700 text-white font-mono focus:border-matrix">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-700">
                <SelectItem value="simple">simple</SelectItem>
                <SelectItem value="medium">medium</SelectItem>
                <SelectItem value="complex">complex</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full bg-black border border-matrix text-matrix hover:bg-matrix hover:text-black font-mono transition-all duration-300"
        >
          <Play className="mr-2 h-4 w-4" />
          {isLoading ? "> Modeling..." : "> Execute Modeling"}
        </Button>
      </form>

      {(result || error) && (
        <div className="mt-6">
          <ResultBox title="modeling_result" status={error ? "error" : "success"}>
            {error ? (
              <p className="text-red-400">ERROR: {error}</p>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-200">OUTPUT: {result}</p>
                <div className="code-block p-4 rounded border border-gray-700">
                  <p className="text-xs text-gray-500">// Scenario analysis would be displayed here</p>
                </div>
              </div>
            )}
          </ResultBox>
        </div>
      )}
    </AIFormLayout>
  )
}

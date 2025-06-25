"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/demo/ui/button"
import { Label } from "@/components/demo/ui/label"
import { Textarea } from "@/components/demo/ui/textarea"
import { AIFormLayout } from "@/components/demo/AIFormLayout"
import { ResultBox } from "@/components/demo/ResultBox"
import { useFormLogic } from "@/components/demo/UseFormLogic"
import { GitBranch, Upload, Play } from "lucide-react"
// @ts-ignore
import Plot from "react-plotly.js"

export function SankeyChartAnalyzerForm() {
  const [csvData, setCsvData] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [sankeyData, setSankeyData] = useState<any | null>(null)
  const { isLoading, result, error, setLoading, setResult, setError } = useFormLogic()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const text = await selectedFile.text()
      setCsvData(text)
    }
  }

  const parseCSVToSankey = (text: string) => {
    const rows = text.trim().split("\n").map(row => row.split(","))
    const [header, ...data] = rows

    const sources: string[] = []
    const targets: string[] = []
    const values: number[] = []

    const labelSet: Set<string> = new Set()

    data.forEach(([src, tgt, val]) => {
      sources.push(src)
      targets.push(tgt)
      values.push(parseFloat(val))
      labelSet.add(src)
      labelSet.add(tgt)
    })

    const labels = Array.from(labelSet)
    const labelIndex = (label: string) => labels.indexOf(label)

    return {
      data: [
        {
          type: "sankey",
          orientation: "h",
          node: {
            pad: 15,
            thickness: 20,
            line: {
              color: "black",
              width: 0.5,
            },
            label: labels,
          },
          link: {
            source: sources.map(labelIndex),
            target: targets.map(labelIndex),
            value: values,
          },
        },
      ],
      layout: {
        title: "Sankey Flow Chart",
        font: {
          size: 12,
          color: "white",
        },
        paper_bgcolor: "#000000",
        plot_bgcolor: "#000000",
      },
      config: { displayModeBar: false },
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!csvData.trim()) return

    setLoading(true)
    try {
      const parsed = parseCSVToSankey(csvData)
      setSankeyData(parsed)
      setResult("Successfully generated Sankey chart from input.")
    } catch (e) {
      setError("Failed to parse CSV data.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AIFormLayout
      title="Flow Mapper"
      description="Customer journey visualization"
      icon={<GitBranch className="h-5 w-5 text-matrix" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="csvFile" className="text-gray-300 font-mono text-sm">
            csv_file_input:
          </Label>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-matrix transition-all duration-300 bg-black/30">
            <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <input type="file" id="csvFile" accept=".csv" onChange={handleFileChange} className="hidden" />
            <label htmlFor="csvFile" className="cursor-pointer text-matrix hover:text-green-400 font-mono text-sm">
              {"> Upload CSV file"}
            </label>
            {file && (
              <p className="mt-3 text-xs text-gray-400 font-mono bg-gray-900/50 p-2 rounded">FILE: {file.name}</p>
            )}
          </div>
        </div>

        <div className="text-center text-gray-500 font-mono">
          <span className="bg-gray-800 px-4 py-1 rounded-full text-xs">OR</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="csvData" className="text-gray-300 font-mono text-sm">
            csv_data_input:
          </Label>
          <Textarea
            id="csvData"
            placeholder={`Source,Target,Value\nWebsite,Landing Page,1000\nLanding Page,Sign Up,300\nSign Up,Purchase,150`}
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            rows={6}
            className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !csvData.trim()}
          className="w-full bg-black border border-matrix text-matrix hover:bg-matrix hover:text-black font-mono transition-all duration-300"
        >
          <Play className="mr-2 h-4 w-4" />
          {isLoading ? "> Analyzing..." : "> Execute Analysis"}
        </Button>
      </form>

      {(result || error) && (
        <div className="mt-6">
          <ResultBox title="analysis_result" status={error ? "error" : "success"}>
            {error ? (
              <p className="text-red-400">ERROR: {error}</p>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-200">OUTPUT: {result}</p>
                {sankeyData && <Plot {...sankeyData} style={{ width: "100%" }} />}
              </div>
            )}
          </ResultBox>
        </div>
      )}
    </AIFormLayout>
  )
}

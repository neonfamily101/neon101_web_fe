"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/demo/ui/button"
import { Label } from "@/components/demo/ui/label"
import { Textarea } from "@/components/demo/ui/textarea"
import { AIFormLayout } from "@/components/demo/AIFormLayout"
import { ResultBox } from "@/components/demo/ResultBox"
import { useFormLogic } from "@/components/demo/UseFormLogic"
import { Radar, Upload, Play } from "lucide-react"

import { Radar as RadarChart } from "react-chartjs-2"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export function RadarChartAnalyzerForm() {
  const [csvData, setCsvData] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<any[]>([])
  const { isLoading, result, error, setLoading, setResult, setError } = useFormLogic()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        setCsvData(text)
      }
      reader.readAsText(selectedFile)
    }
  }

  const parseCSV = (text: string) => {
    const lines = text.trim().split("\n")
    const [header, ...rows] = lines
    return rows.map((line) => {
      const [label, value] = line.split(",")
      return { label: label.trim(), value: Number(value.trim()) }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!csvData.trim()) return
    setLoading(true)
    setParsedData(parseCSV(csvData))
    setTimeout(() => {
      setResult(`Analyzed radar chart data from ${file ? file.name : "manual input"}`)
    }, 2000)
  }

  const radarChartData = useMemo(() => {
    const labels = parsedData.map((d) => d.label)
    const values = parsedData.map((d) => d.value)
    return {
      labels,
      datasets: [
        {
          label: "Scores",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "#36A2EB",
          borderWidth: 2,
        },
      ],
    }
  }, [parsedData])

  return (
    <AIFormLayout
      title="Radar Analyzer"
      description="Multi-dimensional data processing"
      icon={<Radar className="h-5 w-5 text-matrix" />}
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
            placeholder="Metric,Value\nPerformance,85\nQuality,92\nSpeed,78\nReliability,88"
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            rows={6}
            className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !csvData.trim()}
          className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono transition-all duration-300"
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
                {parsedData.length > 0 && (
                  <div className="w-full max-w-xl mx-auto">
                    <RadarChart data={radarChartData} />
                  </div>
                )}
              </div>
            )}
          </ResultBox>
        </div>
      )}
    </AIFormLayout>
  )
}
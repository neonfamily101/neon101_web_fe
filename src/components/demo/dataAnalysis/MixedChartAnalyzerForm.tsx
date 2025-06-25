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
import { BarChart3, Upload, Play } from "lucide-react"
// @ts-ignore
import Plot from "react-plotly.js"

export function MixedChartAnalyzerForm() {
  const [csvData, setCsvData] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [chartTypes, setChartTypes] = useState("auto")
  const [plotData, setPlotData] = useState<any | null>(null)
  const { isLoading, result, error, setLoading, setResult, setError } = useFormLogic()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const text = await selectedFile.text()
      setCsvData(text)
    }
  }

  const parseCSVToPlotly = (text: string, mode: string) => {
    const rows = text.trim().split("\n").map(r => r.split(","))
    const [headers, ...dataRows] = rows

    const columns = headers.reduce((acc, header, i) => {
      acc[header] = dataRows.map(row => row[i])
      return acc
    }, {} as Record<string, string[]>)

    const traces: any[] = []
    const xKey = headers[0] // e.g., Date

    for (let i = 1; i < headers.length; i++) {
      traces.push({
        type: mode === "bar-line" && i === 1 ? "bar" : "scatter",
        mode: "lines+markers",
        name: headers[i],
        x: columns[xKey],
        y: columns[headers[i]].map(v => +v),
      })
    }

    return {
      data: traces,
      layout: {
        title: "Mixed Chart Analysis",
        paper_bgcolor: "#000",
        plot_bgcolor: "#000",
        font: { color: "white" },
        xaxis: { title: xKey },
      },
      config: { displayModeBar: false },
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!csvData.trim()) return

    setLoading(true)
    try {
      const parsed = parseCSVToPlotly(csvData, chartTypes)
      setPlotData(parsed)
      setResult(`Analyzed mixed chart data with '${chartTypes}' configuration.`)
    } catch (err) {
      setError("Failed to parse CSV data.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AIFormLayout
      title="Multi-Chart System"
      description="Comprehensive data analysis suite"
      icon={<BarChart3 className="h-5 w-5 text-matrix" />}
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
            placeholder={`Date,Revenue,Customers,Conversion\n2024-01,50000,1200,2.5\n2024-02,55000,1350,2.8`}
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            rows={6}
            className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="chartTypes" className="text-gray-300 font-mono text-sm">
            chart_config:
          </Label>
          <Select value={chartTypes} onValueChange={setChartTypes}>
            <SelectTrigger className="bg-black border-gray-700 text-white font-mono focus:border-matrix">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700">
              <SelectItem value="auto">auto_detect</SelectItem>
              <SelectItem value="bar-line">bar_line_combo</SelectItem>
              <SelectItem value="multiple-bar">multiple_bar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={isLoading || (!csvData.trim() && !file)}
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
                {plotData && <Plot {...plotData} style={{ width: "100%" }} />}
              </div>
            )}
          </ResultBox>
        </div>
      )}
    </AIFormLayout>
  )
}

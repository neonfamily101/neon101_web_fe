"use client"

import React, { useState } from "react"
import { Button } from "@/components/demo/ui/button"
import { Input } from "@/components/demo/ui/input"
import { Label } from "@/components/demo/ui/label"
import { AIFormLayout } from "@/components/demo/AIFormLayout"
import { ResultBox } from "@/components/demo/ResultBox"
import { TrendingUp } from "lucide-react"
import { getEndpoint } from "@/components/common/url"

interface ROICalcRequest {
  ad_spend: number
  avg_revenue_per_conversion: number
  price_per_sale: number
  product_type: string
}

interface ROICalcResponse {
  roi: number
  evaluation: string
}

export default function ROICalculator() {
  const [adSpend, setAdSpend] = useState("")
  const [convRate, setConvRate] = useState("")
  const [avgRev, setAvgRev] = useState("")
  const [productType, setProductType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [roi, setRoi] = useState<number | null>(null)
  const [evaluation, setEvaluation] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!adSpend || !convRate || !avgRev || !productType.trim()) return

    setIsLoading(true)
    setError("")
    setRoi(null)
    setEvaluation("")

    const payload: ROICalcRequest = {
      ad_spend: parseFloat(adSpend),
      avg_revenue_per_conversion: parseFloat(convRate),
      price_per_sale: parseFloat(avgRev),
      product_type: productType.trim()
    }

    try {
      const res = await fetch(getEndpoint('/calculate-roi'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`Error ${res.status}: ${txt}`)
      }
      const data: ROICalcResponse = await res.json()
      setRoi(data.roi)
      setEvaluation(data.evaluation)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AIFormLayout
      title="ROI Analyzer"
      description="Return on Investment 계산 및 AI 평가"
      icon={<TrendingUp className="h-5 w-5 text-matrix" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="adSpend" className="text-gray-300 font-mono text-sm">
              ad_spend (광고비):
            </Label>
            <Input
              id="adSpend"
              type="number"
              placeholder="10000"
              value={adSpend}
              onChange={(e) => setAdSpend(e.target.value)}
              className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="convRate" className="text-gray-300 font-mono text-sm">
              avg_revenue_per_conversion (전환당 평균 수익율):
            </Label>
            <Input
              id="convRate"
              type="number"
              placeholder="0.1"
              step="0.01"
              value={convRate}
              onChange={(e) => setConvRate(e.target.value)}
              className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avgRev" className="text-gray-300 font-mono text-sm">
              price_per_sale (판매당 수익):
            </Label>
            <Input
              id="avgRev"
              type="number"
              placeholder="50"
              value={avgRev}
              onChange={(e) => setAvgRev(e.target.value)}
              className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="productType" className="text-gray-300 font-mono text-sm">
              product_type (상품/서비스명):
            </Label>
            <Input
              id="productType"
              placeholder="e.g., Health Supplements"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono transition-all duration-300"
        >
          {isLoading ? "> Calculating..." : "> Execute Analysis"}
        </Button>
      </form>

      {(error || roi !== null) && (
        <div className="mt-6 space-y-4">
          {error && (
            <ResultBox title="error" status="error">
              <p className="text-red-400">ERROR: {error}</p>
            </ResultBox>
          )}
          {roi !== null && (
            <ResultBox title="ROI Result" status="success">
              <p className="text-gray-200">ROI: {roi.toFixed(2)}%</p>
              <div className="mt-2 text-gray-200 whitespace-pre-wrap">{evaluation}</div>
            </ResultBox>
          )}
        </div>
      )}
    </AIFormLayout>
  )
}

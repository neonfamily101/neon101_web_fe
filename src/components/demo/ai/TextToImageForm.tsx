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
import { ImageIcon, Play } from "lucide-react"
import { getEndpoint } from "@/components/common/url"

export function TextToImageForm() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("realistic")
  const [size, setSize] = useState("1024x1024")
  const { isLoading, result, error, setLoading, setResult, setError } = useFormLogic()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch(getEndpoint("/generate-image"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt })
      })

      if (!response.ok) {
        const errorDetail = await response.text()
        throw new Error(`API error: ${response.status} ${errorDetail}`)
      }

      const data = await response.json()
      // 서버 응답에서 image_url을 결과로 설정합니다.
      setResult(data.image_url)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AIFormLayout
      title="Image Generator"
      description="AI-powered visual content generation"
      icon={<ImageIcon className="h-5 w-5 text-matrix" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-gray-300 font-mono text-sm">
            prompt_input:
          </Label>
          <Textarea
            id="prompt"
            placeholder="// Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="style" className="text-gray-300 font-mono text-sm">
              style_config:
            </Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="bg-black border-gray-700 text-white font-mono focus:border-matrix">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-700">
                <SelectItem value="realistic">realistic</SelectItem>
                <SelectItem value="artistic">artistic</SelectItem>
                <SelectItem value="cartoon">cartoon</SelectItem>
                <SelectItem value="abstract">abstract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size" className="text-gray-300 font-mono text-sm">
              resolution:
            </Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="bg-black border-gray-700 text-white font-mono focus:border-matrix">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-700">
                <SelectItem value="512x512">512x512</SelectItem>
                <SelectItem value="1024x1024">1024x1024</SelectItem>
                <SelectItem value="1920x1080">1920x1080</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono transition-all duration-300"
        >
          <Play className="mr-2 h-4 w-4" />
          {isLoading ? "> Processing..." : "> Execute Generation"}
        </Button>
      </form>

      {(result || error) && (
        <div className="mt-6">
          <ResultBox title="execution_result" status={error ? "error" : "success"}>
            {error ? (
              <p className="text-red-400">ERROR: {error}</p>
            ) : (
              <div className="space-y-4">
                {/* API에서 받은 URL을 링크로 보여주고, 이미지로 렌더링 */}
                <p className="text-gray-200">
                  Image URL: <a href={result!} target="_blank" rel="noopener noreferrer" className="underline">{result}</a>
                </p>
                <img src={result!} alt="Generated Image" className="max-w-full rounded border border-gray-700" />

                <a
                  href={result!}
                  download="generated-image.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-matrix text-white hover:bg-white hover:text-black font-mono border border-gray-700 transition-all duration-300">
                    Download Image
                  </Button>
                </a>
              </div>
            )}
          </ResultBox>
        </div>
      )}
    </AIFormLayout>
  )
}

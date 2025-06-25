// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/demo/ui/button"
// import { Label } from "@/components/demo/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/demo/ui/select"
// import { AIFormLayout } from "@/components/demo/AIFormLayout"
// import { ResultBox } from "@/components/demo/ResultBox"
// import { useFormLogic } from "@/components/demo/UseFormLogic"
// import { Mic, Upload, Play } from "lucide-react"

// export function SpeechToSpeechForm() {
//   const [sourceVoice, setSourceVoice] = useState("original")
//   const [targetVoice, setTargetVoice] = useState("professional")
//   const [audioFile, setAudioFile] = useState<File | null>(null)
//   const { isLoading, result, error, setLoading, setResult, setError } = useFormLogic()

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setAudioFile(file)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!audioFile) return

//     setLoading(true)

//     // Simulate API call
//     setTimeout(() => {
//       setResult(`Transformed voice from ${sourceVoice} to ${targetVoice} for file "${audioFile.name}"`)
//     }, 3000)
//   }

//   return (
//     <AIFormLayout
//       title="Video Transformer"
//       description="Advanced voice synthesis and modification"
//       icon={<Mic className="h-5 w-5 text-matrix" />}
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <Label htmlFor="audio" className="text-gray-300 font-mono text-sm">
//             audio_input:
//           </Label>
//           <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-matrix transition-all duration-300 bg-black/30">
//             <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
//             <input type="file" id="audio" accept="audio/*" onChange={handleFileChange} className="hidden" />
//             <label htmlFor="audio" className="cursor-pointer text-matrix hover:text-green-400 font-mono text-sm">
//               {"> Upload audio file"}
//             </label>
//             {audioFile && (
//               <p className="mt-3 text-xs text-gray-400 font-mono bg-gray-900/50 p-2 rounded">FILE: {audioFile.name}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="source" className="text-gray-300 font-mono text-sm">
//               source_voice:
//             </Label>
//             <Select value={sourceVoice} onValueChange={setSourceVoice}>
//               <SelectTrigger className="bg-black border-gray-700 text-white font-mono focus:border-matrix">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent className="bg-black border-gray-700">
//                 <SelectItem value="original">original</SelectItem>
//                 <SelectItem value="male">male</SelectItem>
//                 <SelectItem value="female">female</SelectItem>
//                 <SelectItem value="child">child</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="target" className="text-gray-300 font-mono text-sm">
//               target_voice:
//             </Label>
//             <Select value={targetVoice} onValueChange={setTargetVoice}>
//               <SelectTrigger className="bg-black border-gray-700 text-white font-mono focus:border-matrix">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent className="bg-black border-gray-700">
//                 <SelectItem value="professional">professional</SelectItem>
//                 <SelectItem value="friendly">friendly</SelectItem>
//                 <SelectItem value="authoritative">authoritative</SelectItem>
//                 <SelectItem value="casual">casual</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <Button
//           type="submit"
//           disabled={isLoading || !audioFile}
//           className="w-full bg-black border border-matrix text-matrix hover:bg-matrix hover:text-black font-mono transition-all duration-300"
//         >
//           <Play className="mr-2 h-4 w-4" />
//           {isLoading ? "> Transforming..." : "> Execute Transformation"}
//         </Button>
//       </form>

//       {(result || error) && (
//         <div className="mt-6">
//           <ResultBox title="transformation_result" status={error ? "error" : "success"}>
//             {error ? (
//               <p className="text-red-400">ERROR: {error}</p>
//             ) : (
//               <div className="space-y-4">
//                 <p className="text-gray-200">OUTPUT: {result}</p>
//                 <div className="code-block p-4 rounded border border-gray-700">
//                   <p className="text-xs text-gray-500">// Transformed audio would be available here</p>
//                 </div>
//               </div>
//             )}
//           </ResultBox>
//         </div>
//       )}
//     </AIFormLayout>
//   )
// }


"use client"

import React, { useState } from "react"
import { Button } from "@/components/demo/ui/button"
import { Label } from "@/components/demo/ui/label"
import { AIFormLayout } from "@/components/demo/AIFormLayout"
import { ResultBox } from "@/components/demo/ResultBox"
import { Upload } from "lucide-react"

export default function VideoSummarizerForm() {
  const [url, setUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [summary, setSummary] = useState("")
  const [error, setError] = useState("")

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setFile(null)
    setTranscription("")
    setSummary("")
    setError("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setUrl("")
      setTranscription("")
      setSummary("")
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim() && !file) return

    const formData = new FormData()
    if (url.trim()) formData.append("url", url.trim())
    if (file) formData.append("file", file)

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://127.0.0.1:8000/summarize-video", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        const detail = await response.text()
        throw new Error(`API error: ${response.status} ${detail}`)
      }

      const data = await response.json()
      setTranscription(data.transcription)
      setSummary(data.summary)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AIFormLayout
      title="Video Summarizer"
      description="YouTube URL or local video file 요약 제공"
      icon={<Upload className="h-5 w-5 text-matrix" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="url" className="text-gray-300 font-mono text-sm">
            YouTube URL:
          </Label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://www.youtube.com/watch?..."
            className="w-full bg-black border border-gray-700 text-white font-mono text-sm p-2 focus:border-matrix transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file" className="text-gray-300 font-mono text-sm">
            또는 로컬 비디오 파일:
          </Label>
          <input
            type="file"
            id="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block text-sm text-gray-400 rounded-md file:cursor-pointer file:border file:border-gray-600 file:rounded-md file:px-3 file:py-2 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 hover:file:border-indigo-500 hover:file:text-indigo-900 transition-all duration-300"
          />


        </div>

        <Button
          type="submit"
          disabled={isLoading || (!url.trim() && !file)}
          className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono  transition-all duration-300"
        >
          {isLoading ? "> Processing..." : "> Execute Summarization"}
        </Button>
      </form>

      {(error || transcription || summary) && (
        <div className="mt-6 space-y-4">
          {error && (
            <ResultBox title="error" status="error">
              <p className="text-red-400">ERROR: {error}</p>
            </ResultBox>
          )}
          {transcription && (
            <ResultBox title="Transcription" status="success">
              <p className="text-gray-200 whitespace-pre-wrap">{transcription}</p>
            </ResultBox>
          )}
          {summary && (
            <ResultBox title="Summary" status="success">
              <p className="text-gray-200 whitespace-pre-wrap">{summary}</p>
            </ResultBox>
          )}
        </div>
      )}
    </AIFormLayout>
  )
}

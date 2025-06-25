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

// export function SpeechToTextForm() {
//   const [language, setLanguage] = useState("en")
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
//       setResult(`Transcribed audio file "${audioFile.name}" in ${language} language`)
//     }, 2000)
//   }

//   return (
//     <AIFormLayout
//       title="Audio Transcriber"
//       description="Speech recognition and text conversion"
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

//         <div className="space-y-2">
//           <Label htmlFor="language" className="text-gray-300 font-mono text-sm">
//             language_code:
//           </Label>
//           <Select value={language} onValueChange={setLanguage}>
//             <SelectTrigger className="bg-black border-gray-700 text-white font-mono focus:border-matrix">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent className="bg-black border-gray-700">
//               <SelectItem value="en">en</SelectItem>
//               <SelectItem value="es">es</SelectItem>
//               <SelectItem value="fr">fr</SelectItem>
//               <SelectItem value="de">de</SelectItem>
//               <SelectItem value="ko">ko</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <Button
//           type="submit"
//           disabled={isLoading || !audioFile}
//           className="w-full bg-black border border-matrix text-matrix hover:bg-matrix hover:text-black font-mono transition-all duration-300"
//         >
//           <Play className="mr-2 h-4 w-4" />
//           {isLoading ? "> Transcribing..." : "> Execute Transcription"}
//         </Button>
//       </form>

//       {(result || error) && (
//         <div className="mt-6">
//           <ResultBox title="transcription_result" status={error ? "error" : "success"}>
//             {error ? (
//               <p className="text-red-400">ERROR: {error}</p>
//             ) : (
//               <div className="space-y-4">
//                 <p className="text-gray-200">OUTPUT: {result}</p>
//                 <div className="code-block p-4 rounded border border-gray-700">
//                   <p className="text-xs text-gray-500">// Transcribed text would be displayed here</p>
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

import React, { useState, useRef } from "react"
import { Button } from "@/components/demo/ui/button"
import { Label } from "@/components/demo/ui/label"
import { Textarea } from "@/components/demo/ui/textarea"
import { AIFormLayout } from "@/components/demo/AIFormLayout"
import { ResultBox } from "@/components/demo/ResultBox"
import { useFormLogic } from "@/components/demo/UseFormLogic"
import { Mic, Play } from "lucide-react"

export function SpeechToTextForm() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)
  const { isLoading, result, error, setLoading, setResult, setError } = useFormLogic()

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError("SpeechRecognition is not supported in this browser.")
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = "ko-KR"
    recognition.interimResults = true
    recognition.continuous = true

    recognition.onresult = (event: any) => {
      let interim = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        interim += event.results[i][0].transcript
      }
      setTranscript(interim)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
    recognitionRef.current = recognition
    setIsRecording(true)
    setError("")
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsRecording(false)
  }

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!transcript.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://127.0.0.1:8000/summarize-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_text: transcript })
      })

      if (!response.ok) {
        const detail = await response.text()
        throw new Error(`API error: ${response.status} ${detail}`)
      }

      const data = await response.json()
      setResult(data.summary)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AIFormLayout
      title="Speech Summarizer"
      description="실시간 음성 인식을 요약"
      icon={<Mic className="h-5 w-5 text-matrix" />}
    >
      <form onSubmit={handleSummarize} className="space-y-6">
        <div>
          <Label htmlFor="transcript" className="text-gray-300 font-mono text-sm">
            Transcript:
          </Label>
          <Textarea
            id="transcript"
            value={transcript}
            readOnly
            rows={5}
            className="bg-black border-gray-700 text-white font-mono text-sm focus:border-matrix transition-all duration-300"
          />
        </div>

        <div className="flex space-x-4">
          <Button
            type="button"
            onClick={isRecording ? stopListening : startListening}
            className="flex-1 bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono transition-all duration-300"
          >
            <Mic className="mr-2 h-4 w-4" />
            {isRecording ? "> Stop Recording" : "> Start Recording"}
          </Button>

          <Button
            type="submit"
            disabled={isLoading || !transcript.trim()}
            className="flex-1 bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono transition-all duration-300"
          >
            <Play className="mr-2 h-4 w-4" />
            {isLoading ? "> Summarizing..." : "> Summarize"}
          </Button>
        </div>
      </form>

      {(result || error) && (
        <div className="mt-6">
          <ResultBox title="summary_result" status={error ? "error" : "success"}>
            {error ? (
              <p className="text-red-400">ERROR: {error}</p>
            ) : (
              <p className="text-gray-200 whitespace-pre-wrap">{result}</p>
            )}
          </ResultBox>
        </div>
      )}
    </AIFormLayout>
  )
}

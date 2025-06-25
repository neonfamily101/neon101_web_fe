"use client"

import React, { useState } from "react"
import { Button } from "@/components/demo/ui/button"
import { Input } from "@/components/demo/ui/input"
import { Label } from "@/components/demo/ui/label"
import { Textarea } from "@/components/demo/ui/textarea"
import { AIFormLayout } from "@/components/demo/AIFormLayout"
import { ResultBox } from "@/components/demo/ResultBox"
import { Monitor } from "lucide-react"

export default function InterviewCoachForm() {
  const [jobField, setJobField] = useState("")
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [evaluations, setEvaluations] = useState<string[]>([])
  const [loadingQ, setLoadingQ] = useState(false)
  const [loadingE, setLoadingE] = useState<boolean[]>([])
  const [error, setError] = useState("")

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobField.trim()) return
    setLoadingQ(true)
    setError("")
    try {
      const res = await fetch('http://127.0.0.1:8000/generate-questions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_field: jobField })
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const { questions } = await res.json()
      setQuestions(questions)
      setAnswers(questions.map(() => ""))
      setEvaluations(questions.map(() => ""))
      setLoadingE(questions.map(() => false))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoadingQ(false)
    }
  }

  const evaluateQuestion = async (index: number) => {
    if (!answers[index].trim()) return
    setLoadingE(prev => prev.map((v, i) => i === index ? true : v))
    setError("")
    try {
      const res = await fetch('http://127.0.0.1:8000/evaluate-answer', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questions[index], answer: answers[index] })
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const { evaluation } = await res.json()
      setEvaluations(prev => prev.map((v, i) => i === index ? evaluation : v))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoadingE(prev => prev.map((v, i) => i === index ? false : v))
    }
  }

  return (
    <AIFormLayout title="Interview AI" description="면접 질문 생성 및 답변 평가" icon={<Monitor className="h-5 w-5 text-matrix" />}>
      {!questions.length ? (
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobField" className="text-gray-300 font-mono text-sm">job_field:</Label>
            <Input id="jobField" placeholder="e.g., Software Engineer" value={jobField}
              onChange={e => setJobField(e.target.value)}
              className="bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300" />
          </div>
          <Button type="submit" disabled={loadingQ || !jobField.trim()}
            className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono transition-all duration-300">
            {loadingQ ? "Generating..." : "Generate Questions"}
          </Button>
          {error && <p className="text-red-400 text-sm">ERROR: {error}</p>}
        </form>
      ) : (
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div key={idx} className="p-4 border border-gray-700 rounded">
              <p className="text-gray-200 mb-2">{`${idx + 1}. ${q}`}</p>
              <Textarea rows={3} value={answers[idx]} onChange={e =>
                setAnswers(prev => prev.map((v, i) => i === idx ? e.target.value : v))
              }
                className="w-full bg-black border-gray-700 text-white placeholder-gray-500 font-mono text-sm focus:border-matrix transition-all duration-300" />
              <Button type="button" onClick={() => evaluateQuestion(idx)}
                disabled={loadingE[idx] || !answers[idx].trim()}
                className="mt-2 bg-black border border-matrix text-matrix hover:bg-matrix hover:text-black font-mono transition-all duration-300">
                {loadingE[idx] ? "Evaluating..." : "Evaluate Answer"}
              </Button>
              {evaluations[idx] && (
                <ResultBox title="evaluation" status="success" className="mt-4">
                  <p className="text-gray-200 whitespace-pre-wrap">{evaluations[idx]}</p>
                </ResultBox>
              )}
            </div>
          ))}
          {error && <p className="text-red-400 text-sm">ERROR: {error}</p>}
        </div>
      )}
    </AIFormLayout>
  )
}

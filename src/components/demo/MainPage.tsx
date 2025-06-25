"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/demo/ui/card"
import { Button } from "@/components/demo/ui/button"
import { Badge } from "@/components/demo/ui/badge"
import {
  ImageIcon,
  Video,
  Mic,
  MessageSquare,
  BarChart3,
  PieChart,
  Radar,
  TrendingUp,
  Terminal,
  Code,
  Database,
  Cpu,
  ArrowRight,
  Play,
  Brackets,
  GitBranch,
  Server,
  Monitor,
} from "lucide-react"

// Import all the existing forms
import { TextToImageForm } from "./ai/TextToImageForm"
import { ImageToVideoForm } from "./ai/ImageToVideoForm"
import { TextToScenarioForm } from "./ai/TextToScenarioForm"
import { SpeechToTextForm } from "./ai/SpeechToTextForm"
import VideoSummarizerForm from "./ai/VideoToTextForm"
import InterviewCoachForm from "./ai/InterviewCoachForm"
import ROICalculator from "./ai/ROICalculator"
import AiGraph from "./ai/AiGraph"
import { PieChartAnalyzerForm } from "./dataAnalysis/PieChartAnalyzerForm"
import { RadarChartAnalyzerForm } from "./dataAnalysis/RadarChartAnalyzerForm"
// import { SankeyChartAnalyzerForm } from "./DataAnalysis/SankeyChartAnalyzerForm"
// import { MixedChartAnalyzerForm } from "./DataAnalysis/MixedChartAnalyzerForm"
import { useInView } from "react-intersection-observer"
import { useCountUpText } from "../../hooks/useCountUpText"





import FadeInSection from "@/components/demo/common/FadeInSection"
const aiTools = [
  {
    id: "text-to-image",
    title: "Image Generator",
    description: "AI-powered visual content generation",
    icon: ImageIcon,
    component: TextToImageForm,
    category: "Creative AI",
    tech: "VISION-101",
  },
  {
    id: "Image-to-video",
    title: "Video Generator",
    description: "Dynamic video content from text input",
    icon: Video,
    component: ImageToVideoForm,
    category: "Creative AI",
    tech: "VIDEO-101",
  },
  {
    id: "text-to-scenario",
    title: "Scenario Engine",
    description: "Strategic planning and scenario modeling",
    icon: MessageSquare,
    component: TextToScenarioForm,
    category: "Strategy AI",
    tech: "SENARIO-101",
  },
  {
    id: "speech-to-text",
    title: "Audio Transcriber",
    description: "Speech recognition and text conversion",
    icon: Mic,
    component: SpeechToTextForm,
    category: "Audio AI",
    tech: "VOICE-101",
  },
  {
    id: "speech-to-speech",
    title: "Video Transformer",
    description: "Advanced video synthesis and modification",
    icon: Mic,
    component: VideoSummarizerForm,
    category: "Audio AI",
    tech: "VIDEO TRANS-101",
  },
  {
    id: "interview-coach",
    title: "Interview AI",
    description: "Intelligent interview preparation system",
    icon: Monitor,
    component: InterviewCoachForm,
    category: "Training AI",
    tech: "INTERVIEW-101",
  },
  {
    id: "roi-calculator",
    title: "ROI Analyzer",
    description: "Advanced return on investment calculations",
    icon: TrendingUp,
    component: ROICalculator,
    category: "Analytics",
    tech: "ANALYZER-101",
  },
  {
    id: "ai-graph",
    title: "Data Visualizer",
    description: "Intelligent chart and graph generation",
    icon: BarChart3,
    component: AiGraph,
    category: "Analytics",
    tech: "VISUALIZER-101",
  },
]

const analyticsTools = [
  {
    id: "pie-chart",
    title: "Pie Chart Engine",
    description: "Market distribution analysis",
    icon: PieChart,
    component: PieChartAnalyzerForm,
    tech: "React",
  },
  {
    id: "radar-chart",
    title: "Radar Analyzer",
    description: "Multi-dimensional data processing",
    icon: Radar,
    component: RadarChartAnalyzerForm,
    tech: "Python",
  },
  // {
  //   id: "sankey-chart",
  //   title: "Flow Mapper",
  //   description: "Customer journey visualization",
  //   icon: GitBranch,
  //   component: SankeyChartAnalyzerForm,
  //   tech: "D3.js",
  // },
  // {
  //   id: "mixed-chart",
  //   title: "Multi-Chart System",
  //   description: "Comprehensive data analysis suite",
  //   icon: BarChart3,
  //   component: MixedChartAnalyzerForm,
  //   tech: "Custom",
  // },
]





const StatsSection = () => {
  const stats = [
    { icon: Database, number: 12, unit: "+", text: "AI Modules", metric: "active", decimals: 0 },
    { icon: Server, number: 500, unit: "+", text: "API Calls", metric: "/day", decimals: 0 },
    { icon: Cpu, number: 99.9, unit: "%", text: "Uptime", metric: "SLA", decimals: 1 },
    { icon: Terminal, number: 24, unit: "/7", text: "System Status", metric: "online", decimals: 0 },
  ]

  return (
    <section className="py-20 bg-gray-900/15 backdrop-blur-sm border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const animatedValue = useCountUpText(stat.number, stat.unit, 3000, true, stat.decimals)

            return (
              <FadeInSection key={index} delay={index * 0.2}>
                <div className="text-center group hover:scale-105 transition-all duration-500">
                  <div className="code-block p-6 rounded-lg mb-4 group-hover:animate-subtle-glow">
                    <Icon className="h-8 w-8 text-matrix mx-auto mb-2" />
                    <h3 className="text-2xl font-mono font-bold text-white">{animatedValue}</h3>
                    <p className="text-gray-400 font-mono text-sm">{stat.text}</p>
                    <Badge variant="outline" className="mt-2 border-matrix text-matrix font-mono text-xs">
                      {stat.metric}
                    </Badge>
                  </div>
                </div>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsSection


const MatrixRain = () => {
  const [chars, setChars] = useState<Array<{ id: number; char: string; left: number; delay: number }>>([])

  useEffect(() => {
    const characters = "NEON101NEON101NEON101NEON101NEON101NEON101"
    const newChars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: characters[Math.floor(Math.random() * characters.length)],
      left: Math.random() * 100,
      delay: Math.random() * 1,
    }))
    setChars(newChars)
  }, [])

  return (
    <div className="matrix-bg">
      {chars.map((char) => (
        <div
          key={char.id}
          className="matrix-char"
          style={{
            left: `${char.left}%`,
            animationDelay: `${char.delay}s`,
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  )
}

export function MainPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const categories = ["all", "Creative AI", "Strategy AI", "Audio AI", "Training AI", "Analytics"]

  const filteredTools = activeCategory === "all" ? aiTools : aiTools.filter((tool) => tool.category === activeCategory)

  const renderSelectedTool = () => {
    const tool = [...aiTools, ...analyticsTools].find((t) => t.id === selectedTool)
    if (!tool) return null

    const Component = tool.component
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <MatrixRain />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="code-block p-2 rounded">
                  <Terminal className="h-6 w-6 text-matrix" />
                </div>
                <div>
                  <h2 className="text-2xl font-mono text-white">{tool.title}</h2>
                  <p className="text-gray-400 font-mono text-sm">{tool.description}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedTool(null)}
                className="bg-black border-matrix text-matrix hover:bg-gray-900 font-mono"
              >
                ← Back
              </Button>
            </div>
            <Component />
          </div>
        </div>
      </div>
    )
  }

  if (selectedTool) {
    return renderSelectedTool()
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRain />

      {/* Hero Section */}
      {/* <section className="relative bg-terminal min-h-screen flex items-center"> */}
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center transition-all duration-1000">
              <div className="flex items-center justify-center mb-8">
                <div className="code-block p-4 rounded-lg mr-4 animate-subtle-glow">
                  <Terminal className="h-12 w-12 text-matrix" />
                </div>
                <h1 className="text-6xl font-mono font-bold">
                  <span className="text-white">AX</span>
                  <span className="text-matrix terminal-cursor">_Marketing</span>
                </h1>
              </div>
              <div className="font-mono text-lg mb-8 text-gray-300">
                <p className="mb-2">{"> Initializing AI Development Platform..."}</p>
                <p className="mb-2">{"> Loading marketing intelligence modules..."}</p>
                <p className="text-matrix">{"> System ready. Welcome, developer."}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-matrix border-matrix text-matrix hover:bg-gray-900 font-mono"
                  onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Code className="mr-2 h-5 w-5" />
                  {"> Access Tools"} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-matrix text-matrix hover:bg-gray-900 font-mono"
                >
                  <Play className="mr-2 h-5 w-5" /> {"> View Demo"}
                </Button> */}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>





      {/* state section */}
      <StatsSection />


      {/* AI Tools Section */}
      <section id="tools" className="py-20 bg-gray-900/25 relative">
        <div className="container mx-auto px-4">

          {/* 제목 + 설명 */}
          <FadeInSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <Brackets className="h-6 w-6 text-matrix mr-3" />
                <h2 className="text-4xl font-mono font-bold text-white">Development Modules</h2>
                <Brackets className="h-6 w-6 text-matrix ml-3" />
              </div>
              <p className="text-gray-400 font-mono max-w-3xl mx-auto">
                {"// Advanced AI-powered development tools for modern marketing solutions"}
              </p>
            </div>
          </FadeInSection>

          {/* 카테고리 필터 */}
          <FadeInSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant="outline"
                  onClick={() => setActiveCategory(category)}
                  className={`font-mono px-4 py-2 rounded-md transition-all duration-300 ${activeCategory === category
                    ? "bg-matrix text-white border-white border-2 shadow-lg"
                    : "bg-black border border-gray-700 text-gray-300 hover:border-matrix hover:text-matrix"
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {category === "all" ? "all_modules" : category.toLowerCase().replace(" ", "_")}
                </Button>
              ))}
            </div>
          </FadeInSection>

          {/* AI Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <FadeInSection key={tool.id} delay={index * 0.1}>
                  <Card
                    className="dev-card group hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden"
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    <div className="scan-line"></div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="code-block p-2 rounded">
                          <Icon className="h-6 w-6 text-matrix" />
                        </div>
                        <Badge variant="outline" className="border-gray-600 text-gray-400 font-mono text-xs">
                          {tool.tech}
                        </Badge>
                      </div>
                      <CardTitle className="text-white font-mono text-lg group-hover:text-matrix transition-colors">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 font-mono text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono transition-all duration-300">
                        <Code className="mr-2 h-4 w-4" />
                        {"> Execute"} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </FadeInSection>
              )
            })}
          </div>

          {/* Analytics Tools Section */}
          <FadeInSection delay={0.4}>
            <div className="mt-20">
              <h3 className="text-3xl font-mono font-bold text-white mb-12 text-center">{"// Data Analysis Suite"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {analyticsTools.map((tool, index) => {
                  const Icon = tool.icon
                  return (
                    <FadeInSection key={tool.id} delay={index * 0.1}>
                      <Card
                        className="dev-card group hover:scale-110 transition-all duration-500 cursor-pointer relative overflow-hidden"
                        onClick={() => setSelectedTool(tool.id)}
                      >
                        <div className="scan-line"></div>
                        <CardHeader className="text-center">
                          <div className="code-block p-3 rounded mx-auto w-fit mb-4">
                            <Icon className="h-6 w-6 text-matrix" />
                          </div>
                          <CardTitle className="text-sm text-white font-mono group-hover:text-matrix transition-colors">
                            {tool.title}
                          </CardTitle>
                          <CardDescription className="text-xs text-gray-400 font-mono">
                            {tool.description}
                          </CardDescription>
                          <Badge variant="outline" className="border-gray-600 text-gray-400 font-mono text-xs mt-2">
                            {tool.tech}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-black border border-matrix text-matrix hover:bg-white hover:text-black font-mono text-xs">
                            {"> Analyze"}
                          </Button>
                        </CardContent>
                      </Card>
                    </FadeInSection>
                  )
                })}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-terminal border-t border-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeInSection>
            <div>
              <h2 className="text-4xl font-mono font-bold mb-6 text-white">{"> Ready to Deploy?"}</h2>
              <p className="text-gray-400 font-mono max-w-2xl mx-auto mb-10">
                {"// Join the development community building the future of AI-powered marketing"}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" variant="outline" className="border-matrix text-matrix hover:bg-gray-900 font-mono">
                  <Terminal className="mr-2 h-5 w-5" />
                  {"> Initialize Project"}
                </Button>
                <Button size="lg" variant="outline" className="border-matrix text-matrix hover:bg-gray-900 font-mono">
                  {"> View Documentation"}
                </Button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-6">
                  <div className="code-block p-2 rounded mr-3">
                    <Terminal className="h-5 w-5 text-matrix" />
                  </div>
                  <h3 className="text-xl font-mono font-bold text-white">NEON101</h3>
                </div>
                <p className="text-gray-400 font-mono text-sm">{"// NEON101은 'Human in the Loop' 철학을 바탕으로, AI의 자동화 능력과 인간의 통찰력이 조화를 이루는 맞춤형 AI Transformation 서비스와 플랫폼을 제공하기 위해 탄생한 AX Company Group입니다."}</p>
              </div>
              <div style={{ position: "relative", left: "50px" }}>
                <h4
                  className="font-mono font-semibold mb-6 text-matrix cursor-pointer hover:underline"
                  onClick={() => {
                    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }}
                >
                  modules/
                </h4>
                <ul className="space-y-3 text-gray-400 font-mono text-sm">
                  <li className="hover:text-matrix transition-colors cursor-pointer">Image Generator/</li>
                  <li className="hover:text-matrix transition-colors cursor-pointer">Video Generator/</li>
                  <li className="hover:text-matrix transition-colors cursor-pointer">Analysis/</li>
                  <li className="hover:text-matrix transition-colors cursor-pointer">Text Engines/</li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono font-semibold mb-6 text-matrix">Partner/</h4>
                <ul className="space-y-3 text-gray-400 font-mono text-sm">
                  <li className="hover:text-matrix transition-colors cursor-pointer">For individuals/</li>
                  <li className="hover:text-matrix transition-colors cursor-pointer">For freelancers/</li>
                  <li className="hover:text-matrix transition-colors cursor-pointer">For teams/</li>
                  <li className="hover:text-matrix transition-colors cursor-pointer">For enterprises/</li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono font-semibold mb-6 text-matrix">contact/</h4>
                <ul className="space-y-3 text-gray-400 font-mono text-sm">
                  <li className="hover:text-matrix transition-colors cursor-pointer">// Tel:  02-562-1101</li>
                  <br></br>
                  <li className="hover:text-matrix transition-colors cursor-pointer">// Email:  neon101@neon101.ai</li>
                  <br></br>
                  <li className="hover:text-matrix transition-colors cursor-pointer">// Address:  3th, 31, SeolleungRo 119-Gil GangNamGu, Seoul, Republic of Korea</li>
                </ul>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 font-mono text-sm">
              <p>{"// @2025 NEON101. All rights reserved."}</p>
            </div>
          </FadeInSection>
        </div>
      </footer>
    </div>
  )
}

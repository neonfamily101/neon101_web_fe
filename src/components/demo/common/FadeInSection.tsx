// components/common/FadeInSection.tsx
"use client"

import { useInView } from "react-intersection-observer"
import React from "react"

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number // 초 단위 (기본값: 0)
  className?: string
}

export default function FadeInSection({ children, delay = 0, className = "" }: FadeInSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={`animate-slide-up ${inView ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

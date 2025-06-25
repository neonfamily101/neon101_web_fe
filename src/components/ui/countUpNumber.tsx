"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpNumberProps {
  start?: number // ✅ 추가
  target: number
  duration?: number
  threshold?: number
  startDelay?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function CountUpNumber({
  start = 0,
  target,
  duration = 3000,
  threshold = 0.3,
  startDelay = 300,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentNumber, setCurrentNumber] = useState(start) // ✅ 초기값을 start로 설정
  const hasStarted = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, isVisible])

  useEffect(() => {
    if (!isVisible || hasStarted.current) return
    hasStarted.current = true

    const timeout = setTimeout(() => {
      const startTime = Date.now()

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = progress * progress * progress
        const newValue = Math.floor(start + (target - start) * eased)

        setCurrentNumber(newValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCurrentNumber(target)
        }
      }

      animate()
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [isVisible, start, target, duration, startDelay])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {currentNumber.toLocaleString()}
      {suffix}
    </span>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import FadeInSection from '@/components/common/fadeInSection'
import { TypewritingAnimatedText } from '@/components/consulting/TypewritingAnimatedText'
import AsciiBinaryFlow from '@/components/consulting/AsciiBinaryFlow'
import { ScrollPages } from '@/components/consulting/scrollPages'

export default function ConsultingPage() {
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const headlines = [
    "Data World \nDesign",
    "Big Data \nAnalysis",
    "Machine \nLearning",
    "AI \nTransformation",
    "AX \nMarketing Platform"
  ]

  const imageUrls = [
    "/images/consulting/data_world_design.jpg",
    "images/consulting/big_data_analysis.01.jpg",
    "images/consulting/machine_learning.jpg",
    "images/consulting/test.01.jpg",
    "images/consulting/ax_marketing.jpg"
  ]

  return (
    <div className="bg-black" translate="no">
      <Header />
      <main className="consulting-hero-container">
        <AsciiBinaryFlow />
        <div className="consulting-hero-content">
          <TypewritingAnimatedText 
            text="Consulting For " 
            startAnimation={startAnimation} 
            center={true} 
            endings={['\nData World Design', '\nBig Data Analysis', '\nMachine Learning', '\nAI Transformation', '\nAX Marketing Platform']}
            className="consulting-hero-text"
            speed={120}
          />
        </div>
      </main>
      <ScrollPages headlines={headlines} imageUrls={imageUrls} />
      <FadeInSection>
        <Footer />
      </FadeInSection>
    </div>
  )
} 
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ParallaxBackgroundProps {
  children: React.ReactNode
  fadeOut?: boolean
}

export default function ParallaxBackground({ children, fadeOut = false }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [startPosition, setStartPosition] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  useEffect(() => {
    const calculateStartPosition = () => {
      const advantagesSection = document.getElementById('vorteile')
      if (advantagesSection) {
        const rect = advantagesSection.getBoundingClientRect()
        setStartPosition(window.pageYOffset + rect.top)
      }
    }

    calculateStartPosition()
    window.addEventListener('resize', calculateStartPosition)
    return () => window.removeEventListener('resize', calculateStartPosition)
  }, [])

  // Parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  
  // Adjusted opacity values for better visibility
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.2, 0.2, 0]
  )

  return (
    <div ref={ref} className="relative">
      <motion.div 
        style={{ 
          y: backgroundY,
          opacity: backgroundOpacity
        }}
        className="fixed left-0 right-0 pointer-events-none"
      >
        {/* Forest background with gradient overlay for fade-out effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,1)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1171.jpg-Eg6oJv5e1xO7WZnRRXj5q7MJKtjCzL.jpeg')`,
            top: `${startPosition}px`,
            height: '200vh', // Extend beyond viewport to ensure coverage
          }}
        />
      </motion.div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}


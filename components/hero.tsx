'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import ServicesSlideshow from './services-slideshow'
import IntroAnimation from './intro-animation'
import GlassShards from './glass-shards'

export default function Hero() {
  const ref = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  useEffect(() => {
    setIsClient(true)
    const introSeen = localStorage.getItem('introSeen')
    if (introSeen) {
      setShowIntro(false)
      setHasSeenIntro(true)
    }
  }, [])

  const handleAnimationComplete = () => {
    setShowIntro(false)
    setHasSeenIntro(true)
    localStorage.setItem('introSeen', 'true')
  }

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <section ref={ref} className="min-h-screen pt-24 relative overflow-hidden flex flex-col items-center justify-center">
      {showIntro && !hasSeenIntro && <IntroAnimation onAnimationComplete={handleAnimationComplete} />}
      
      {/* Background layers */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 z-0"
      >
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70 z-10" />
        
        {/* Shattered glass background */}
        <motion.div
          className="absolute inset-0 z-0 opacity-60"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shattered-glass-space-background-with-design-space.jpg-exriihiweHYqL67ZexDMiZ15hHJwpQ.jpeg"
            alt="Shattered glass background"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
        </motion.div>

        {/* Glass Shards */}
        <GlassShards />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Einezlunternehmen-isK3EoLXb8sbOCDZ1AjncTJ1PMdqS0.png"
              alt="Black Forest Autoglas Logo"
              width={240}
              height={240}
              className="mx-auto"
              priority
            />
          </motion.div>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4"
        >
          Black Forest <span className="text-gradient">Autoglas</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-xl sm:text-2xl max-w-3xl mx-auto text-white"
        >
          Ihr Spezialist für Autoglas in Neuenburg am Rhein
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10"
        >
          <motion.a
            href="#leistungen"
            onClick={(e) => {
              e.preventDefault()
              const leistungen = document.getElementById('leistungen')
              if (leistungen) {
                const offset = 80
                const elementPosition = leistungen.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - offset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                })
              }
            }}
            className="bg-gradient text-white font-bold py-3 px-8 rounded-full inline-block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(200,0,0)" }}
            whileTap={{ scale: 0.95 }}
          >
            Unsere Leistungen
          </motion.a>
        </motion.div>
      </div>

      {/* Services Slideshow */}
      <div className="w-full mt-8">
        <ServicesSlideshow />
      </div>
    </section>
  )
}


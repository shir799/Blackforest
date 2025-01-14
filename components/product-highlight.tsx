'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'
import { ShoppingCart, Leaf, Zap, Sparkles } from 'lucide-react'

const USP_BADGES = [
  { icon: Leaf, text: 'Umweltfreundlich' },
  { icon: Zap, text: 'Starke Reinigungskraft' },
  { icon: Sparkles, text: 'Streifenfreier Glanz' },
]

export default function ProductHighlight() {
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsInView(latest > 0.1 && latest < 0.9)
  })

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/car-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
      }}
    >
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: backgroundOpacity }}
      />

      <motion.div
        className="relative z-10 text-center px-4"
        style={{ y: isMobile ? 0 : smoothY, opacity: smoothOpacity, scale: smoothScale }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Black Forest Glass Reiniger
        </motion.h2>

        <motion.div
          className="relative inline-block"
          animate={{ rotate: isHovered ? [0, -5, 5, -5, 5, 0] : 0 }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Image
            src="/glass-cleaner.png"
            alt="Black Forest Glass Reiniger"
            width={300}
            height={400}
            className="mx-auto mb-6"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
            animate={{
              x: ['100%', '-100%'],
              transition: { repeat: Infinity, duration: 1.5, ease: 'linear' }
            }}
          />
        </motion.div>

        <motion.div
          className="flex justify-center space-x-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {USP_BADGES.map((badge, index) => (
            <motion.div
              key={badge.text}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ delay: index * 0.2 }}
            >
              <badge.icon className="w-8 h-8 text-red-500 mb-2" />
              <span className="text-sm text-white">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="bg-gradient text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-all hover:opacity-90"
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(200,0,0)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Jetzt kaufen für nur 4,99 €
        </motion.button>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: glowOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-red-500/20 to-transparent" />
        </motion.div>
      </motion.div>

      {isHovered && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Strahlend sauber.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Schonend für Glas und Umwelt.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Made in Germany.
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  )
}


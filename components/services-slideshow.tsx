'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { SERVICES } from '@/lib/constants'
import { Clock, Car, MapPin, Phone } from 'lucide-react'

const IconComponents = [Clock, Car, MapPin, Phone]

export default function ServicesSlideshow() {
  const [currentPair, setCurrentPair] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  // Calculate total number of pairs
  const totalPairs = Math.ceil(SERVICES.length / 2)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPair((prev) => (prev + 1) % totalPairs)
    }, 3000) // Increased to 3 seconds between transitions

    return () => clearInterval(timer)
  }, [totalPairs])

  // Get current pair of services
  const getCurrentPair = () => {
    const startIndex = currentPair * 2
    return [
      SERVICES[startIndex],
      SERVICES[startIndex + 1] || SERVICES[0] // Wrap around to first service if needed
    ]
  }

  return (
    <motion.div 
      ref={containerRef}
      style={{ y, opacity }}
      className="w-full bg-black/50 backdrop-blur-sm py-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPair}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 grid grid-cols-2 gap-8"
            >
              {getCurrentPair().map((service, index) => (
                <div key={`${currentPair}-${index}`} className="flex items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 bg-gradient rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    {IconComponents[index + currentPair * 2] && React.createElement(IconComponents[index + currentPair * 2], { 
                      className: "w-6 h-6 text-white"
                    })}
                  </motion.div>
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl font-bold text-white mb-1"
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm text-gray-300"
                    >
                      {service.description}
                    </motion.p>
                    {service.duration && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2 mt-1"
                      >
                        <Clock className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-500 font-medium">
                          {service.duration}
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-1 mt-4 justify-center">
          {Array.from({ length: totalPairs }).map((_, index) => (
            <motion.div
              key={index}
              className="h-1 w-12 rounded-full overflow-hidden bg-gray-800"
            >
              {currentPair === index && (
                <motion.div
                  className="h-full bg-gradient"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}


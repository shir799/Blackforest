'use client'

import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

// Sample Instagram posts with proper placeholder images
const INSTAGRAM_POSTS = [
  {
    id: '1',
    imageUrl: '/placeholder.svg?height=600&width=600',
    likes: 124,
    caption: 'Steinschlagreparatur erfolgreich abgeschlossen! 🚗✨ #Autoglas #Reparatur',
    date: '2024-01-13'
  },
  {
    id: '2',
    imageUrl: '/placeholder.svg?height=600&width=600',
    likes: 89,
    caption: 'Neue Technologie im Einsatz bei der Windschutzscheibenreparatur 🛠️',
    date: '2024-01-12'
  },
  {
    id: '3',
    imageUrl: '/placeholder.svg?height=600&width=600',
    likes: 156,
    caption: 'Vorher/Nachher: Perfekte Scheibenwechsel garantiert! 💪',
    date: '2024-01-11'
  },
  {
    id: '4',
    imageUrl: '/placeholder.svg?height=600&width=600',
    likes: 201,
    caption: 'Unser Team steht für Sie bereit! 👥 #BlackForestAutoglas',
    date: '2024-01-10'
  },
  {
    id: '5',
    imageUrl: '/placeholder.svg?height=600&width=600',
    likes: 167,
    caption: 'Qualität made in Black Forest 🌲 #Qualität #Service',
    date: '2024-01-09'
  },
  {
    id: '6',
    imageUrl: '/placeholder.svg?height=600&width=600',
    likes: 145,
    caption: 'Mobiler Service im Einsatz! 🚐💨',
    date: '2024-01-08'
  }
]

export default function InstagramFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const postsPerView = typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 
                       typeof window !== 'undefined' && window.innerWidth < 1024 ? 3 : 6

  const maxIndex = Math.max(0, INSTAGRAM_POSTS.length - postsPerView)

  const handleNext = async () => {
    if (currentIndex < maxIndex) {
      await controls.start({
        x: -((currentIndex + 1) * (100 / postsPerView)) + '%',
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      })
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = async () => {
    if (currentIndex > 0) {
      await controls.start({
        x: -((currentIndex - 1) * (100 / postsPerView)) + '%',
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      })
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50
    const offset = info.offset.x
    
    if (Math.abs(offset) > threshold) {
      if (offset > 0 && currentIndex > 0) {
        handlePrev()
      } else if (offset < 0 && currentIndex < maxIndex) {
        handleNext()
      }
    }
    setIsDragging(false)
  }

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4">Folge uns auf Instagram</h2>
          <a 
            href="https://www.instagram.com/black_forest_autoglas/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xl text-white hover:text-red-500 transition-colors"
          >
            <Instagram className="w-6 h-6 mr-2" />
            @black_forest_autoglas
          </a>
        </motion.div>

        <div className="relative">
          <div ref={constraintsRef} className="overflow-hidden">
            <motion.div
              animate={controls}
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              className="flex"
              style={{ touchAction: 'none' }}
            >
              {INSTAGRAM_POSTS.map((post, index) => (
                <motion.a
                  key={post.id}
                  href="https://www.instagram.com/black_forest_autoglas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-none w-full sm:w-1/3 lg:w-1/6 p-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 group"
                  >
                    <Image
                      src={post.imageUrl}
                      alt={post.caption}
                      width={600}
                      height={600}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="text-sm font-medium mb-1">❤️ {post.likes}</p>
                        <p className="text-xs line-clamp-2">{post.caption}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <AnimatePresence>
            {currentIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full backdrop-blur-sm"
                aria-label="Previous posts"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {currentIndex < maxIndex && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full backdrop-blur-sm"
                aria-label="Next posts"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-6 gap-1">
          {Array.from({ length: Math.ceil(INSTAGRAM_POSTS.length / postsPerView) }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-red-500' : 'bg-gray-600'}`}
              initial={false}
              animate={{
                scale: i === currentIndex ? 1.2 : 1,
                backgroundColor: i === currentIndex ? '#ef4444' : '#4b5563'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


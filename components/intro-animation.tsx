'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function IntroAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [videoProgress, setVideoProgress] = useState(0)
  const [canAutoplay, setCanAutoplay] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0
      const playPromise = videoRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name === "NotAllowedError") {
            setCanAutoplay(false)
          }
        })
      }

      videoRef.current.addEventListener('timeupdate', updateProgress)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', updateProgress)
      }
    }
  }, [])

  const updateProgress = () => {
    if (videoRef.current) {
      setVideoProgress(videoRef.current.currentTime / videoRef.current.duration)
    }
  }

  const handleVideoEnd = () => {
    if (videoRef.current) {
      setTimeout(() => {
        onAnimationComplete()
      }, 250) // Short delay for transition
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1, filter: 'blur(0px)' }}
        animate={{ filter: videoProgress > 0.9 ? 'blur(10px)' : 'blur(0px)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          onEnded={handleVideoEnd}
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glass%20crack%20effect%20(1)-xTYn3LzeAkrnOWNOGOhtupHn5x9z26.mp4" type="video/mp4" />
        </video>

        {!canAutoplay && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute z-10 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.play()
                setCanAutoplay(true)
              }
            }}
          >
            Start Animation
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ 
            opacity: videoProgress > 0.7 ? 0 : 1, 
            scale: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div 
            className="relative w-64 h-64 md:w-96 md:h-96"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Einezlunternehmen-isK3EoLXb8sbOCDZ1AjncTJ1PMdqS0.png"
              alt="Black Forest Autoglas Logo"
              width={384}
              height={384}
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}


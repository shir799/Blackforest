'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function BlogBackground() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.2])

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <motion.div 
        className="fixed inset-0 w-full h-full"
        style={{ opacity }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/19717.jpg-r29MwsM1DrAmnjegtHytpGjCSJ0y1M.jpeg"
          alt="Black Forest Background"
          fill
          className="object-cover mix-blend-soft-light"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </motion.div>
    </div>
  )
}


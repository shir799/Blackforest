'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function BlogHeader() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="absolute top-4 left-4 text-white hover:text-red-500 transition-colors">
          <Home size={24} />
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Blog</span> – Tipps und Infos
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Erfahren Sie mehr über die professionelle Pflege und Reparatur Ihrer Autoscheiben
          </p>
        </motion.div>
      </div>
    </section>
  )
}


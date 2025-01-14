'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft } from 'lucide-react'

interface BlogPostProps {
  title: string
  date: string
  image: string
  content: string
  children?: React.ReactNode
}

export default function BlogPost({ title, date, image, content, children }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zum Blog
        </Link>

        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="flex items-center text-sm text-gray-400 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(date).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        <h1 className="text-4xl font-bold text-gradient mb-8">{title}</h1>

        <div className="prose prose-invert max-w-none">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-300 mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {children}
      </motion.div>
    </article>
  )
}


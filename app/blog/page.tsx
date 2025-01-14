import { Metadata } from 'next'
import BlogHeader from '@/components/blog/blog-header'
import BlogGrid from '@/components/blog/blog-grid'
import BlogBackground from '@/components/blog/blog-background'

export const metadata: Metadata = {
  title: 'Blog - Tipps und Infos | Black Forest Autoglas',
  description: 'Erfahren Sie mehr über Autoglas-Reparatur, Scheibenpflege und Steinschlag-Prävention. Expertentipps von Black Forest Autoglas.',
  keywords: 'Autoscheiben reparieren, Steinschlag reparieren, Scheibenpflege, Winter Steinschlag Tipps',
}

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black/80 to-gray-900/80">
      <BlogBackground />
      <div className="relative z-10 backdrop-blur-sm">
        <BlogHeader />
        <BlogGrid />
      </div>
    </main>
  )
}


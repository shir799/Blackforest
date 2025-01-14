'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight, ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookingPopup from '@/components/booking-popup'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  slug: string
  priority?: boolean
  showProduct?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 'quick-repair',
    title: 'Autoscheibe kaputt? Warum schnelles Handeln wichtig ist!',
    excerpt: 'Ein kleiner Steinschlag kann schnell große Probleme verursachen! Selbst ein winziger Riss kann sich durch Temperaturschwankungen oder Vibrationen zu einem großen Schaden ausweiten.',
    content: `Ein kleiner Steinschlag kann schnell große Probleme verursachen! Selbst ein winziger Riss kann sich durch Temperaturschwankungen oder Vibrationen zu einem großen Schaden ausweiten. Das beeinträchtigt nicht nur die Sicht, sondern auch die Stabilität der Scheibe.

    Unser Tipp: Lassen Sie Steinschläge sofort reparieren! In nur 30 Minuten können wir den Schaden beheben – oft kostenlos über Ihre Teilkaskoversicherung. Warten Sie nicht, bis der Schaden größer wird, und buchen Sie direkt einen Termin bei uns!`,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wie%20schnell%20sollte%20man%20eine%20Autoscheibe%20reparieren%20lassen_.jpg-3JAjUT1xesebdBIIGGzV6LOwDcl1GB.jpeg',
    date: '2024-01-14',
    slug: 'autoscheibe-schnell-reparieren',
    priority: true
  },
  {
    id: 'glass-care',
    title: 'Perfekte Sicht: Die besten Tipps zur Scheibenpflege',
    excerpt: 'Klare Autoscheiben sind nicht nur ein optischer Hingucker, sondern auch entscheidend für Ihre Sicherheit. Mit diesen Tipps bleiben Ihre Scheiben in Top-Zustand.',
    content: `Klare Autoscheiben sind nicht nur ein optischer Hingucker, sondern auch entscheidend für Ihre Sicherheit.  Regelmäßige Reinigung und Pflege schützen Ihre Scheiben vor Beschädigungen und gewährleisten eine optimale Sicht.  Verwenden Sie spezielle Glasreiniger und Mikrofasertücher, um Kratzer zu vermeiden.`,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scheibenpflege%20%E2%80%93%20So%20bleibt%20Ihr%20Glas%20sauber%20und%20sicher.jpg-j5TklgSnrfYRSXowvkoKBAeeQpfLG2.jpeg',
    date: '2024-01-13',
    slug: 'scheibenpflege-tipps',
    showProduct: true
  },
  {
    id: 'winter-damage',
    title: 'Steinschlag im Winter? So schützen Sie Ihre Autoscheibe',
    excerpt: 'Der Winter ist Hochsaison für Steinschläge! Streugut, Rollsplitt und extreme Temperaturschwankungen setzen Ihren Scheiben zu.',
    content: `Der Winter ist Hochsaison für Steinschläge! Streugut, Rollsplitt und extreme Temperaturschwankungen setzen Ihren Scheiben besonders zu.  Um Ihre Autoscheiben zu schützen, sollten Sie im Winter besonders vorsichtig fahren und auf ausreichenden Abstand zu anderen Fahrzeugen achten.  Eine regelmäßige Scheibenreinigung kann ebenfalls helfen, die Bildung von Rissen zu verhindern.`,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Steinschlag%20im%20Winter%20%E2%80%93%20Warum%20er%20besonders%20gefa%CC%88hrlich%20ist.jpg-oUHXu0IRxHDf72mTcdH71rp1vib8LB.jpeg',
    date: '2024-01-12',
    slug: 'steinschlag-im-winter'
  },
  {
    id: 'what-to-do',
    title: 'Steinschlag? Das müssen Sie jetzt wissen!',
    excerpt: 'Ein Steinschlag ist ärgerlich, aber kein Grund zur Panik. So handeln Sie richtig und vermeiden Folgeschäden.',
    content: `Ein Steinschlag ist ärgerlich, aber kein Grund zur Panik.  Wichtig ist, schnell zu handeln, um Folgeschäden zu vermeiden.  Dokumentieren Sie den Schaden mit Fotos und melden Sie ihn Ihrer Versicherung.  Eine frühzeitige Reparatur verhindert, dass der Riss größer wird und die Scheibe ausgetauscht werden muss.`,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Was%20tun%20bei%20einem%20Steinschlag.jpg-H2uWLyeD2rdTIagYuJ5nPrDaP0rxAk.jpeg',
    date: '2024-01-11',
    slug: 'was-tun-bei-steinschlag'
  }
]

export default function BlogGrid() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                  {post.title}
                </h2>

                <p className="text-gray-300">
                  {post.excerpt}
                </p>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-400 p-0"
                    onClick={() => setSelectedPost(post)}
                  >
                    <span className="flex items-center">
                      Weiterlesen
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </Button>

                  {post.priority && (
                    <Button
                      onClick={() => setIsBookingOpen(true)}
                      className="bg-gradient text-white"
                    >
                      Termin buchen
                    </Button>
                  )}

                  {post.showProduct && (
                    <Button
                      onClick={() => window.location.href = '/#product'}
                      className="bg-gradient text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Reiniger kaufen
                    </Button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative max-w-4xl mx-auto my-12 px-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
                <div className="relative h-96">
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-white hover:text-red-500"
                    onClick={() => setSelectedPost(null)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gradient mb-4">
                    {selectedPost.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    {selectedPost.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-300 mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {selectedPost.priority && (
                    <Button
                      onClick={() => setIsBookingOpen(true)}
                      className="bg-gradient text-white mt-6"
                    >
                      Jetzt Termin vereinbaren
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingPopup isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  )
}


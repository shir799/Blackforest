'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Sparkles, Leaf, Droplets, ShieldCheck, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const uspBadges = [
  {
    icon: Leaf,
    text: 'Umweltfreundliche Formel',
    description: 'Schonend für Mensch und Umwelt'
  },
  {
    icon: Droplets,
    text: 'Pfirsich-Duft',
    description: 'Angenehmer Duft beim Reinigen'
  },
  {
    icon: Sparkles,
    text: 'Streifenfreie Reinigung',
    description: 'Perfektes Ergebnis garantiert'
  },
  {
    icon: ShieldCheck,
    text: 'Premium Qualität',
    description: 'Made in Black Forest'
  }
]

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    { stiffness: 100, damping: 30 }
  )

  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 10]),
    { stiffness: 100, damping: 30 }
  )

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
    { stiffness: 100, damping: 30 }
  )

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    { stiffness: 100, damping: 30 }
  )

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsAddingToCart(false)
    alert('Produkt wurde in den Warenkorb gelegt!')
  }

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden py-24 bg-gradient-to-b from-black to-gray-900">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
        <div className="absolute inset-0 bg-[url('/car-surface.jpg')] bg-cover bg-center" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4">
            Unser Premium Glasreiniger
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Entdecken Sie die perfekte Lösung für makellos saubere Scheiben
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image with Float Effect */}
          <motion.div
            style={{ opacity }}
            className="relative mx-auto max-w-md"
          >
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DesignohneTitel-7-AddDuHOUqFb4GerCErAm7f3KWjeam3.png"
                alt="lackfieber GLASREINIGER"
                width={400}
                height={600}
                className="mx-auto"
                priority
              />
              
              {/* Glow Effect */}
              <motion.div
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 bg-gradient-radial from-red-500/20 to-transparent blur-xl"
              />

              {/* Floating Features */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-full"
                >
                  {['Streifenfrei', 'Pfirsich-Duft', 'Made in Germany'].map((text, index) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute w-full text-center"
                      style={{ top: `${(index + 1) * 25}%` }}
                    >
                      <span className="bg-black/80 text-white px-4 py-2 rounded-full text-sm">
                        {text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="box-gradient rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Mehr als nur ein Glasreiniger
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Unser lackfieber GLASREINIGER mit Pfirsich-Duft vereint professionelle Reinigungskraft mit angenehmem Dufterlebnis. Speziell entwickelt für die streifenfreie Reinigung aller Glasflächen an Ihrem Fahrzeug, garantiert er kristallklare Durchsicht und langanhaltende Sauberkeit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {uspBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="box-gradient rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <badge.icon className="w-6 h-6 text-red-500" />
                    <h4 className="font-semibold text-white">{badge.text}</h4>
                  </div>
                  <p className="text-sm text-gray-300">{badge.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-3xl font-bold text-white">
                4,99 €
                <span className="text-sm text-gray-400 ml-2">inkl. MwSt.</span>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="bg-gradient text-white font-bold py-3 px-8 rounded-full inline-flex items-center justify-center transition-all hover:opacity-90 w-full sm:w-auto"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAddingToCart ? 'Wird hinzugefügt...' : 'Jetzt kaufen'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


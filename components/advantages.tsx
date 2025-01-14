'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Clock, Truck, CreditCard } from 'lucide-react'
import ParallaxBackground from './shared/parallax-background'

const advantages = [
  { icon: Shield, title: "Qualität", description: "Höchste Sicherheits- und Qualitätsstandards für Ihre Sicherheit" },
  { icon: Clock, title: "Schnelligkeit", description: "Effiziente Reparaturen, oft in nur 30 Minuten abgeschlossen" },
  { icon: Truck, title: "Mobilität", description: "Flexibler Service: Vor Ort oder mit Hol- und Bringdienst" },
  { icon: CreditCard, title: "Transparenz", description: "Klare Preisgestaltung und reibungslose Versicherungsabwicklung" },
]

export default function Advantages() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  return (
    <ParallaxBackground>
      <section id="vorteile" ref={ref} className="relative py-24 overflow-hidden bg-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gradient">Ihre Vorteile</h2>
            <p className="mt-4 text-xl text-white">Warum Sie sich für Black Forest Autoglas entscheiden sollten</p>
          </motion.div>
          
          <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="box-gradient rounded-xl p-6 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
              >
                <motion.div 
                  className="flex items-center mb-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-gradient rounded-full flex items-center justify-center text-white mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <advantage.icon className="w-6 h-6" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white">{advantage.title}</h3>
                </motion.div>
                <p className="text-white">{advantage.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </ParallaxBackground>
  )
}


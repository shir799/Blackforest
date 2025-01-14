'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SERVICES } from '@/lib/constants'
import { Clock, Car, MapPin, Phone } from 'lucide-react'

export default function Services() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  return (
    <section id="leistungen" ref={ref} className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient">Unsere Leistungen</h2>
          <p className="mt-4 text-xl text-white">Professionell, schnell und zuverlässig</p>
        </motion.div>
        
        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              className="bg-black bg-opacity-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-red-900"
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
                  {index === 0 && <Clock className="w-6 h-6" strokeWidth={1.5} />}
                  {index === 1 && <Car className="w-6 h-6" strokeWidth={1.5} />}
                  {index === 2 && <MapPin className="w-6 h-6" strokeWidth={1.5} />}
                  {index === 3 && <Phone className="w-6 h-6" strokeWidth={1.5} />}
                </motion.div>
                <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
              </motion.div>
              <p className="text-white mb-4">{service.description}</p>
              {service.duration && (
                <p className="text-sm text-red-400 font-semibold">Dauer: {service.duration}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


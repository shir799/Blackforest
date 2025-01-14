'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import ParallaxBackground from './shared/parallax-background'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  return (
    <ParallaxBackground fadeOut={true}>
      <section id="ueber-uns" className="relative py-24 bg-black" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gradient">Über Uns</h2>
            <p className="mt-4 text-xl text-gray-300">Ihr vertrauenswürdiger Partner seit 2017</p>
          </motion.div>

          <motion.div style={{ y }} className="grid grid-cols-1 gap-12">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bildschirmfoto%202025-01-13%20um%2023.10.30-2fQdjtMgdpT8mTawmUaEM9rrTMV1IN.png"
                alt="Black Forest Autoglas Storefront"
                fill
                className="object-cover rounded-xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="box-gradient rounded-xl p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Unsere Geschichte</h3>
                  <p className="text-gray-300 mb-4">
                    Seit unserer Gründung im April 2017 haben wir uns zu einem führenden Spezialisten für Autoglas in Neuenburg am Rhein entwickelt. Unser Fokus liegt auf der Scheibenreparatur und dem Scheibenaustausch für PKW, LKW und Nutzfahrzeuge aller Fabrikate.
                  </p>
                  <p className="text-gray-300">
                    Als inhabergeführtes Unternehmen legen wir großen Wert auf persönlichen Service und schnelle, effiziente Lösungen für unsere Kunden. Wir verwenden modernste Materialien und halten uns an höchste Sicherheits- und Qualitätsstandards.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Unser Standort</h3>
                  <p className="text-gray-300 mb-4">
                    Unser moderner Standort in der Robert-Koch-Straße 22 ist optimal gelegen - nur 3 Minuten von der Autobahn A5 entfernt und fußläufig zum Stadtkern und Bahnhof. Unsere professionell ausgestattete Werkstatt ermöglicht es uns, Reparaturen und Austausch schnell und effizient durchzuführen.
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Moderne Werkstattausstattung</li>
                    <li>• Großzügiger Parkplatz</li>
                    <li>• Barrierefreier Zugang</li>
                    <li>• Kundenwartebereich</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </ParallaxBackground>
  )
}


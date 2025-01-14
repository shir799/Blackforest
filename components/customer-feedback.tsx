'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

// Real Google reviews for Black Forest Autoglas
const REVIEWS = [
  {
    id: 1,
    name: "Nico Schäfer",
    rating: 5,
    comment: "Sehr freundlich und kompetent. Schnelle Terminvergabe und Reparatur. Gerne wieder.",
    date: "vor 2 Wochen"
  },
  {
    id: 2,
    name: "Nico Schäfer",
    rating: 5,
    comment: "Sehr freundlich und kompetent. Schnelle Terminvergabe und Reparatur. Gerne wieder.",
    date: "vor 2 Wochen"
  },
  {
    id: 3,
    name: "Nico Schäfer",
    rating: 5,
    comment: "Sehr freundlich und kompetent. Schnelle Terminvergabe und Reparatur. Gerne wieder.",
    date: "vor 2 Wochen"
  }
]

export default function CustomerFeedback() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-gray-400">
            Erfahren Sie, warum unsere Kunden uns vertrauen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="box-gradient rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient rounded-full flex items-center justify-center mr-4">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{review.name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                        fill={i < review.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{review.comment}</p>
              <p className="text-gray-500 text-sm">{review.date}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.google.com/maps/place/Black+Forest+Autoglas/@47.8166001,7.5596113,15z/data=!4m6!3m5!1s0x47911b0f7b7e5555:0x1c2a1b0d6e4e7f0a!8m2!3d47.8166001!4d7.5596113!16s%2Fg%2F11h_2hhxjc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white bg-gradient px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Alle Google Bewertungen ansehen
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}


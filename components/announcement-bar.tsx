'use client'

import { Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AnnouncementBar() {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 py-2 px-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <motion.div 
          className="flex items-center space-x-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-red-500" />
            <span className="text-white text-sm">0 76 31 / 935 64 30</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-red-500" />
            <span className="text-white text-sm">info@black-forest-autoglas.de</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}


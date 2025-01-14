'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react'
import { useState } from 'react'
import BookingPopup from './booking-popup'

export default function Contact() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <section id="kontakt" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gradient mb-4">Kontakt</h2>
          <p className="mt-4 text-xl text-white">Wir sind für Sie da</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="box-gradient rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-2xl font-semibold text-gradient mb-6">Kontaktinformationen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 bg-black bg-opacity-30 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Telefon</p>
                      <a href="tel:076319356430" className="text-gray-300 hover:text-red-500 transition-colors">07631 / 935 64 30</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-black bg-opacity-30 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">E-Mail</p>
                      <a href="mailto:info@black-forest-autoglas.de" className="text-gray-300 hover:text-red-500 transition-colors break-all">info@black-forest-autoglas.de</a>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 bg-black bg-opacity-30 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-medium">Adresse</p>
                      <p className="text-gray-300">Robert-Koch-Straße 22, 79395 Neuenburg am Rhein</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 bg-black bg-opacity-30 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-medium">Öffnungszeiten</p>
                      <p className="text-gray-300">Montag bis Freitag: 10:00 - 18:00 Uhr</p>
                      <p className="text-gray-300">Samstag und Sonntag: Nach Vereinbarung</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-gradient mb-4">Termin vereinbaren</h4>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    onClick={() => setIsBookingOpen(true)}
                    className="bg-gradient-to-r from-red-700 to-red-900 text-white font-bold py-3 px-6 rounded-full inline-flex items-center justify-center transition-all hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgb(200,0,0)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Online Termin buchen
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="box-gradient rounded-lg p-6 shadow-lg h-full">
              <h3 className="text-2xl font-semibold text-gradient mb-4">Unser Standort</h3>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-4 shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.5383083898387!2d7.559611315641454!3d47.81660007920052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47911b0f7b7e5555%3A0x1c2a1b0d6e4e7f0a!2sRobert-Koch-Stra%C3%9Fe%2022%2C%2079395%20Neuenburg%20am%20Rhein%2C%20Germany!5e0!3m2!1sen!2sus!4v1625584362015!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Standort von Black Forest Autoglas"
                ></iframe>
              </div>
              <div className="flex justify-between items-center bg-black bg-opacity-30 p-3 rounded-lg">
                <p className="text-white font-medium">Black Forest Autoglas</p>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Black+Forest+Autoglas+Robert-Koch-Straße+22+79395+Neuenburg+am+Rhein"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Route planen
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <BookingPopup isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  )
}


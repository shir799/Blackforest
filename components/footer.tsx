'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Phone, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'
import BookingPopup from './booking-popup'

export default function Footer() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Main CTA */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Wir reparieren Ihren Glasschaden
            </h2>
            <motion.button
              onClick={() => setIsBookingOpen(true)}
              className="bg-gradient text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(200,0,0)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Jetzt Termin vereinbaren
            </motion.button>
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-red-500" />
                <a href="tel:076319356430" className="hover:text-red-500 transition-colors">
                  07631 / 935 64 30
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-red-500" />
                <a href="mailto:info@black-forest-autoglas.de" className="hover:text-red-500 transition-colors">
                  info@black-forest-autoglas.de
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gradient">Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/kosten-berechnen" className="hover:text-red-500 transition-colors">
                  Kosten berechnen
                </Link>
              </li>
              <li>
                <Link href="/standort" className="hover:text-red-500 transition-colors">
                  Standort finden
                </Link>
              </li>
              <li>
                <Link href="/ratgeber" className="hover:text-red-500 transition-colors">
                  Ratgeber
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-red-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Leistungen */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gradient">Leistungen</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/windschutzscheiben" className="hover:text-red-500 transition-colors">
                  Windschutzscheiben
                </Link>
              </li>
              <li>
                <Link href="/scheibenversiegelung" className="hover:text-red-500 transition-colors">
                  Scheibenversiegelung
                </Link>
              </li>
              <li>
                <Link href="/mobiler-service" className="hover:text-red-500 transition-colors">
                  Mobiler Service
                </Link>
              </li>
              <li>
                <Link href="/steinschlag" className="hover:text-red-500 transition-colors">
                  Steinschlagreparatur
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Über uns */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gradient">Black Forest Autoglas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ueber-uns" className="hover:text-red-500 transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/karriere" className="hover:text-red-500 transition-colors">
                  Karriere
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-red-500 transition-colors">
                  Für Partner
                </Link>
              </li>
              <li>
                <Link href="/flottenkunden" className="hover:text-red-500 transition-colors">
                  Für Flottenkunden
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-400">Sie finden uns auch auf:</span>
              <div className="flex space-x-4">
                <motion.a
                  href="https://facebook.com/blackforestautoglas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-5 h-5" />
                  <span className="sr-only">Facebook</span>
                </motion.a>
                <motion.a
                  href="https://instagram.com/black_forest_autoglas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </motion.a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-400">
              <Link href="/impressum" className="hover:text-red-500 transition-colors">
                Impressum
              </Link>
              <Link href="/agb" className="hover:text-red-500 transition-colors">
                AGB
              </Link>
              <Link href="/datenschutz" className="hover:text-red-500 transition-colors">
                Datenschutz
              </Link>
              <button
                onClick={() => {
                  // Open cookie settings
                  if (typeof window !== 'undefined' && window.CC) {
                    window.CC.showSettings();
                  }
                }}
                className="hover:text-red-500 transition-colors"
              >
                Cookie-Einstellungen
              </button>
              <Link href="/kontakt" className="hover:text-red-500 transition-colors">
                Kontakt
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 text-center md:text-left text-sm text-gray-400">
            © {new Date().getFullYear()} Black Forest Autoglas. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>

      {/* Booking Popup */}
      <BookingPopup isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </footer>
  )
}


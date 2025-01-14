'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BookingPopup from './booking-popup'

export default function Nav() {
const [isScrolled, setIsScrolled] = useState(false)
const [isBookingOpen, setIsBookingOpen] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault()
  const element = document.getElementById(id)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

return (
  <>
    <nav 
      className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Einezlunternehmen-isK3EoLXb8sbOCDZ1AjncTJ1PMdqS0.png"
                alt="Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "vorteile", label: "Vorteile", href: "/#vorteile" },
              { id: "ueber-uns", label: "Über uns", href: "/#ueber-uns" },
              { id: "kontakt", label: "Kontakt", href: "/#kontakt" },
              { id: "faq", label: "Häufige Fragen", href: "/#faq" },
              { id: "blog", label: "Blog", href: "/blog" }
            ].map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.href.startsWith('/#') ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="text-white hover:text-red-500 transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white hover:text-red-500 transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Termin vereinbaren Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsBookingOpen(true)}
              className="bg-gradient text-white font-medium text-sm px-6"
            >
              Termin vereinbaren
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>

    <BookingPopup isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
  </>
)
}


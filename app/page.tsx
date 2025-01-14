'use client'

import Nav from '@/components/nav'
import Hero from '@/components/hero'
import Advantages from '@/components/advantages'
import About from '@/components/about'
import ProductShowcase from '@/components/product-showcase'
import Contact from '@/components/contact'
import CustomerFeedback from '@/components/customer-feedback'
import FAQ from '@/components/faq'
import InstagramFeed from '@/components/instagram-feed'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Nav />
      <Hero />
      <Advantages />
      <About />
      <ProductShowcase />
      <Contact />
      <CustomerFeedback />
      <FAQ />
      <InstagramFeed />
    </main>
  )
}


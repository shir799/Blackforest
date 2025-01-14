'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "Welche Dienstleistungen bietet Black Forest Autoglas an?",
    answer: `
      Wir bieten Ihnen folgende Dienstleistungen an:
      • Steinschlagreparatur (Dauer: ca. 30 Minuten)
      • Austausch von Front-, Seiten- und Heckscheiben
      • Mobilservice: Reparaturen direkt bei Ihnen vor Ort
      • Hol- und Bringservice für Ihr Fahrzeug
      • Notdienst außerhalb der regulären Öffnungszeiten
      Alle Reparaturen und Montagen erfolgen nach höchsten Sicherheits- und Qualitätsstandards.
    `
  },
  {
    question: "Übernimmt Black Forest Autoglas die Abwicklung mit meiner Versicherung?",
    answer: `
      Ja, wir kümmern uns komplett um die Abwicklung mit Ihrer Versicherung, damit Sie sich um nichts kümmern müssen!
      • Reparaturen sind bei Teilkasko oft kostenlos.
      • Beim Austausch fällt in der Regel nur Ihre Selbstbeteiligung (ca. 150 €) an.
      • Wir sorgen dafür, dass alles reibungslos läuft.
    `
  },
  {
    question: "Was kostet eine Scheibenreparatur?",
    answer: `
      Das hängt von der Art des Schadens und der Versicherung ab:
      • Steinschlagreparatur: Oft kostenlos bei Teilkasko.
      • Scheibenaustausch: Die Kosten übernimmt in der Regel Ihre Teilkasko-Versicherung abzüglich der Selbstbeteiligung.
      Wir bieten Ihnen vorab eine transparente Kostenübersicht.
    `
  },
  {
    question: "Kann ich meinen Termin online buchen?",
    answer: `
      Ja, nutzen Sie unser Online-Buchungssystem!
      • Wählen Sie einen verfügbaren Termin in unserem Kalender aus.
      • Sie erhalten sofort eine Bestätigungs-E-Mail.
      • Alternativ können Sie uns auch über WhatsApp oder telefonisch kontaktieren.
    `
  },
  {
    question: "Wie lange dauert eine Reparatur oder ein Austausch?",
    answer: `
      • Steinschlagreparatur: Ca. 30 Minuten.
      • Scheibenaustausch: Je nach Fahrzeugtyp ca. 2-3 Stunden.
      Dank unseres Mobilservices können wir die Reparatur auch direkt bei Ihnen vor Ort durchführen.
    `
  },
  {
    question: "Was ist der Mobilservice und wie funktioniert er?",
    answer: `
      Unser Mobilservice spart Ihnen Zeit und Aufwand:
      • Wir kommen zu Ihnen nach Hause oder ins Büro.
      • Reparatur oder Austausch erfolgt direkt vor Ort.
      • Keine zusätzliche Kosten für den Mobilservice.
    `
  },
  {
    question: "Wie nachhaltig arbeitet Black Forest Autoglas?",
    answer: `
      Nachhaltigkeit ist ein zentraler Bestandteil unseres Unternehmens:
      • Minimaler Abfall bei Reparaturen.
      • Auswahl umweltfreundlicher Materialien und Lieferanten.
      • Wir achten darauf, dass unsere Prozesse und Produkte ressourcenschonend sind.
    `
  },
  {
    question: "Bietet Black Forest Autoglas einen Notdienst an?",
    answer: `
      Ja, wir sind auch außerhalb der Öffnungszeiten für Sie da:
      • Kontaktieren Sie uns über unsere Notfallnummer oder WhatsApp.
      • Unser Team hilft Ihnen schnell und zuverlässig, egal wann!
    `
  }
]

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <motion.button
        className="w-full text-left py-6 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        initial={false}
        animate={{ backgroundColor: isOpen ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0)" }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-semibold text-white text-lg">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <Minus className="w-6 h-6 text-red-500" /> : <Plus className="w-6 h-6 text-red-500" />}
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginBottom: "1rem" },
              collapsed: { opacity: 0, height: 0, marginBottom: "0" }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="pb-6 text-gray-300 whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12"
        >
          <span className="text-gradient">Die wichtigsten Antworten,</span>
          <br />
          <span className="text-white">auf deine Bedenken</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}


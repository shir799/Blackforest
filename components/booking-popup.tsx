'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Calendar, User, Car, Shield, Check } from 'lucide-react'
import { bookAppointment } from '@/app/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface BookingPopupProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  { title: 'Persönliche Daten', icon: User },
  { title: 'Fahrzeugdetails', icon: Car },
  { title: 'Versicherungsdetails', icon: Shield },
  { title: 'Terminwunsch', icon: Calendar },
]

export default function BookingPopup({ isOpen, onClose }: BookingPopupProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carModel: '',
    licensePlate: '',
    yearOfManufacture: '',
    insuranceName: '',
    insuranceNumber: '',
    insuranceDeductible: '',
    preferredDate: null as Date | null,
    comments: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const validateField = (name: string, value: string) => {
    let newErrors = { ...errors }
    switch (name) {
      case 'name':
        if (!value) newErrors.name = 'Name ist erforderlich'
        else delete newErrors.name
        break
      case 'email':
        if (!value) newErrors.email = 'E-Mail ist erforderlich'
        else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Ungültige E-Mail-Adresse'
        else delete newErrors.email
        break
      case 'phone':
        if (!value) newErrors.phone = 'Telefonnummer ist erforderlich'
        else delete newErrors.phone
        break
      // Add more validations for other fields
    }
    setErrors(newErrors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    try {
      await bookAppointment(formData)
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setCurrentStep(0)
        setFormData({
          name: '',
          email: '',
          phone: '',
          carModel: '',
          licensePlate: '',
          yearOfManufacture: '',
          insuranceName: '',
          insuranceNumber: '',
          insuranceDeductible: '',
          preferredDate: null,
          comments: ''
        })
      }, 3000)
    } catch (error) {
      console.error('Error booking appointment:', error)
      setErrors({ submit: 'Es gab einen Fehler beim Buchen des Termins. Bitte versuchen Sie es später erneut.' })
    }
    setIsSubmitting(false)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4 border border-red-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Termin buchen</h2>
              <button onClick={onClose} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep ? 'bg-red-600' : 'bg-gray-600'
                    }`}>
                      <step.icon size={16} className="text-white" />
                    </div>
                    <span className="text-xs text-gray-400 mt-1">{step.title}</span>
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-red-600 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <p className="text-xl font-semibold text-green-500 mb-4">🎉 Vielen Dank! Ihr Termin wurde erfolgreich gebucht.</p>
                <p className="text-gray-300">Sie erhalten in Kürze eine Bestätigungs-E-Mail.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">👤 Persönliche Daten</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Vor- und Zuname*
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Wie dürfen wir Sie ansprechen?"
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            E-Mail-Adresse*
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Wo dürfen wir die Bestätigung hinschicken?"
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                            Telefonnummer*
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Für Rückfragen und Terminbestätigungen"
                          />
                          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">🚗 Fahrzeugdetails</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="carModel" className="block text-sm font-medium text-gray-300">
                            Automarke / Modell
                          </label>
                          <input
                            type="text"
                            id="carModel"
                            name="carModel"
                            value={formData.carModel}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Welches Fahrzeug darf glänzen?"
                          />
                        </div>
                        <div>
                          <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-300">
                            Kennzeichen 🏷️
                          </label>
                          <input
                            type="text"
                            id="licensePlate"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Damit wir es gleich finden"
                          />
                        </div>
                        <div>
                          <label htmlFor="yearOfManufacture" className="block text-sm font-medium text-gray-300">
                            Baujahr 📅
                          </label>
                          <input
                            type="text"
                            id="yearOfManufacture"
                            name="yearOfManufacture"
                            value={formData.yearOfManufacture}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Wann wurde es geboren?"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">🛡️ Versicherungsdetails</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="insuranceName" className="block text-sm font-medium text-gray-300">
                            Name der Versicherung
                          </label>
                          <input
                            type="text"
                            id="insuranceName"
                            name="insuranceName"
                            value={formData.insuranceName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Wer übernimmt den Schaden?"
                          />
                        </div>
                        <div>
                          <label htmlFor="insuranceNumber" className="block text-sm font-medium text-gray-300">
                            Versicherungsnummer 🔢
                          </label>
                          <input
                            type="text"
                            id="insuranceNumber"
                            name="insuranceNumber"
                            value={formData.insuranceNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Falls notwendig"
                          />
                        </div>
                        <div>
                          <label htmlFor="insuranceDeductible" className="block text-sm font-medium text-gray-300">
                            Selbstbeteiligung 💰
                          </label>
                          <input
                            type="text"
                            id="insuranceDeductible"
                            name="insuranceDeductible"
                            value={formData.insuranceDeductible}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Ihr Anteil in € (falls Kasko)"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">📆 Terminwunsch</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-300">
                            Wunschtermin
                          </label>
                          <DatePicker
                            selected={formData.preferredDate}
                            onChange={(date: Date) => setFormData({ ...formData, preferredDate: date })}
                            showTimeSelect
                            dateFormat="dd.MM.yyyy HH:mm"
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholderText="Wählen Sie Ihren Wunschtermin"
                          />
                        </div>
                        <div>
                          <label htmlFor="comments" className="block text-sm font-medium text-gray-300">
                            Bemerkungen ✍️
                          </label>
                          <textarea
                            id="comments"
                            name="comments"
                            rows={3}
                            value={formData.comments}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                            placeholder="Gibt es etwas, das wir wissen sollten?"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center text-gray-300 hover:text-white"
                    >
                      <ChevronLeft size={20} />
                      Zurück
                    </button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md ml-auto"
                    >
                      Weiter
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md ml-auto"
                    >
                      {isSubmitting ? 'Wird gesendet...' : '✅ Termin sichern'}
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* Live Preview */}
            {currentStep === steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-4 bg-gray-800 rounded-md"
              >
                <h4 className="text-lg font-semibold text-white mb-2">Zusammenfassung</h4>
                <p className="text-gray-300">Name: {formData.name}</p>
                <p className="text-gray-300">E-Mail: {formData.email}</p>
                <p className="text-gray-300">Fahrzeug: {formData.carModel}</p>
                <p className="text-gray-300">Termin: {formData.preferredDate?.toLocaleString()}</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


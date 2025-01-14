'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Car, Clock, Euro, X } from 'lucide-react'
import { calculateCost } from '@/app/actions'
import type { DamageDetails, CostEstimate } from '@/lib/types'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function CostCalculator() {
  const [isLoading, setIsLoading] = useState(false)
  const [estimate, setEstimate] = useState<CostEstimate | null>(null)
  const [formData, setFormData] = useState<DamageDetails>({
    type: 'chip',
    location: '',
    size: '',
    vehicleType: '',
    manufacturer: '',
    model: '',
    year: '',
    hasInsurance: false,
    description: ''
  })
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await calculateCost(formData)
      setEstimate(result)
    } catch (error) {
      console.error('Error calculating cost:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setEstimate(null)
    setFormData({
      type: 'chip',
      location: '',
      size: '',
      vehicleType: '',
      manufacturer: '',
      model: '',
      year: '',
      hasInsurance: false,
      description: ''
    })
  }

  return (
    <section className="py-12 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Kostenrechner für Glasschäden
            </h2>
            <p className="text-gray-300">
              Erhalten Sie eine schnelle Kostenschätzung für Ihre Glasreparatur
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="relative">
              <CardTitle className="text-white">Schadensdetails</CardTitle>
              <CardDescription className="text-gray-400">
                Bitte geben Sie die Details Ihres Glasschadens an
              </CardDescription>
              {estimate && (
                <Button
                  onClick={handleClose}
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="damage-type">Art des Schadens</Label>
                    <RadioGroup
                      defaultValue="chip"
                      onValueChange={(value) => setFormData({ ...formData, type: value as DamageDetails['type'] })}
                      className="grid grid-cols-3 gap-4 mt-2"
                    >
                      <div>
                        <RadioGroupItem value="chip" id="chip" className="peer sr-only" />
                        <Label
                          htmlFor="chip"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 p-4 hover:bg-gray-800 peer-data-[state=checked]:border-red-600 cursor-pointer"
                        >
                          <span>Steinschlag</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="crack" id="crack" className="peer sr-only" />
                        <Label
                          htmlFor="crack"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 p-4 hover:bg-gray-800 peer-data-[state=checked]:border-red-600 cursor-pointer"
                        >
                          <span>Riss</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="replacement" id="replacement" className="peer sr-only" />
                        <Label
                          htmlFor="replacement"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 p-4 hover:bg-gray-800 peer-data-[state=checked]:border-red-600 cursor-pointer"
                        >
                          <span>Austausch</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Position des Schadens</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Position auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="windshield-center">Windschutzscheibe Mitte</SelectItem>
                          <SelectItem value="windshield-driver">Windschutzscheibe Fahrerseite</SelectItem>
                          <SelectItem value="windshield-passenger">Windschutzscheibe Beifahrerseite</SelectItem>
                          <SelectItem value="side-window">Seitenscheibe</SelectItem>
                          <SelectItem value="rear-window">Heckscheibe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="size">Größe des Schadens</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, size: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Größe auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="klein">Klein (bis 2mm)</SelectItem>
                          <SelectItem value="mittel">Mittel (2-5mm)</SelectItem>
                          <SelectItem value="groß">Groß (über 5mm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="manufacturer">Fahrzeughersteller</Label>
                      <Input
                        id="manufacturer"
                        placeholder="z.B. BMW"
                        onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">Modell</Label>
                      <Input
                        id="model"
                        placeholder="z.B. 3er"
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Baujahr</Label>
                      <Input
                        id="year"
                        placeholder="z.B. 2020"
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Versicherung</Label>
                      <RadioGroup
                        onValueChange={(value) => {
                          if (value === 'none') {
                            setFormData({ ...formData, hasInsurance: false, insuranceType: undefined })
                          } else {
                            setFormData({ ...formData, hasInsurance: true, insuranceType: value as 'partial' | 'full' })
                          }
                        }}
                        className="grid grid-cols-3 gap-4 mt-2"
                      >
                        <div>
                          <RadioGroupItem value="none" id="none" className="peer sr-only" />
                          <Label
                            htmlFor="none"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 p-4 hover:bg-gray-800 peer-data-[state=checked]:border-red-600 cursor-pointer"
                          >
                            <span>Keine</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="partial" id="partial" className="peer sr-only" />
                          <Label
                            htmlFor="partial"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 p-4 hover:bg-gray-800 peer-data-[state=checked]:border-red-600 cursor-pointer"
                          >
                            <span>Teilkasko</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="full" id="full" className="peer sr-only" />
                          <Label
                            htmlFor="full"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-800 p-4 hover:bg-gray-800 peer-data-[state=checked]:border-red-600 cursor-pointer"
                          >
                            <span>Vollkasko</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Zusätzliche Beschreibung</Label>
                    <Textarea
                      id="description"
                      placeholder="Beschreiben Sie den Schaden genauer..."
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Calculator className="w-5 h-5" />
                      </motion.div>
                      Berechne...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Kosten berechnen
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Card */}
          <AnimatePresence mode="wait">
            {estimate && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Ihre Kostenschätzung</CardTitle>
                    <CardDescription className="text-gray-400">
                      Basierend auf Ihren Angaben
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Euro className="w-5 h-5 text-red-500 mr-2" />
                          <h3 className="text-lg font-semibold text-white">Geschätzte Kosten</h3>
                        </div>
                        <p className="text-2xl font-bold text-gradient">
                          {estimate.minPrice} € - {estimate.maxPrice} €
                        </p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 text-red-500 mr-2" />
                          <h3 className="text-lg font-semibold text-white">Reparaturdauer</h3>
                        </div>
                        <p className="text-2xl font-bold text-white">
                          {estimate.repairTime}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Car className="w-5 h-5 text-red-500 mr-2" />
                        <h3 className="text-lg font-semibold text-white">Empfehlung</h3>
                      </div>
                      <p className="text-gray-300">
                        {estimate.recommendation}
                      </p>
                      {estimate.insuranceCoverage && (
                        <p className="mt-2 text-red-400">
                          {estimate.insuranceCoverage}
                        </p>
                      )}
                    </div>

                    <Button
                      className="w-full bg-gradient hover:opacity-90"
                      onClick={() => setIsBookingOpen(true)}
                    >
                      Jetzt Termin vereinbaren
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}


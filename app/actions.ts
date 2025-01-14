'use server'

import { sendMail } from '@/lib/mail'
import type { AppointmentData, DamageDetails, CostEstimate } from '@/lib/types'

export async function bookAppointment(data: AppointmentData) {
  const appointmentDate = new Date(data.preferredDate)
  const formattedDate = appointmentDate.toLocaleString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const customerEmailContent = `
    Sehr geehrte(r) ${data.name},

    vielen Dank für Ihre Terminbuchung bei Black Forest Autoglas. Ihr Termin wurde erfolgreich für ${formattedDate} gebucht.

    Termindetails:
    - Datum und Uhrzeit: ${formattedDate}
    - Name: ${data.name}
    - Straße: ${data.street}
    - PLZ/Ort: ${data.city}
    - E-Mail: ${data.email}
    - Mobil: ${data.mobile}
    - Telefon: ${data.phone || 'Nicht angegeben'}
    
    Fahrzeugdetails:
    - Automarke/Modell: ${data.carModel || 'Nicht angegeben'}
    - Kennzeichen: ${data.licensePlate || 'Nicht angegeben'}
    - Fahrgestellnummer: ${data.vin || 'Nicht angegeben'}
    - Baujahr: ${data.yearOfManufacture || 'Nicht angegeben'}
    - Erstzulassung: ${data.firstRegistration || 'Nicht angegeben'}
    
    Versicherungsinformationen:
    - Versicherung: ${data.insuranceName || 'Nicht angegeben'}
    - Versicherungsnummer: ${data.insuranceNumber || 'Nicht angegeben'}
    - Selbstbeteiligung: ${data.insuranceDeductible || 'Nicht angegeben'}
    
    ${data.comments ? `Bemerkungen: ${data.comments}` : ''}

    Wir freuen uns auf Ihren Besuch.

    Mit freundlichen Grüßen,
    Ihr Black Forest Autoglas Team
  `

  const companyEmailContent = `
    Neue Terminbuchung:

    Termindetails:
    - Datum und Uhrzeit: ${formattedDate}
    - Name: ${data.name}
    - Straße: ${data.street}
    - PLZ/Ort: ${data.city}
    - E-Mail: ${data.email}
    - Mobil: ${data.mobile}
    - Telefon: ${data.phone || 'Nicht angegeben'}
    
    Fahrzeugdetails:
    - Automarke/Modell: ${data.carModel || 'Nicht angegeben'}
    - Kennzeichen: ${data.licensePlate || 'Nicht angegeben'}
    - Fahrgestellnummer: ${data.vin || 'Nicht angegeben'}
    - Baujahr: ${data.yearOfManufacture || 'Nicht angegeben'}
    - Erstzulassung: ${data.firstRegistration || 'Nicht angegeben'}
    
    Versicherungsinformationen:
    - Versicherung: ${data.insuranceName || 'Nicht angegeben'}
    - Versicherungsnummer: ${data.insuranceNumber || 'Nicht angegeben'}
    - Selbstbeteiligung: ${data.insuranceDeductible || 'Nicht angegeben'}
    
    ${data.comments ? `Bemerkungen: ${data.comments}` : ''}
  `

  try {
    // Send confirmation email to customer
    await sendMail({
      to: data.email,
      subject: 'Terminbestätigung - Black Forest Autoglas',
      text: customerEmailContent,
    })

    // Send notification email to company
    await sendMail({
      to: 'info@black-forest-autoglas.de',
      subject: 'Neue Terminbuchung',
      text: companyEmailContent,
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending emails:', error)
    throw new Error('Failed to book appointment')
  }
}

export async function calculateCost(details: DamageDetails): Promise<CostEstimate> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock AI response based on damage type
  let estimate: CostEstimate;
  switch (details.type) {
    case 'chip':
      estimate = {
        minPrice: 69,
        maxPrice: 129,
        repairTime: '30-45 Minuten',
        recommendation: 'Eine schnelle Reparatur wird empfohlen, um weitere Schäden zu vermeiden.',
        insuranceCoverage: details.hasInsurance ? 'Ihre Versicherung übernimmt wahrscheinlich die Kosten.' : 'Ohne Versicherung müssen Sie die Kosten selbst tragen.'
      };
      break;
    case 'crack':
      estimate = {
        minPrice: 300,
        maxPrice: 800,
        repairTime: '2-3 Stunden',
        recommendation: 'Ein Austausch der Scheibe könnte notwendig sein. Wir empfehlen eine genaue Inspektion.',
        insuranceCoverage: details.hasInsurance ? 'Ihre Versicherung könnte einen Teil der Kosten übernehmen.' : 'Ohne Versicherung müssen Sie die Kosten selbst tragen.'
      };
      break;
    case 'replacement':
      estimate = {
        minPrice: 500,
        maxPrice: 1500,
        repairTime: '3-4 Stunden',
        recommendation: 'Ein kompletter Austausch der Scheibe ist notwendig für Ihre Sicherheit.',
        insuranceCoverage: details.hasInsurance ? 'Ihre Versicherung sollte den Großteil der Kosten übernehmen.' : 'Ohne Versicherung müssen Sie die vollen Kosten selbst tragen.'
      };
      break;
    default:
      estimate = {
        minPrice: 69,
        maxPrice: 1500,
        repairTime: '1-4 Stunden',
        recommendation: 'Bitte kontaktieren Sie uns für eine genaue Einschätzung.',
        insuranceCoverage: details.hasInsurance ? 
          'Ihre Versicherung übernimmt möglicherweise die Kosten. Wir prüfen das gerne für Sie.' : 
          'Eine Versicherung könnte diese Kosten übernehmen. Sprechen Sie uns an.'
      };
  }

  // Adjust estimate based on vehicle details
  if (details.manufacturer && details.manufacturer.toLowerCase().includes('luxury')) {
    estimate.minPrice *= 1.2;
    estimate.maxPrice *= 1.2;
  }

  return estimate;
}


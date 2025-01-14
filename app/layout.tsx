import { Inter } from 'next/font/google'
import './globals.css'
import AnnouncementBar from '@/components/announcement-bar'
import Footer from '@/components/footer'
import GlassShards from '@/components/glass-shards'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Black Forest Autoglas',
  description: 'Ihr Spezialist für Autoglas in Neuenburg am Rhein',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="bg-black">
      <body className={`${inter.className} bg-black flex flex-col min-h-screen pt-10`}>
        <GlassShards />
        <AnnouncementBar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}


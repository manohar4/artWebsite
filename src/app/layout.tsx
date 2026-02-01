import type { Metadata } from 'next'
import { Inter, Niconne } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { initializeFirebase } from '@/lib/firebase'

const inter = Inter({ subsets: ['latin'] })
const niconne = Niconne({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-niconne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sai Vindhya | Art & Creative Portfolio',
  description: 'Sai Vindhya — creative artist and designer. Freelance artist and creative director, focusing on unique, bold, and expressive visual art.',
  keywords: ['Sai Vindhya', 'art', 'portfolio', 'creative', 'artist', 'designer', 'visual art'],
  authors: [{ name: 'Sai Vindhya' }],
  creator: 'Sai Vindhya',
  openGraph: {
    title: 'Sai Vindhya | Art & Creative Portfolio',
    description: 'Sai Vindhya — creative artist and designer. Freelance artist and creative director, focusing on unique, bold, and expressive visual art.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sai Vindhya | Art & Creative Portfolio',
    description: 'Sai Vindhya — creative artist and designer. Freelance artist and creative director.',
  },
  icons: {
    icon: '/icon.jpg',
    apple: '/icon.jpg',
  },
}

// Initialize Firebase on server side if needed
if (typeof window === 'undefined') {
  // Server-side initialization if needed
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${niconne.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitAI - Treinos Inteligentes com IA',
  description: 'Plataforma completa de fitness com IA de postura, scanner nutricional e gamificação.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}

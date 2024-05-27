import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GitSimulationProvider } from './hooks/GitSimulationContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Git Simulator',
  description: 'Git simulator',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GitSimulationProvider>{children}</GitSimulationProvider>
      </body>
    </html>
  )
}

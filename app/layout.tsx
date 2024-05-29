import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GitSimulationProvider } from './hooks/GitSimulationContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Git Simulator',
  description: 'Git simulator',
  icons: {
    other: [
      { rel: 'preconnect', url: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', url: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', url: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap' }
    ]
  }
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

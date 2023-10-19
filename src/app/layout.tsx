import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import { Navbar } from './_components'
import ReduxProvider from './_providers/redux.provider'
import DataProvider from './_providers/data.provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web',
  description: 'Track Finance WEB'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReduxProvider>
          <DataProvider>
            <Navbar />
            {children}
          </DataProvider>
        </ReduxProvider>

      </body>
    </html>
  )
}

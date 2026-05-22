import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UEXO x Ektifaa Network Hierarchy',
  description: 'Partner network hierarchy prototype for Ektifaa and UEXO Ops',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

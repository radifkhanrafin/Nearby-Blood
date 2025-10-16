import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import ProfileUpdateModal from "../components/ui/ProfileUpdateModal";
export const metadata: Metadata = {
  title: 'Nearby Blood',
  description: 'A different platform for searching blood',
  generator: 'Radif',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>

        <Header />
        <ProfileUpdateModal />
        <main> {children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}

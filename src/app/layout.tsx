import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/shared/ui/header'
import Footer from '@/shared/ui/Footer'
import { Toaster } from '@/shared/ui/Toaster'
import Providers from '@/app/providers'

export const metadata: Metadata = {
  title: 'StudiGo',
  description: '함께 성장하는 즐거움, StudiGo',
}

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
})

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <body className="font-pretendard flex min-h-screen flex-col">
        <Providers>
          <Header isLoggedIn={false} />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" duration={1500} />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

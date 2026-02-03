import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Footer from '@/shared/ui/Footer'
import { Toaster } from '@/shared/ui/Toaster'
import Providers from '@/app/providers'
import { HeaderWrapper } from '@/widgets/auth-header/ui/HeaderWrapper'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

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
        <NuqsAdapter>
          <Providers>
            <HeaderWrapper />
            <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-10">
              {children}
            </main>
            <Footer />
            <Toaster position="top-right" duration={1500} />
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  )
}

export default RootLayout

import { GeistSans } from 'geist/font/sans'
import './globals.css'
import ReactQueryClientProvider from '@/components/ReactQueryClientProvider'
import LayoutContainer from '@/components/containers/LayoutContainer'
import { Metadata } from 'next'
import ServiceWorkerReg from '@/components/serviceworker/ServiceWorkerReg'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Notes',
  description: 'The best way to stay on top of your game.',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className='bg-background text-foreground'>
          <LayoutContainer>
        <ReactQueryClientProvider>
        <ServiceWorkerReg/>
            <main className='min-h-screen flex flex-col items-center'>
              {children}
            </main>
        </ReactQueryClientProvider>
          </LayoutContainer>
      </body>
    </html>
  )
}

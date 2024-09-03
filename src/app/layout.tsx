import type { Metadata } from 'next'
import React, { ReactNode } from 'react'
import { Providers } from '@/app/providers'
import { Navigation } from '@/app/(global)/(components)/navigation'
import { theme } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'Hobby-log',
  description: 'logging weekly emotionally activity.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true}>
        <Providers>
          <Navigation />
          <main
            style={{
              padding: theme.space['4'],
              height: 'calc(100vh - 60px)',
              overflowY: 'scroll',
            }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import React, { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'
import { Navigation } from '@/app/(global)/(components)/navigation'
import style from '@/app/(global)/(style)/global.module.scss'
import { theme } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

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
      <body
        className={`${inter.className} ${style.body}`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Navigation />
          <main style={{ padding: theme.space['4'] }}>{children}</main>
        </Providers>
      </body>
    </html>
  )
}

import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types'
import { Metadata } from 'next'

export type MetaArg = {
  title: string
  url: string
  thumbnail: string
  description: string
  keywords?: string[]
}

const generateArticleOgMeta = (args: MetaArg): OpenGraph => {
  let middleUrl: string = ''

  return {
    type: 'article',
    url: middleUrl,
    title: `Hobby-log | ${args.title}`,
    images: [args.thumbnail],
    description: args.description,
    siteName: 'Hobby-log',
    locale: 'ko_KR',
  }
}

const generateArticleTwitterMeta = (args: MetaArg): Twitter => {
  return {
    card: 'summary',
    title: `Hobby-log | ${args.title}`,
    description: args.description,
    images: [args.thumbnail],
  }
}

export const generateArticleFullMeta = (args: MetaArg): Metadata => {
  return {
    metadataBase: new URL(process.env['NEXT_PUBLIC_FRONT_HOST'] ?? ''),
    title: `Hobby-log | ${args.title}`,
    description: args.description,
    openGraph: generateArticleOgMeta(args),
    twitter: generateArticleTwitterMeta(args),
    keywords: args.keywords?.join(', '),
  }
}

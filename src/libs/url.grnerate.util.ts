import { Category } from '@/gql/types'

export const generateThumbnail = (url: string, category: Category) => {
  if (url) return url
  return `${process.env['NEXT_PUBLIC_BACKEND_HOST']}/images/default/${category.toLowerCase()}-default.jpeg`
}

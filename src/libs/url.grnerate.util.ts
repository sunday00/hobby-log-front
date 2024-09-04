import { Category } from '@/gql/types'

export const generateDefaultSrc = (category: Category) => {
  return `${process.env['NEXT_PUBLIC_BACKEND_HOST']}/images/default/${category.toLowerCase()}-default.jpeg`
}

export const generateThumbnail = (
  url: string | undefined | null,
  category: Category,
) => {
  if (url) return `${process.env['NEXT_PUBLIC_BACKEND_HOST']}${url}`
  return generateDefaultSrc(category)
}

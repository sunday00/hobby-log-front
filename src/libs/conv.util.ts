import { Category } from '@/gql/types'

export const decodeBase64 = (token: string) => {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export const dateFormat = (
  yyyyMMDDTHHmmss: string,
  format: string = 'YYYY-MM-DD HH:mm:ss',
) => {
  const dt = yyyyMMDDTHHmmss.split('T')
  const d = dt[0]
  const t = dt[1]

  switch (format) {
    case 'YYYY-MM':
      return d.slice(0, 7)
    default:
      return yyyyMMDDTHHmmss.replace('T', ' ')
  }
}

export const calcOneMonth = (y: number, m: number, rel: 'prev' | 'next') => {
  if (rel === 'prev' && m === 1) {
    return [(y - 1).toString(), '12']
  }

  if (rel === 'next' && m === 12) {
    return [(y + 1).toString(), '01']
  }

  return [
    y.toString(),
    (rel === 'prev' ? m - 1 : m + 1).toString().padStart(2, '0'),
  ]
}

export const categoryToEmoji = (category: Category) => {
  switch (category) {
    case Category.Movie:
      return '🎬'
    case Category.Gallery:
      return '🖼️'
    case Category.Draw:
      return '🎨'
    case Category.Essay:
      return '✍️'
    case Category.Read:
      return '📚'
    case Category.Walk:
      return '👟'
    default:
      return ''
  }
}

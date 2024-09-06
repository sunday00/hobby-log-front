import { Category } from '@/gql/types'

export const fileMimeTypesUpper = ['JPG', 'JPEG', 'PNG', 'GIF']
export const fileMimeTypes = [
  ...fileMimeTypesUpper,
  ...fileMimeTypesUpper.map((f) => f.toLowerCase()),
]

export type CategoryLowerCase = Lowercase<keyof typeof Category>

export type ContextObj = {
  input: any
  inputTitle?: string
  thumbnailCandidates?: {
    type: 'cropper' | 'url'
    cropper?: string
    url?: string
  }
}

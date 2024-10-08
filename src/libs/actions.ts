'use server'

import { revalidatePath } from 'next/cache'

export const reValidator = async (
  path: string,
  type?: 'page' | 'layout' | null | undefined,
) => {
  if (type) {
    revalidatePath(path, type)
  } else {
    revalidatePath(path)
  }
}

'use server'

import { revalidatePath } from 'next/cache'

export const reValidator = async (path: string) => {
  revalidatePath(path)
}

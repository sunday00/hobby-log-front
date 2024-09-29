import { useEffect, useState } from 'react'
import { LocalStorage } from '@/libs/localStorage.safely.util'
import { decodeBase64 } from '@/libs/conv.util'

export const useMy = (contentUserId: string | undefined | null) => {
  const [my, setMy] = useState(false)

  useEffect(() => {
    const at = LocalStorage.getItem('accessToken')

    if (!at || at === '') {
      setMy(false)
      return
    }

    const { sub } = decodeBase64(at ?? '.')

    setMy(sub === contentUserId)
  }, [contentUserId])

  return my
}

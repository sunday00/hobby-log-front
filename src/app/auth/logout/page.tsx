'use client'

import { LocalStorage } from '@/libs/localStorage.safely.util'

export default function LogoutPage() {
  LocalStorage.removeItem('accessToken')
  LocalStorage.removeItem('accessTokenExpired')
  LocalStorage.removeItem('userName')

  location.href = '/'
}

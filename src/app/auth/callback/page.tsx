'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useQuery } from '@apollo/client'
import { signQuery } from '@/gql/auth/auth.query.gql'
import { decodeBase64 } from '@/libs/conv.util'

const AuthCallbackRaw = () => {
  const q = useSearchParams()
  const code = q.get('code')

  const { data, loading, error } = useQuery(signQuery, {
    variables: { code },
  })

  if (loading) {
    return <>Loading...</>
  }

  if (error) {
    return <>Error...</>
  }

  const accessToken = data.sign.accessToken
  const {
    name,
    sub: userId,
    exp,
  }: { name: string; sub: string; exp: number } = decodeBase64(accessToken)

  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('userName', name)
  localStorage.setItem('accessTokenExpired', String(exp))

  location.href = '/'
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<div>...</div>}>
      <AuthCallbackRaw />
    </Suspense>
  )
}

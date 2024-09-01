'use client'

import { LoginForm } from '@/app/auth/(components)/loginForm'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'

const Auth = () => {
  const redirectUrl = encodeURIComponent(
    process.env.NEXT_PUBLIC_FRONT_HOST ?? 'http://localhost:3021',
  )

  const url =
    'https://kauth.kakao.com/oauth/authorize' +
    '?response_type=code' +
    `&client_id=${process.env.NEXT_PUBLIC_KAKAO_KEY}` +
    `&redirect_uri=${redirectUrl}/auth/callback` +
    '&scope=profile_nickname,profile_image,account_email'

  return (
    <div>
      <BreadcrumbWarp name="auth" />
      <LoginForm url={url} />
    </div>
  )
}

export default Auth

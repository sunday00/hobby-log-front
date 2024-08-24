'use client'

import {useSearchParams} from 'next/navigation'
import {Suspense} from 'react'

const AuthCallbackRaw = () => {
  const q = useSearchParams()
  const code = q.get("code")

  const redirectUrl = encodeURIComponent(process.env.NEXT_PUBLIC_FRONT_HOST ?? 'http://localhost:3021');
  const url = "https://kauth.kakao.com/oauth/authorize" +
    "?response_type=code" +
    "&client_id=c3359f9b1c78173adb140522ddaeca54" +
    `&redirect_uri=${redirectUrl}/auth/callback` +
    "&scope=profile_nickname,profile_image,account_email"

  return <div>
      <p><a href={url}>login</a></p>

      <br />
      <br />

      <div>
      <textarea
        style={{ fontSize: "2em", marginTop: "1em", marginLeft: "1em", padding: "0.5em" }}
        rows={4}
        cols={80}
        defaultValue={code ?? ''}
      ></textarea>
      </div>
    </div>
}

export default function AuthCallback() {
  return <Suspense fallback={<div>...</div>}>
    <AuthCallbackRaw />
  </Suspense>
}
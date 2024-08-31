import { LoginForm } from '@/app/auth/(components)/LoginForm'

const Auth = async () => {
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
      {/*<a href={url}>login</a>*/}
      <LoginForm url={url} />
    </div>
  )
}

export default Auth

const Auth = async () => {
  const redirectUrl = encodeURIComponent(process.env.NEXT_PUBLIC_FRONT_HOST ?? 'http://localhost:3021');

  const url = "https://kauth.kakao.com/oauth/authorize" +
    "?response_type=code" +
    "&client_id=c3359f9b1c78173adb140522ddaeca54" +
    `&redirect_uri=${redirectUrl}/auth/callback` +
    "&scope=profile_nickname,profile_image,account_email"

  return <div>
    <a href={url}>login</a>
  </div>
}

export default Auth
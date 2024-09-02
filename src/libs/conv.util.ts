export const decodeBase64 = (token: string) => {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export const dateFormat = (
  yyyyMMDDTHHmmss: string,
  format: string = 'YYYY-MM-DD HH:mm:ss',
) => {
  const dt = yyyyMMDDTHHmmss.split('T')
  const d = dt[0]
  const t = dt[1]

  switch (format) {
    case 'YYYY-MM':
      return d.slice(0, 7)
    default:
      return yyyyMMDDTHHmmss.replace('T', ' ')
  }
}

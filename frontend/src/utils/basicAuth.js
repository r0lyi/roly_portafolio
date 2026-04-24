export function buildBasicAuthorizationHeader(email, password) {
  const credentials = `${email.trim()}:${password}`
  const bytes = new TextEncoder().encode(credentials)
  let binary = ''

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  return `Basic ${window.btoa(binary)}`
}

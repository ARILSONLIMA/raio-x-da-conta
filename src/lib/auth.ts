import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET

if (process.env.NODE_ENV === 'production' && !secretKey) {
  throw new Error("JWT_SECRET environment variable is strictly required in production for security.")
}

const encodedKey = new TextEncoder().encode(secretKey || 'fallback_secret')

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
  return { session, expiresAt }
}

export async function verifySession(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}

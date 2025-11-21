import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'
)

export interface TokenPayload {
  userId: string
  email: string
  exp?: number
}

export async function signToken(payload: Omit<TokenPayload, 'exp'>): Promise<string> {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  try {
    const verified = await jwtVerify(token, secret)
    return verified.payload as TokenPayload
  } catch (error) {
    throw new Error('Token inválido ou expirado')
  }
}


import type { H3Event } from 'h3'
import { verify } from 'jsonwebtoken'

export interface AuthPayload {
  sub: number
  email: string
  role: 'ADMIN' | 'MANAGER' | 'MEMBER'
}

export function ensureAuth(event: H3Event, roles?: AuthPayload['role'][]) {
  const err = createError({ statusCode: 401, statusMessage: 'Please login' })
  const { accessToken: { secretKey } } = useRuntimeConfig()
  const sessionToken = getCookie(event, 'auth:token')
  if (!sessionToken)
    throw err

  const payload = verify(sessionToken, secretKey) as unknown as AuthPayload
  if (!payload)
    throw err

  if (roles && !roles.includes(payload.role)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not allowed to access this resource',
    })
  }

  return payload
}

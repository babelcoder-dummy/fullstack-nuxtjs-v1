import type { H3Event } from 'h3'
import type { JwtPayload } from 'jsonwebtoken'
import { verify } from 'jsonwebtoken'
import db from '~/utils/db'

function extractToken(authHeaderValue: string) {
  return authHeaderValue.split('Bearer ')[1]
}

async function ensureAuth(event: H3Event) {
  const { accessToken: { secretKey } } = useRuntimeConfig()
  const authHeaderValue = getRequestHeader(event, 'authorization')
  if (typeof authHeaderValue === 'undefined') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Need to pass valid Bearer-authorization',
    })
  }

  const extractedToken = extractToken(authHeaderValue)

  try {
    const { sub } = verify(extractedToken, secretKey) as JwtPayload
    const profile = await db.user.findUnique({
      where: { id: +sub! },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    })

    return profile
  }
  catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'You must be logged in to use this endpoint' })
  }
}

export default eventHandler((event) => {
  return ensureAuth(event)
})

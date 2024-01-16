import type { z } from 'zod'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { loginInputValidator } from '~/validators/auth'
import db from '~/utils/db'

export type LoginInput = z.infer<typeof loginInputValidator>

export default eventHandler(async (event) => {
  const { accessToken: { expiresIn, secretKey } } = useRuntimeConfig()
  const credentials = await readBody(event)
  const result = loginInputValidator.safeParse(credentials)
  const err = createError({ statusCode: 401, statusMessage: 'Invalid credentials or user not found' })
  if (!result.success)
    throw err

  const user = await db.user.findUnique({
    where: { email: result.data.email },
  })

  if (!user)
    throw err

  if (!(await bcrypt.compare(credentials.password, user.password)))
    throw err

  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    role: user.role,
  }

  const accessToken = sign(payload, secretKey, { expiresIn })

  setResponseStatus(event, 201)
  return {
    token: {
      accessToken,
    },
  }
})

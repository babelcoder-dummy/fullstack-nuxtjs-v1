import type { z } from 'zod'
import bcrypt from 'bcryptjs'
import { registerInputValidator } from '~/validators/auth'
import db from '~/utils/db'

export type RegisterInput = z.infer<typeof registerInputValidator>

export default eventHandler(async (event) => {
  const credentials = await readBody(event)
  const result = registerInputValidator.safeParse(credentials)
  if (!result.success)
    throw createError({ statusCode: 422, message: result.error.message })

  const hashedPassword = await bcrypt.hash(result.data.password, 12)
  const user = await db.user.create({
    data: {
      ...result.data,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  setResponseStatus(event, 201)
  return user
})

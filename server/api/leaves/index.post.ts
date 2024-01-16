import type { z } from 'zod'
import db from '~/utils/db'
import { createLeaveInputValidator } from '~/validators/leaves'
import { ensureAuth } from '~/utils/server-auth'

export type CreateLeaveInput = z.infer<typeof createLeaveInputValidator>

const create = eventHandler(async (event) => {
  const user = ensureAuth(event)
  const form = await readBody(event)
  const result = createLeaveInputValidator.safeParse(form)
  if (!result.success)
    throw createError({ statusCode: 422, data: result.error.flatten() })

  const leave = await db.leave.create({
    data: { ...result.data, userId: user.sub },
  })

  setResponseStatus(event, 201)
  return leave
})

export default create

import type { z } from 'zod'
import db from '~/utils/db'
import { updateLeaveInputValidator } from '~/validators/leaves'
import { ensureAuth } from '~/utils/server-auth'

export type UpdateLeaveInput = z.infer<typeof updateLeaveInputValidator>

const create = eventHandler(async (event) => {
  const user = ensureAuth(event)
  const id = +getRouterParam(event, 'id')!
  const form = await readBody(event)
  const result = updateLeaveInputValidator.safeParse(form)
  if (!result.success)
    throw createError({ statusCode: 422, data: result.error.flatten() })

  const leave = await db.leave.update({
    where: { id, userId: user.sub },
    data: result.data,
  })

  return leave
})

export default create

import type { z } from 'zod'
import db from '~/utils/db'
import { updateLeaveInputValidator } from '~/validators/leaves'

export type UpdateLeaveInput = z.infer<typeof updateLeaveInputValidator>

const create = eventHandler(async (event) => {
  const id = +getRouterParam(event, 'id')!
  const form = await readBody(event)
  const result = updateLeaveInputValidator.safeParse(form)
  if (!result.success)
    throw createError({ statusCode: 422, data: result.error.flatten() })

  const leave = await db.leave.update({
    where: { id },
    data: result.data,
  })

  return leave
})

export default create

import db from '~/utils/db'
import { ensureAuth } from '~/utils/server-auth'

const findById = eventHandler(async (event) => {
  const user = ensureAuth(event)
  const id = +getRouterParam(event, 'id')!
  const leave = await db.leave.findUnique({
    where: { id, userId: user.sub },
    select: {
      id: true,
      status: true,
      reason: true,
      leaveDate: true,
      userId: true,
      rejectionReason: true,
    },
  })

  if (!leave) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not allowed to access this leave',
    })
  }

  return leave
})

export default findById

export type LeaveDetails = Awaited<ReturnType<typeof findById>>

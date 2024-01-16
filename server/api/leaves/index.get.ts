import db from '~/utils/db'
import { ensureAuth } from '~/utils/server-auth'

const findAll = eventHandler(async (event) => {
  const user = ensureAuth(event)
  const leaves = await db.leave.findMany({
    where: { userId: user.sub },
    select: {
      id: true,
      status: true,
      reason: true,
      rejectionReason: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return leaves
})

export default findAll

export type LeaveList = Awaited<ReturnType<typeof findAll>>

export type LeaveItem = LeaveList[number]

import db from '~/utils/db'

const findAll = eventHandler(async () => {
  const leaves = await db.leave.findMany({
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

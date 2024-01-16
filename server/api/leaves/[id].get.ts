import db from '~/utils/db'

const findById = eventHandler(async (event) => {
  const id = +getRouterParam(event, 'id')!
  const leave = await db.leave.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
      reason: true,
      leaveDate: true,
      userId: true,
      rejectionReason: true,
    },
  })

  return leave
})

export default findById

export type LeaveDetails = Awaited<ReturnType<typeof findById>>

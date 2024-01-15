import db from '~/utils/db'

const findAll = eventHandler(async () => {
  const announcements = await db.announcement.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return announcements
})

export default findAll

export type AnnouncementList = Awaited<ReturnType<typeof findAll>>

export type AnnouncementItem = AnnouncementList[number]

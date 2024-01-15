import db from '~/utils/db'

const findBySlug = eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const announcement = await db.announcement.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      userId: true,
    },
  })

  return announcement
})

export default findBySlug

export type AnnouncementDetails = NonNullable<Awaited<ReturnType<typeof findBySlug>>>

import db from '~/utils/db'

const remove = eventHandler(async (event) => {
  const id = +getRouterParam(event, 'id')!
  const leave = await db.leave.findUnique({
    where: { id },
  })
  if (!leave)
    throw createError({ statusCode: 404 })

  return db.article.delete({
    where: { id },
  })
})

export default remove

import db from '~/utils/db'
import { ensureAuth } from '~/utils/server-auth'

const remove = eventHandler(async (event) => {
  const user = ensureAuth(event)
  const id = +getRouterParam(event, 'id')!
  const leave = await db.leave.findUnique({
    where: { id, userId: user.sub },
  })
  if (!leave)
    throw createError({ statusCode: 404 })

  return db.article.delete({
    where: { id },
  })
})

export default remove

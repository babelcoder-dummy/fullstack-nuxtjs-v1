import db from '~/utils/db'
import { ensureAuth } from '~/utils/server-auth'

const remove = eventHandler(async (event) => {
  ensureAuth(event, ['ADMIN', 'MANAGER'])
  const slug = getRouterParam(event, 'slug')!
  const article = await db.article.delete({
    where: { slug },
  })

  return article
})

export default remove

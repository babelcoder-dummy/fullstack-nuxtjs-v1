import db from '~/utils/db'

const remove = eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const article = await db.article.delete({
    where: { slug },
  })

  return article
})

export default remove

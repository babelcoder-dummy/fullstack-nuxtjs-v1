import db from '~/utils/db'

const remove = eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!

  try {
    const article = await db.article.delete({
      where: { slug },
    })

    return article
  }
  catch {
    return null
  }
})

export default remove

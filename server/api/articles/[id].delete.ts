import db from '~/utils/db'

const remove = eventHandler(async (event) => {
  const id = +getRouterParam(event, 'id')!

  try {
    const article = await db.article.delete({
      where: { id },
    })

    return article
  }
  catch {
    return null
  }
})

export default remove

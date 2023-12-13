import db from '~/utils/db'

const findById = eventHandler(async (event) => {
  const id = +getRouterParam(event, 'id')!

  const article = await db.article.findUnique({
    where: { id },
  })

  if (!article)
    throw createError({ statusCode: 404, message: 'the article does not exists' })

  return article
})

export default findById

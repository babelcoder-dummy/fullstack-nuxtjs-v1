import db from '~/utils/db'
import { slugify } from '~/utils/slugify'

const update = eventHandler(async (event) => {
  const id = +getRouterParam(event, 'id')!
  const form = await readBody(event)

  const existingArticle = await db.article.findUnique({
    where: { id },
  })

  if (!existingArticle)
    throw createError({ statusCode: 404, message: 'the article does not exists' })

  const article = await db.article.update({
    where: { id },
    data: {
      ...form,
      slug: form.title ? slugify(form.title) : undefined,
    },
  })

  return article
})

export default update

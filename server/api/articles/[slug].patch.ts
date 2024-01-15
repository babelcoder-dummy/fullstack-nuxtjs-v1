import db from '~/utils/db'
import { slugify } from '~/utils/slugify'

const update = eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const form = await readBody(event)

  const existingArticle = await db.article.findUnique({
    where: { slug },
  })

  if (!existingArticle)
    throw createError({ statusCode: 404, message: 'the article does not exists' })

  const article = await db.article.update({
    where: { slug },
    data: {
      ...form,
      slug: form.title ? slugify(form.title) : undefined,
    },
  })

  return article
})

export default update

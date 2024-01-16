import type { z } from 'zod'
import db from '~/utils/db'
import { slugify } from '~/utils/slugify'

import type { updateArticleInputValidator } from '~/validators/articles'

export type UpdateArticleInput = z.infer<typeof updateArticleInputValidator>

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

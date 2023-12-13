import db from '~/utils/db'
import { slugify } from '~/utils/slugify'

const create = eventHandler(async (event) => {
  const form = await readBody(event)
  const article = await db.article.create({
    data: {
      ...form,
      slug: slugify(form.title),
      userId: 1,
    },
  })

  setResponseStatus(event, 201)
  return article
})

export default create

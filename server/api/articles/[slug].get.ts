import db from '~/utils/db'

const findBySlug = eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!

  const article = await db.article.findUnique({
    where: { slug },
    select: {
      image: true,
      content: true,
      title: true,
      excerpt: true,
    },
  })

  if (!article)
    throw createError({ statusCode: 404, message: 'the article does not exists' })

  return article
})

export default findBySlug

export type ArticleDetails = Awaited<ReturnType<typeof findBySlug>>

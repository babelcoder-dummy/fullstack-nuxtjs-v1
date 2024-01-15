import db from '~/utils/db'

const findAll = eventHandler(async () => {
  const articles = await db.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      image: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return articles
})

export default findAll

export type ArticleList = Awaited<ReturnType<typeof findAll>>

export type ArticleItem = ArticleList[number]

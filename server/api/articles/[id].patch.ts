const update = eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const form = await readBody(event)

  const articles = [
    { id: 1, title: 'Title#1', excerpt: 'Excerpt#1' },
    { id: 2, title: 'Title#2', excerpt: 'Excerpt#2' },
    { id: 3, title: 'Title#3', excerpt: 'Excerpt#3' },
  ]

  const article = articles.find(article => article.id === +id)

  if (!article)
    throw createError({ statusCode: 404, message: 'the article does not exists' })

  Object.assign(article, form)

  return article
})

export default update

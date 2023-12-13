const create = eventHandler(async (event) => {
  const form = await readBody(event)
  const article = { id: +(new Date()), ...form }

  setResponseStatus(event, 201)
  return article
})

export default create

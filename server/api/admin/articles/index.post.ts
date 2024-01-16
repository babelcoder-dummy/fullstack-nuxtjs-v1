import path from 'node:path'
import fs from 'node:fs/promises'
import type { z } from 'zod'
import { readFiles } from 'h3-formidable'
import db from '~/utils/db'
import { slugify } from '~/utils/slugify'
import { createArticleInputValidator } from '~/validators/articles'
import { ensureAuth } from '~/utils/server-auth'

export type CreateArticleInput = z.infer<typeof createArticleInputValidator>

const create = eventHandler(async (event) => {
  const user = ensureAuth(event, ['ADMIN', 'MANAGER'])
  const { files: { image: imageList }, fields } = await readFiles(event)
  const image = imageList?.[0]
  if (!image)
    throw createError({ statusCode: 422, statusMessage: 'image is required' })

  const newPath = `${path.join('public', 'uploads', crypto.randomUUID())}.${image.mimetype?.split('/')[1]}`
  await fs.copyFile(image.filepath, newPath)

  const result = createArticleInputValidator.omit({ image: true }).safeParse({
    title: fields.title?.[0],
    excerpt: fields.excerpt?.[0],
    content: fields.content?.[0],
  })
  if (!result.success)
    throw createError({ statusCode: 422, data: result.error.flatten() })

  const article = await db.article.create({
    data: {
      ...result.data,
      slug: slugify(result.data.title),
      image: newPath.split('public')[1],
      userId: user.sub,
    },
  })

  setResponseStatus(event, 201)
  return article
})

export default create

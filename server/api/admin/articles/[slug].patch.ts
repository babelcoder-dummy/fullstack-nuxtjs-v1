import path from 'node:path'
import fs from 'node:fs/promises'
import type { z } from 'zod'
import { readFiles } from 'h3-formidable'
import db from '~/utils/db'
import { slugify } from '~/utils/slugify'

import { updateArticleInputValidator } from '~/validators/articles'

export type UpdateArticleInput = z.infer<typeof updateArticleInputValidator>

const update = eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const { files: { image: imageList }, fields } = await readFiles(event)

  const result = updateArticleInputValidator.omit({ image: true }).safeParse({
    title: fields.title?.[0],
    excerpt: fields.excerpt?.[0],
    content: fields.content?.[0],
  })
  if (!result.success)
    throw createError({ statusCode: 422, data: result.error.flatten() })

  const image = imageList?.[0]
  let newImagePath: string | undefined
  if (image) {
    const oldArticle = await db.article.findUnique({
      where: { slug },
      select: {
        image: true,
      },
    })

    const newPath = `${path.join('public', 'uploads', crypto.randomUUID())}.${image.mimetype?.split('/')[1]}`
    await fs.copyFile(image.filepath, newPath)
    newImagePath = newPath.split('public')[1]

    if (oldArticle)
      await fs.unlink(path.join('public', oldArticle.image))
  }

  const article = await db.article.update({
    where: { slug },
    data: {
      ...result.data,
      image: newImagePath,
      slug: result.data.title ? slugify(result.data.title) : undefined,
    },
  })

  return article
})

export default update

import fs from 'node:fs/promises'
import path from 'node:path'
import { readFiles } from 'h3-formidable'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { ensureAuth } from '~/utils/server-auth'
import { profileInputValidator } from '~/validators/auth'
import db from '~/utils/db'

export type ProfileInput = z.infer<typeof profileInputValidator>

export default eventHandler(async (event) => {
  const { sub: id } = ensureAuth(event)
  const { files: { image: imageList }, fields } = await readFiles(event)
  const result = profileInputValidator.omit({ image: true }).safeParse({
    name: fields.name?.[0],
    email: fields.email?.[0],
    password: fields.password?.[0],
  })
  if (!result.success)
    throw createError({ statusCode: 422, data: result.error.flatten() })

  const image = imageList?.[0]
  let newImagePath: string | undefined
  if (image) {
    const oldProfile = await db.user.findUnique({
      where: { id },
      select: {
        image: true,
      },
    })

    const newPath = `${path.join('public', 'uploads', crypto.randomUUID())}.${image.mimetype?.split('/')[1]}`
    await fs.copyFile(image.filepath, newPath)
    newImagePath = newPath.split('public')[1]

    if (oldProfile?.image) {
      const result = z.string().url().safeParse(oldProfile.image)

      if (!result.success)
        await fs.unlink(path.join('public', oldProfile.image))
    }
  }

  const hashedPassword = result.data.password
    ? await bcrypt.hash(result.data.password, 12)
    : undefined

  const profile = await db.user.update({
    where: { id },
    data: {
      ...result.data,
      image: newImagePath,
      password: hashedPassword,
    },
    select: {
      name: true,
      email: true,
      image: true,
      role: true,
    },
  })

  return profile
})

import { z } from 'zod'
import { image } from './image'

export const createArticleInputValidator = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  image,
})

export const updateArticleInputValidator = createArticleInputValidator.partial()

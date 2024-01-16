import { z } from 'zod'
import { image } from './image'

export const loginInputValidator = z.object({
  email: z.string().min(1).email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Must be at least 8 chars' }),
})

export const registerInputValidator = loginInputValidator.extend({
  name: z.string().min(1),
})

export const profileInputValidator = registerInputValidator.extend({
  image,
}).partial()

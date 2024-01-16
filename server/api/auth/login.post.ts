import type { z } from 'zod'
import type { loginInputValidator } from '~/validators/auth'

export type LoginInput = z.infer<typeof loginInputValidator>

import type { z } from 'zod'
import type { registerInputValidator } from '~/validators/auth'

export type RegisterInput = z.infer<typeof registerInputValidator>

import type { z } from 'zod'
import type { profileInputValidator } from '~/validators/auth'

export type ProfileInput = z.infer<typeof profileInputValidator>

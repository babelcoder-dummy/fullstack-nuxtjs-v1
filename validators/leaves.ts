import { z } from 'zod'

export const createLeaveInputValidator = z.object({
  leaveDate: z.string().min(1).datetime(),
  reason: z.string().min(1),
})

export const updateLeaveInputValidator = createLeaveInputValidator.partial()

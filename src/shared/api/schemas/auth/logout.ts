import z from 'zod'
import { ErrorResponseSchema } from './common'

export const LogoutRequestSchema = z.object({
  all_devices: z.boolean().optional(),
})

export type LogoutRequest = z.infer<typeof LogoutRequestSchema>

export const LogoutResponseSchema = z.object({
  message: z.string(),
})

export type LogoutResponse = z.infer<typeof LogoutResponseSchema>

export const LogoutErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum(['INVALID_TOKEN', 'TOKEN_EXPIRED', 'TOKEN_REVOKED']),
})

export type LogoutError = z.infer<typeof LogoutErrorSchema>

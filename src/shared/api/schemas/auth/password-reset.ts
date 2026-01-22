import z from 'zod'
import { ErrorResponseSchema } from '@/shared/api/schemas/auth/common'

export const PasswordResetRequestSchema = z.object({
  reset_token: z.string().min(1),
  new_password: z.string().min(1),
  new_password_confirm: z.string().min(1),
})

export type PasswordResetRequest = z.infer<typeof PasswordResetRequestSchema>

export const PasswordResetResponseSchema = z.object({
  message: z.string(),
})

export type PasswordResetResponse = z.infer<typeof PasswordResetResponseSchema>

export const PasswordResetErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum([
    'INVALID_RESET_TOKEN',
    'RESET_TOKEN_EXPIRED',
    'TOKEN_ALREADY_USED',
    'PASSWORD_MISMATCH',
    'INVALID_PASSWORD_FORMAT',
    'PASSWORD_SAME_AS_PREVIOUS',
    'PASSWORD_RECENTLY_USED',
    'TOO_MANY_REQUEST',
  ]),
  retry_after: z.number().int().positive().optional(),
}).transform((data) => ({
  errorCode: data.error_code,
  errorDetail: data.error_detail,
  retryAfter: data.retry_after,
}))

export type PasswordResetError = z.infer<typeof PasswordResetErrorSchema>

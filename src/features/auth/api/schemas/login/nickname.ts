import z from 'zod'
import { ErrorResponseSchema } from '@/features/auth/api/schemas/login/common'

export const NicknameCheckRequestSchema = z.object({
  nickname: z.string().min(1),
})

export type NicknameCheckRequest = z.infer<typeof NicknameCheckRequestSchema>

export const NicknameCheckResponseSchema = z.object({
  available: z.boolean(),
  message: z.string(),
})

export type NicknameCheckResponse = z.infer<typeof NicknameCheckResponseSchema>

export const NicknameCheckErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum([
    'INVALID_NICKNAME_LENGTH',
    'INVALID_NICKNAME_FORMAT',
    'NICKNAME_ALREADY_EXISTS',
    'TOO_MANY_REQUEST',
  ]),
  retry_after: z.number().int().positive().optional(),
}).transform((data) => ({
  errorCode: data.error_code,
  errorDetail: data.error_detail,
  retryAfter: data.retry_after,
}))

export type NicknameCheckError = z.infer<typeof NicknameCheckErrorSchema>

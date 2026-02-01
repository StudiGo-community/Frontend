import z from 'zod'
import { ErrorResponseSchema } from '@/shared/api/error-schema'

export const NicknameCheckRequestSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
})
export type NicknameCheckRequest = z.infer<typeof NicknameCheckRequestSchema>

export const NicknameCheckResponseSchema = z.object({
  message: z.string(),
  check_token: z.string(),
  expires_in: z.number(),
})
export type NicknameCheckResponse = z.infer<typeof NicknameCheckResponseSchema>

export const NicknameCheckErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum([
    'INVALID_NICKNAME_LENGTH',
    'INVALID_NICKNAME_FORMAT',
    'NICKNAME_ALREADY_EXISTS',
    'TOO_MANY_REQUEST',
  ]),
  retry_after: z.number().optional(),
})
export type NicknameCheckError = z.infer<typeof NicknameCheckErrorSchema>

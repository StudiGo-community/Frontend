import z from 'zod'
import { ErrorResponseSchema } from '@/shared/api/error-schema'
import { EmailSchema } from '@/features/auth-join/model/check-email-schema'

export const SendEmailCodeRequestSchema = z.object({
  email: EmailSchema,
  check_token: z.string().min(1, '이메일 중복 확인을 먼저 진행해주세요.'),
})
export type SendEmailCodeRequest = z.infer<typeof SendEmailCodeRequestSchema>

export const SendEmailCodeResponseSchema = z.object({
  request_id: z.string(),
  expires_in: z.number(),
  cooldown: z.number(),
})
export type SendEmailCodeResponse = z.infer<typeof SendEmailCodeResponseSchema>

export const SendEmailCodeErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum(['EMAIL_SEND_FAILED', 'TOO_MANY_REQUEST']),
  retry_after: z.number().optional(),
})
export type SendEmailCodeError = z.infer<typeof SendEmailCodeErrorSchema>

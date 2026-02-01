import z from 'zod'
import { ErrorResponseSchema } from '@/shared/api/error-schema'

export const EmailSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    '올바른 이메일 형식이 아닙니다.'
  )

export const CheckEmailRequestSchema = z.object({
  email: EmailSchema,
})
export type CheckEmailRequest = z.infer<typeof CheckEmailRequestSchema>

export const CheckEmailResponseSchema = z.object({
  message: z.string(),
  check_token: z.string(),
  expires_in: z.number(),
})
export type CheckEmailResponse = z.infer<typeof CheckEmailResponseSchema>

export const CheckEmailErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum(['INVALID_EMAIL_FORMAT', 'EMAIL_ALREADY_EXIST']),
})
export type CheckEmailError = z.infer<typeof CheckEmailErrorSchema>

import z from 'zod'
import { ErrorResponseSchema } from '@/shared/api/error-schema'
import { EmailSchema } from './check-email-schema'

export const VerifyPurposeSchema = z.enum(['SIGNUP'])
export type VerifyPurpose = z.infer<typeof VerifyPurposeSchema>

export const VerifyEmailCodeRequestSchema = z.object({
  email: EmailSchema,
  code: z.string().min(1, '인증코드를 입력해주세요.'),
  purpose: VerifyPurposeSchema,
})
export type VerifyEmailCodeRequest = z.infer<
  typeof VerifyEmailCodeRequestSchema
>

export const VerifyEmailCodeResponseSchema = z.object({
  verified: z.boolean(),
  message: z.string(),
  verification_token: z.string(),
})
export type VerifyEmailCodeResponse = z.infer<
  typeof VerifyEmailCodeResponseSchema
>

export const VerifyEmailCodeErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum(['INVALID_CODE', 'TOO_MANY_REQUEST']),
  retry_after: z.number().optional(),
})
export type VerifyEmailCodeError = z.infer<typeof VerifyEmailCodeErrorSchema>

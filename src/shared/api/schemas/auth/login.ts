// src/shared/api/schemas/auth/login.ts
import z from 'zod'
import {
  ErrorResponseSchema,
  UserSchema,
} from '@/shared/api/schemas/auth/common'

export const EmailLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember_me: z.boolean().optional(),
})

export type EmailLoginRequest = z.infer<typeof EmailLoginRequestSchema>

export const EmailLoginResponseSchema = z
  .object({
    access_token: z.string(),
    token_type: z.literal('Bearer'),
    expires_in: z.number().int().positive(),
    user: z.any(),
  })
  .transform((data) => {
    const user = UserSchema.parse(data.user)

    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
      expiresIn: data.expires_in,
      user,
    }
  })

export type EmailLoginResponse = z.infer<typeof EmailLoginResponseSchema>

export const LoginInvalidCredentialsErrorSchema = ErrorResponseSchema.extend({
  error_code: z.literal('INVALID_CREDENTIALS'),
})

export const LoginAccountWithdrawnErrorSchema = ErrorResponseSchema.extend({
  error_code: z.literal('ACCOUNT_WITHDRAWN'),
  can_restore: z.boolean(),
  restore_deadline: z.string(),
}).transform((data) => ({
  errorCode: data.error_code,
  errorDetail: data.error_detail,
  canRestore: data.can_restore,
  restoreDeadline: new Date(data.restore_deadline),
}))

export const LoginBlockedErrorSchema = ErrorResponseSchema.extend({
  error_code: z.literal('LOGIN_BLOCKED'),
  retry_after: z.number().int().positive(),
}).transform((data) => ({
  errorCode: data.error_code,
  errorDetail: data.error_detail,
  retryAfter: data.retry_after,
}))

export type LoginAccountWithdrawnError = z.infer<
  typeof LoginAccountWithdrawnErrorSchema
>
export type LoginBlockedError = z.infer<typeof LoginBlockedErrorSchema>

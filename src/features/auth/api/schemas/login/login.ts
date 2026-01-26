import z from 'zod'
import {
  UserSchema,
  ErrorResponseSchema,
} from '@/features/auth/api/schemas/login/common'

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
    user: UserSchema,
  })
  .transform((data) => ({
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
    user: {
      id: data.user.id,
      email: data.user.email,
      nickname: data.user.nickname,
      name: data.user.name,
      role: data.user.role,
      status: data.user.status,
      provider: data.user.provider,
      profileImageUrl: data.user.profileImageUrl ?? null,
    },
  }))
export type EmailLoginResponse = z.infer<typeof EmailLoginResponseSchema>

export const LoginInvalidCredentialsErrorSchema = z.object({
  detail: z.string(),
})

export const LoginAccountWithdrawnErrorSchema = ErrorResponseSchema.extend({
  error_code: z.literal('ACCOUNT_WITHDRAWN'),
  can_restore: z.boolean(),
  restore_deadline: z.string(),
}).transform((data) => ({
  error_code: data.error_code,
  error_detail: data.error_detail,
  can_restore: data.can_restore,
  restoreDeadline: new Date(data.restore_deadline),
}))

export const LoginBlockedErrorSchema = ErrorResponseSchema.extend({
  error_code: z.literal('LOGIN_BLOCKED'),
  retry_after: z.number().int().positive(),
})

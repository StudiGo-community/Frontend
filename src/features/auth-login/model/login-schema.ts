import z from 'zod'
import { ErrorResponseSchema } from '@/shared/api/error-schema'

export const EmailLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember_me: z.boolean().optional(),
})
export type EmailLoginRequest = z.infer<typeof EmailLoginRequestSchema>

const RawUserSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  nickname: z.string(),
  name: z.string(),
  role: z.enum(['USER', 'ADMIN']).or(z.string()),
  status: z.enum(['ACTIVE', 'BANNED', 'WITHDRAWN']).or(z.string()),
  provider: z
    .enum(['EMAIL', 'KAKAO', 'GOOGLE'])
    .optional()
    .nullable()
    .or(z.string().optional().nullable()),
  profile_image_url: z.string().nullable().optional(),
  profileImageUrl: z.string().nullable().optional(),
})

const TokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal('Bearer'),
  expires_in: z.number().int().nonnegative(),
})

const NestedResponseSchema = z.object({
  token: TokenSchema,
  user: RawUserSchema,
})

const FlatResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.literal('Bearer'),
  expires_in: z.number().int().nonnegative(),
  user: RawUserSchema,
})

export const EmailLoginResponseSchema = z
  .union([NestedResponseSchema, FlatResponseSchema])
  .transform((data) => {
    const token =
      'token' in data
        ? data.token
        : {
            access_token: data.access_token,
            token_type: data.token_type,
            expires_in: data.expires_in,
          }

    return {
      accessToken: token.access_token,
      tokenType: token.token_type,
      expiresIn: token.expires_in,
      user: {
        id: data.user.id,
        email: data.user.email,
        nickname: data.user.nickname,
        name: data.user.name,
        role: data.user.role as 'USER' | 'ADMIN',
        status: data.user.status as 'ACTIVE' | 'BANNED' | 'WITHDRAWN',
        provider: (data.user.provider ?? undefined) as
          | 'EMAIL'
          | 'KAKAO'
          | 'GOOGLE'
          | undefined,
        profileImageUrl:
          data.user.profileImageUrl ?? data.user.profile_image_url ?? null,
      },
    }
  })

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

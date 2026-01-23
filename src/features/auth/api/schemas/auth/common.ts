import z from 'zod'

export const ErrorResponseSchema = z.object({
  error_code: z.string(),
  error_detail: z.string(),
})

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

export const UserRoleSchema = z.enum(['USER', 'ADMIN'])
export type UserRole = z.infer<typeof UserRoleSchema>

export const UserStatusSchema = z.enum(['ACTIVE', 'BANNED', 'WITHDRAWN'])
export type UserStatus = z.infer<typeof UserStatusSchema>

export const UserProviderSchema = z.enum(['EMAIL', 'KAKAO', 'GOOGLE'])
export type UserProvider = z.infer<typeof UserProviderSchema>

export const TokenResponseSchema = z
  .object({
    access_token: z.string(),
    token_type: z.literal('Bearer'),
    expires_in: z.number().int().positive(),
  })
  .transform((data) => ({
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
  }))

export type TokenResponse = z.infer<typeof TokenResponseSchema>

export const UserSchema = z
  .object({
    id: z.number().int(),
    email: z.string().email(),
    nickname: z.string(),
    name: z.string(),
    profile_image_url: z.string().url().nullable().optional(),
    role: UserRoleSchema,
    status: UserStatusSchema,
    provider: UserProviderSchema.optional(),
  })
  .transform((data) => ({
    id: data.id,
    email: data.email,
    nickname: data.nickname,
    name: data.name,
    profileImageUrl: data.profile_image_url ?? null,
    role: data.role,
    status: data.status,
    provider: data.provider,
  }))

export type User = z.infer<typeof UserSchema>

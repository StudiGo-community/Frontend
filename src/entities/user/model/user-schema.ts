import z from 'zod'

export const UserRoleSchema = z.enum(['USER', 'ADMIN'])
export const UserStatusSchema = z.enum(['ACTIVE', 'BANNED', 'WITHDRAWN'])
export const UserProviderSchema = z.enum(['EMAIL', 'KAKAO', 'GOOGLE'])

export const UserSchema = z
  .object({
    id: z.number().int(),
    email: z.string().email(),
    nickname: z.string(),
    name: z.string(),
    profile_image_url: z.string().url().nullable(),
    role: UserRoleSchema,
    status: UserStatusSchema,
    provider: UserProviderSchema.optional(),
  })
  .transform((data) => ({
    id: data.id,
    email: data.email,
    nickname: data.nickname,
    name: data.name,
    role: data.role,
    status: data.status,
    provider: data.provider,
    profileImageUrl: data.profile_image_url ?? null,
  }))

export type User = z.infer<typeof UserSchema>

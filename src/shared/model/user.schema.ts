import type { User } from '@/shared/model/user'
import { z } from 'zod'

export const UserResponseSchema = z
  .object({
    id: z.number().int(),
    email: z.email(),
    nickname: z.string(),
    name: z.string(),
    profile_image_url: z.string().nullable().optional(),
    gender: z.enum(['M', 'F']).nullable(),
    birthday: z.string().nullable(),
    phone: z.string().nullable(),
    role: z.enum(['USER', 'STAFF', 'ADMIN']),
    created_at: z.string(),
  })
  .transform(
    (data): User => ({
      id: data.id,
      email: data.email,
      nickname: data.nickname,
      name: data.name,
      profileImageUrl: data.profile_image_url ?? null,
      gender: data.gender,
      birthday: data.birthday,
      phone: data.phone,
      role: data.role,
      createdAt: new Date(data.created_at),
    })
  )
